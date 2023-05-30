import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import mapboxgl from 'mapbox-gl';

export interface SalesChannel {
  coordinates: mapboxgl.LngLat;
  placeName: string;
  company: string;
}

export interface HomeState {
  longitude: number;
  latitude: number;
  zoom: number;
  salesChannels: SalesChannel[];
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
          salesChannels: [],
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

  public get salesChannels(): SalesChannel[] {
    return this.store.getValue().salesChannels;
  }

  public set salesChannels(value: SalesChannel[]) {
    if (JSON.stringify(this.salesChannels) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, salesChannels: value }));
    }
  }
}
