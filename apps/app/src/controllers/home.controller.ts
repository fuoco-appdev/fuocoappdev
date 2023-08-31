/* eslint-disable @typescript-eslint/no-empty-function */
import { ViewState } from 'react-map-gl';
import { Controller } from '../controller';
import { HomeModel, InventoryLocation } from '../models/home.model';
import MedusaService from '../services/medusa.service';
import mapboxgl from 'mapbox-gl';
import { point, featureCollection, nearestPoint, helpers } from '@turf/turf';
import WindowController from './window.controller';
import { Subscription } from 'rxjs';
import { select } from '@ngneat/elf';
import SecretsService from '../services/secrets.service';
import { PublicSecrets } from '../protobuf/core_pb';

class HomeController extends Controller {
  private readonly _model: HomeModel;
  private _selectedInventoryLocationIdSubscription: Subscription | undefined;
  private _currentPositionSubscription: Subscription | undefined;
  private _publicSecretsSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new HomeModel();
  }

  public get model(): HomeModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync(renderCount);
  }

  public override dispose(renderCount: number): void {
    this._publicSecretsSubscription?.unsubscribe();
    this._selectedInventoryLocationIdSubscription?.unsubscribe();
  }

  public onMapMove(state: ViewState): void {
    this._model.longitude = state.longitude;
    this._model.latitude = state.latitude;
    this._model.zoom = state.zoom;
  }

  public updateSelectedInventoryLocation(
    value: InventoryLocation | undefined
  ): void {
    this._model.selectedInventoryLocation = value;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    if (renderCount <= 1) {
      this._model.inventoryLocations =
        await this.requestInventoryLocationsAsync();

      this._model.wineCount = await this.requestWineCountAsync();
    }
    this._selectedInventoryLocationIdSubscription = this._model.store
      .pipe(select((model) => model.selectedInventoryLocationId))
      .subscribe({
        next: (id: string | undefined) => {
          if (!id) {
            return;
          }

          const inventoryLocation = this._model.inventoryLocations.find(
            (value) => value.id === id
          );
          this._model.selectedInventoryLocation =
            inventoryLocation ?? undefined;
          this._model.longitude = inventoryLocation?.coordinates.lng ?? 0;
          this._model.latitude = inventoryLocation?.coordinates.lat ?? 0;
        },
      });

    this._currentPositionSubscription = WindowController.model.store
      .pipe(select((model) => model.currentPosition))
      .subscribe({
        next: (value) =>
          this.onCurrentPositionChanged(value, this._model.inventoryLocations),
      });

    this._publicSecretsSubscription =
      SecretsService.publicSecretsObservable.subscribe(
        (value: PublicSecrets | null) => {
          if (!value) {
            return;
          }

          this._model.accessToken = value.mapboxAccessToken;
        }
      );
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
      this._model.selectedInventoryLocation = inventoryLocation ?? undefined;
      this._model.longitude = inventoryLocation?.coordinates.lng ?? 0;
      this._model.latitude = inventoryLocation?.coordinates.lat ?? 0;
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

export default new HomeController();
