/* eslint-disable @typescript-eslint/no-empty-function */
import { ViewState } from 'react-map-gl';
import { Controller } from '../controller';
import {
  ExploreModel,
  ExploreState,
  InventoryLocation,
} from '../models/explore.model';
import MedusaService from '../services/medusa.service';
import mapboxgl from 'mapbox-gl';
import { point, featureCollection, nearestPoint, helpers } from '@turf/turf';
import WindowController from './window.controller';
import { Subscription } from 'rxjs';
import { select } from '@ngneat/elf';
import { PublicSecrets } from '../protobuf/core_pb';
import PermissionsController from './permissions.controller';
import { Index } from 'meilisearch';
import MeiliSearchService from '../services/meilisearch.service';
import { StockLocation } from '@medusajs/stock-location/dist/models';

class ExploreController extends Controller {
  private readonly _model: ExploreModel;
  private _stockLocationsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationIdSubscription: Subscription | undefined;
  private _currentPositionSubscription: Subscription | undefined;
  private _publicSecretsSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _limit: number;

  constructor() {
    super();

    this._model = new ExploreModel();
    this._limit = 20;
  }

  public get model(): ExploreModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._stockLocationsIndex =
      MeiliSearchService.client?.index('stock_locations');

    this._medusaAccessTokenSubscription =
      MedusaService.accessTokenObservable.subscribe({
        next: (value: string | undefined) => {
          if (!value) {
            this.resetMedusaModel();
            this.initializeAsync(renderCount);
          }
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._publicSecretsSubscription?.unsubscribe();
    this._currentPositionSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription?.unsubscribe();
  }

  public onMapMove(state: ViewState): void {
    this._model.longitude = state.longitude;
    this._model.latitude = state.latitude;
    this._model.zoom = state.zoom;
  }

  public async onNextScrollAsync(): Promise<void> {
    if (this._model.areSearchedStockLocationsLoading) {
      return;
    }

    this._model.searchedStockLocationsPagination =
      this._model.searchedStockLocationsPagination + 1;
    const offset =
      this._limit * (this._model.searchedStockLocationsPagination - 1);
    await this.searchStockLocationsAsync(
      this._model.input,
      offset,
      this._limit
    );
  }

  public updateInput(value: string): void {
    this._model.input = value;
  }

  public updateCoordinates(value: mapboxgl.LngLat | undefined): void {
    this._model.longitude = value?.lng ?? 0;
    this._model.latitude = value?.lat ?? 0;
  }

  public updateSelectedInventoryLocation(
    value: InventoryLocation | undefined
  ): void {
    this._model.selectedInventoryLocationId = value?.id;
    this._model.selectedInventoryLocation = value;
    this.updateCoordinates(value?.coordinates);
  }

  public updateSelectedInventoryLocationId(value: string | undefined): void {
    const selectedInventoryLocation = this._model.inventoryLocations.find(
      (location) => location.id == value
    );

    this.updateSelectedInventoryLocation(selectedInventoryLocation);
  }

  public updateSearchedStockLocationScrollPosition(value: number | undefined) {
    this._model.searchedStockLocationScrollPosition = value;
  }

  public isInventoryLocationIdValid(value: string): boolean {
    const inventoryLocation = this._model.inventoryLocations.find(
      (location) => location.id == value
    );

    return inventoryLocation !== undefined;
  }

  public isInventoryLocationIdSelected(value: string): boolean {
    return this._model.selectedInventoryLocationId === value;
  }

  public async getDefaultInventoryLocationAsync(): Promise<
    InventoryLocation | undefined
  > {
    return new Promise<InventoryLocation | undefined>((resolve, reject) => {
      const subscription = this._model.store
        .pipe(select((model: ExploreState) => model.inventoryLocations))
        .subscribe({
          next: (value: InventoryLocation[]) => {
            if (value.length <= 0) {
              resolve(undefined);
              subscription.unsubscribe();
              return;
            }

            resolve(value[0]);
            subscription.unsubscribe();
          },
          error: (error: any) => reject(error),
        });
    });
  }

  public async searchStockLocationsAsync(
    query: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && this._model.areSearchedStockLocationsLoading) {
      return;
    }

    this._model.areSearchedStockLocationsLoading = true;

    const result = await this._stockLocationsIndex?.search(query, {
      offset: offset,
      limit: limit,
    });

    let hits = result?.hits as StockLocation[];
    if (hits.length <= 0 && offset <= 0) {
      this._model.searchedStockLocations = [];
    }

    if (hits.length < limit && this._model.hasMoreSearchedStockLocations) {
      this._model.hasMoreSearchedStockLocations = false;
    }

    if (hits.length <= 0) {
      this._model.areSearchedStockLocationsLoading = false;
      return;
    }

    if (hits.length >= limit && !this._model.hasMoreSearchedStockLocations) {
      this._model.hasMoreSearchedStockLocations = true;
    }

    if (offset > 0) {
      const stockLocations = this._model.searchedStockLocations;
      this._model.searchedStockLocations = stockLocations.concat(hits);
    } else {
      this._model.searchedStockLocations = hits;
    }

    this._model.areSearchedStockLocationsLoading = false;
  }

  private resetMedusaModel(): void {
    this._model.inventoryLocations = [];
    this._model.selectedInventoryLocation = undefined;
    this._model.wineCount = 0;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._model.inventoryLocations =
      await this.requestInventoryLocationsAsync();

    this._model.wineCount = await this.requestWineCountAsync();

    this._currentPositionSubscription?.unsubscribe();
    this._currentPositionSubscription = PermissionsController.model.store
      .pipe(select((model) => model.currentPosition))
      .subscribe({
        next: (value) =>
          this.onCurrentPositionChanged(value, this._model.inventoryLocations),
      });

    this._selectedInventoryLocationIdSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription = this._model.localStore
      ?.pipe(select((model) => model.selectedInventoryLocationId))
      .subscribe({
        next: (id: string | undefined) => {
          if (!id) {
            this._currentPositionSubscription?.unsubscribe();
            this._currentPositionSubscription =
              PermissionsController.model.store
                .pipe(select((model) => model.currentPosition))
                .subscribe({
                  next: (value) =>
                    this.onCurrentPositionChanged(
                      value,
                      this._model.inventoryLocations
                    ),
                });
            return;
          }

          const inventoryLocation = this._model.inventoryLocations.find(
            (value) => value.id === id
          );
          if (inventoryLocation) {
            this.updateSelectedInventoryLocation(inventoryLocation);
          }

          this._model.isSelectedInventoryLocationLoaded = true;
        },
      });
  }

  private async requestWineCountAsync(): Promise<number> {
    const count = await MedusaService.requestProductCountAsync('Wine');
    return count;
  }

  private async requestInventoryLocationsAsync(): Promise<InventoryLocation[]> {
    const stockLocations = await MedusaService.requestStockLocationsAsync();
    const inventoryLocations: InventoryLocation[] = [];
    for (const stockLocation of stockLocations) {
      const location = stockLocation.location;
      const metadata = stockLocation.metadata;
      const address = location.address;
      const coordinates = metadata['coordinates'];
      if (coordinates) {
        inventoryLocations.push({
          id: location['id'],
          salesChannels: location['sales_channels'],
          coordinates: new mapboxgl.LngLat(
            coordinates['longitude'],
            coordinates['latitude']
          ),
          placeName: metadata['place_name'],
          company: address['company'] ?? '',
          region: metadata['region'] ?? '',
        });
      }
    }

    return inventoryLocations;
  }

  private onCurrentPositionChanged(
    value: GeolocationPosition,
    inventoryLocations: InventoryLocation[]
  ): void {
    if (!value?.coords || this._model.selectedInventoryLocationId) {
      return;
    }

    const { longitude, latitude } = value.coords;
    const currentPoint = new mapboxgl.LngLat(longitude, latitude);
    const point = this.findNearestPoint(currentPoint, inventoryLocations);
    if (point) {
      const inventoryLocation = this._model.inventoryLocations.find(
        (value) => value.coordinates.distanceTo(point) === 0
      );
      if (inventoryLocation) {
        this.updateSelectedInventoryLocation(inventoryLocation);
      }
    }
  }

  private findNearestPoint(
    target: mapboxgl.LngLat,
    locations: InventoryLocation[]
  ): mapboxgl.LngLat | null {
    const features = [];
    for (const location of locations) {
      features.push(
        point([location.coordinates.lng, location.coordinates.lat])
      );
    }

    const targetPoint = point([target.lng, target.lat]);
    const collection = featureCollection(features);
    if (collection.features.length <= 0) {
      return null;
    }

    const nearest = nearestPoint(
      targetPoint,
      collection as helpers.FeatureCollection<helpers.Point, helpers.Properties>
    );

    if (!nearest) {
      return null;
    }

    return new mapboxgl.LngLat(
      nearest.geometry.coordinates[0],
      nearest.geometry.coordinates[1]
    );
  }
}

export default new ExploreController();
