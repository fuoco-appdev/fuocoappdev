import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import mapboxgl from 'mapbox-gl';

export interface SalesChannel {
  coordinates: mapboxgl.LngLat;
  placeName: string;
  company: string;
  region: string;
}

export interface HomeState {
  salesChannels: SalesChannel[];
  selectedSalesChannel: SalesChannel | undefined;
}

export interface HomeLocalState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export class HomeModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'home' },
        withProps<HomeState>({
          salesChannels: [],
          selectedSalesChannel: undefined,
        })
      ),
      undefined,
      createStore(
        { name: 'home-local' },
        withProps<HomeLocalState>({
          latitude: 46.1185,
          longitude: -74.5962,
          zoom: 13,
        })
      )
    );
  }

  public get latitude(): number {
    return this.localStore?.getValue().latitude;
  }

  public set latitude(value: number) {
    if (this.latitude !== value) {
      this.localStore?.update((state) => ({ ...state, latitude: value }));
    }
  }

  public get longitude(): number {
    return this.localStore?.getValue().longitude;
  }

  public set longitude(value: number) {
    if (this.longitude !== value) {
      this.localStore?.update((state) => ({ ...state, longitude: value }));
    }
  }

  public get zoom(): number {
    return this.localStore?.getValue().zoom;
  }

  public set zoom(value: number) {
    if (this.zoom !== value) {
      this.localStore?.update((state) => ({ ...state, zoom: value }));
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

  public get selectedSalesChannel(): SalesChannel | undefined {
    return this.store.getValue().selectedSalesChannel;
  }

  public set selectedSalesChannel(value: SalesChannel | undefined) {
    if (JSON.stringify(this.selectedSalesChannel) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedSalesChannel: value }));
    }
  }
}
