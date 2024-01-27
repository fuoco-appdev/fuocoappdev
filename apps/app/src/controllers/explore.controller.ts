/* eslint-disable @typescript-eslint/no-empty-function */
import { ViewState } from 'react-map-gl';
import { Controller } from '../controller';
import {
  ExploreModel,
  ExploreState,
  ExploreTabs,
  InventoryLocation,
  InventoryLocationType,
} from '../models/explore.model';
import MedusaService from '../services/medusa.service';
import mapboxgl from 'mapbox-gl';
import { point, featureCollection, nearestPoint, helpers } from '@turf/turf';
import WindowController from './window.controller';
import { Subscription } from 'rxjs';
import { select } from '@ngneat/elf';
import { PublicSecrets, StorageFolderType } from '../protobuf/core_pb';
import PermissionsController from './permissions.controller';
import { Index } from 'meilisearch';
import MeiliSearchService from '../services/meilisearch.service';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import { SalesChannel } from '@medusajs/medusa';
import BucketService from '../services/bucket.service';

class ExploreController extends Controller {
  private readonly _model: ExploreModel;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _stockLocationsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationIdSubscription: Subscription | undefined;
  private _currentPositionSubscription: Subscription | undefined;
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

    this.initializeAsync(renderCount);
  }

  public override load(renderCount: number): void {}

  public override disposeInitialization(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._currentPositionSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription?.unsubscribe();
  }

  public override disposeLoad(renderCount: number): void {
    clearTimeout(this._timerId as number | undefined);
  }

  public async loadStockLocationsAsync(): Promise<void> {
    await this.searchStockLocationsAsync(this._model.input, 0, this._limit);
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
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    this._model.hasMoreSearchedStockLocations = true;
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(() => {
      this.searchStockLocationsAsync(value, 0, this._limit);
    }, 750);
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

    if (value?.coordinates) {
      this.updateCoordinates(value?.coordinates);
    }
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

  public async updateSelectedTabAsync(
    value: ExploreTabs | undefined
  ): Promise<void> {
    this._model.selectedTab = value;
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    const offset =
      this._limit * (this._model.searchedStockLocationsPagination - 1);

    await this.searchStockLocationsAsync(
      this._model.input,
      offset,
      this._limit,
      true
    );
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

    let filter = this.getFilter();
    const result = await this._stockLocationsIndex?.search(query, {
      filter: [filter],
      offset: offset,
      limit: limit,
    });

    let hits = result?.hits as StockLocation[] | undefined;
    if (!hits) {
      this._model.areSearchedStockLocationsLoading = false;
      return;
    }

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

  public async getInventoryLocationAsync(
    stockLocation: StockLocation & { sales_channels?: SalesChannel[] }
  ): Promise<InventoryLocation | null> {
    const metadata = stockLocation.metadata;
    const address = stockLocation.address;

    let coordinates = null;
    if (
      metadata &&
      Object.keys(metadata).includes('coordinates') &&
      typeof stockLocation.metadata?.['coordinates'] === 'string'
    ) {
      coordinates = JSON.parse(metadata?.['coordinates'] as string);
    } else {
      coordinates = metadata?.['coordinates'];
    }

    let type: InventoryLocationType | undefined;
    if (metadata && Object.keys(metadata).includes('type')) {
      type = metadata?.['type'] as InventoryLocationType | undefined;
    }

    if (!coordinates || !type) {
      return null;
    }

    let avatar = undefined;
    const avatarMetadata = stockLocation.metadata?.['avatar'] as
      | string
      | undefined;
    if (avatarMetadata) {
      avatar = await BucketService.getPublicUrlAsync(
        StorageFolderType.Avatars,
        avatarMetadata
      );
    }

    return {
      id: stockLocation.id,
      salesChannels: stockLocation.sales_channels ?? [],
      coordinates: new mapboxgl.LngLat(
        coordinates?.['longitude'] ?? 0,
        coordinates?.['latitude'] ?? 0
      ),
      placeName: (metadata?.['place_name'] as string) ?? '',
      description: (metadata?.['description'] as string) ?? '',
      company: address?.['company'] ?? '',
      region: (metadata?.['region'] as string) ?? '',
      type: type,
      avatar: avatar,
    };
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._model.inventoryLocations =
      await this.requestInventoryLocationsAsync();

    this._model.isSelectedInventoryLocationLoaded = true;

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
        },
      });
  }

  private async requestInventoryLocationsAsync(): Promise<InventoryLocation[]> {
    const stockLocations = await MedusaService.requestStockLocationsAsync();
    const inventoryLocations: InventoryLocation[] = [];
    for (const stockLocation of stockLocations) {
      const inventoryLocation = await this.getInventoryLocationAsync(
        stockLocation
      );
      if (!inventoryLocation) {
        continue;
      }

      inventoryLocations.push(inventoryLocation);
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
      if (!location.coordinates) {
        continue;
      }

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

  private getFilter(): string {
    let filter = ``;
    if (this._model.selectedTab) {
      filter += `metadata.type = ${this._model.selectedTab}`;
    }

    return filter;
  }
}

export default new ExploreController();
