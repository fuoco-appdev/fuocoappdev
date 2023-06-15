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

class HomeController extends Controller {
  private readonly _model: HomeModel;
  private _currentPositionSubscription: Subscription | undefined;

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
    this._currentPositionSubscription?.unsubscribe();
  }

  public onMapMove(state: ViewState): void {
    this._model.longitude = state.longitude;
    this._model.latitude = state.latitude;
    this._model.zoom = state.zoom;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    if (renderCount <= 1) {
      this._model.inventoryLocations =
        await this.requestInventoryLocationsAsync();
      if (this._model.inventoryLocations.length > 0) {
        this._model.selectedInventoryLocation =
          this._model.inventoryLocations[0];
      }
    }
    this._currentPositionSubscription = WindowController.model.store
      .pipe(select((model) => model.currentPosition))
      .subscribe({
        next: (value) =>
          this.onCurrentPositionChanged(value, this._model.inventoryLocations),
      });
  }

  private async requestInventoryLocationsAsync(): Promise<InventoryLocation[]> {
    const locations = await MedusaService.requestStockLocationsAsync();
    const inventoryLocations: InventoryLocation[] = [];
    for (const location of locations.locations) {
      const metadata = JSON.parse(location.metadata);
      const coordinates = metadata['coordinates'];
      if (coordinates) {
        inventoryLocations.push({
          salesChannels: location.salesChannels,
          coordinates: new mapboxgl.LngLat(
            coordinates['longitude'],
            coordinates['latitude']
          ),
          placeName: metadata['place_name'],
          company: location.address?.company ?? '',
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
    if (!value?.coords) {
      return;
    }

    const { longitude, latitude } = value.coords;
    const currentPoint = new mapboxgl.LngLat(longitude, latitude);
    const point = this.findNearestPoint(currentPoint, inventoryLocations);
    if (point) {
      const inventoryLocation = inventoryLocations.find(
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
