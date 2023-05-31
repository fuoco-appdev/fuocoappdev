/* eslint-disable @typescript-eslint/no-empty-function */
import { ViewState } from 'react-map-gl';
import { Controller } from '../controller';
import { HomeModel, SalesChannel } from '../models/home.model';
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

  public initialize(): void {
    this.initializeAsync();
  }

  public dispose(): void {
    this._currentPositionSubscription?.unsubscribe();
  }

  public onMapMove(state: ViewState): void {
    this._model.longitude = state.longitude;
    this._model.latitude = state.latitude;
    this._model.zoom = state.zoom;
  }

  private async initializeAsync(): Promise<void> {
    const salesChannels = await this.requestInventoryLocationsAsync();
    this._currentPositionSubscription = WindowController.model.store
      .pipe(select((model) => model.currentPosition))
      .subscribe({
        next: (value) => this.onCurrentPositionChanged(value, salesChannels),
      });
  }

  private async requestInventoryLocationsAsync(): Promise<SalesChannel[]> {
    const locations = await MedusaService.requestStockLocationsAsync();
    const salesChannels: SalesChannel[] = [];
    for (const location of locations.locations) {
      const metadata = JSON.parse(location.metadata);
      const coordinates = metadata['coordinates'];
      if (coordinates) {
        salesChannels.push({
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

    this._model.salesChannels = salesChannels;
    return salesChannels;
  }

  private onCurrentPositionChanged(
    value: GeolocationPosition,
    salesChannels: SalesChannel[]
  ): void {
    if (!value?.coords) {
      return;
    }

    const { longitude, latitude } = value.coords;
    const currentPoint = new mapboxgl.LngLat(longitude, latitude);
    const point = this.findNearestPoint(currentPoint, salesChannels);
    if (point) {
      const selectedChannel = salesChannels.find(
        (value) => value.coordinates.distanceTo(point) === 0
      );
      this._model.selectedSalesChannel = selectedChannel ?? undefined;
    }
  }

  private findNearestPoint(
    target: mapboxgl.LngLat,
    channels: SalesChannel[]
  ): mapboxgl.LngLat | null {
    const features = [];
    for (const channel of channels) {
      features.push(point([channel.coordinates.lng, channel.coordinates.lat]));
    }

    const targetPoint = point([target.lng, target.lat]);
    const collection = featureCollection(features);
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
