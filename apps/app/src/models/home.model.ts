import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import mapboxgl from 'mapbox-gl';

export interface HomeState {
  longitude: number;
  latitude: number;
  zoom: number;
  salesChannelPoints: mapboxgl.LngLat[];
}

export class HomeModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'home' },
        withProps<HomeState>({
          latitude: 46.1185,
          longitude: -74.5962,
          zoom: 14,
          salesChannelPoints: [new mapboxgl.LngLat(-74.5962, 46.1185)],
        })
      )
    );
  }

  public get latitude(): number {
    return this.store.getValue().latitude;
  }

  public set latitude(value: number) {
    if (this.latitude !== value) {
      this.store.update((state) => ({ ...state, latitude: value }));
    }
  }

  public get longitude(): number {
    return this.store.getValue().longitude;
  }

  public set longitude(value: number) {
    if (this.longitude !== value) {
      this.store.update((state) => ({ ...state, longitude: value }));
    }
  }

  public get zoom(): number {
    return this.store.getValue().zoom;
  }

  public set zoom(value: number) {
    if (this.zoom !== value) {
      this.store.update((state) => ({ ...state, zoom: value }));
    }
  }

  public get salesChannelPoints(): mapboxgl.LngLat[] {
    return this.store.getValue().salesChannelPoints;
  }

  public set salesChannelPoints(value: mapboxgl.LngLat[]) {
    if (JSON.stringify(this.salesChannelPoints) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, salesChannelPoints: value }));
    }
  }
}
