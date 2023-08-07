import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import mapboxgl from 'mapbox-gl';
import { SalesChannel } from '@medusajs/medusa';

export interface InventoryLocation {
  coordinates: mapboxgl.LngLat;
  placeName: string;
  company: string;
  region: string;
  salesChannels: Partial<SalesChannel>[];
}

export interface HomeState {
  inventoryLocations: InventoryLocation[];
  selectedInventoryLocation: InventoryLocation | undefined;
  wineCount: number;
  accessToken: string | undefined;
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
          inventoryLocations: [],
          selectedInventoryLocation: undefined,
          wineCount: 0,
          accessToken: undefined,
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

  public get inventoryLocations(): InventoryLocation[] {
    return this.store.getValue().inventoryLocations;
  }

  public set inventoryLocations(value: InventoryLocation[]) {
    if (JSON.stringify(this.inventoryLocations) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, inventoryLocations: value }));
    }
  }

  public get wineCount(): number {
    return this.store.getValue().wineCount;
  }

  public set wineCount(value: number) {
    if (this.wineCount !== value) {
      this.store.update((state) => ({ ...state, wineCount: value }));
    }
  }

  public get selectedInventoryLocation(): InventoryLocation | undefined {
    return this.store.getValue().selectedInventoryLocation;
  }

  public set selectedInventoryLocation(value: InventoryLocation | undefined) {
    if (
      JSON.stringify(this.selectedInventoryLocation) !== JSON.stringify(value)
    ) {
      this.store.update((state) => ({
        ...state,
        selectedInventoryLocation: value,
      }));
    }
  }

  public get accessToken(): string {
    return this.store?.getValue().accessToken;
  }

  public set accessToken(value: string) {
    if (this.accessToken !== value) {
      this.store?.update((state) => ({ ...state, accessToken: value }));
    }
  }
}
