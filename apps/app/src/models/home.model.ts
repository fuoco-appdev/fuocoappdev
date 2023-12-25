import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import mapboxgl from 'mapbox-gl';
import { SalesChannel } from '@medusajs/medusa';

export interface InventoryLocation {
  id: string;
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
}

export interface HomeLocalState {
  selectedInventoryLocationId: string | undefined;
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
        })
      ),
      undefined,
      createStore(
        { name: 'home-local' },
        withProps<HomeLocalState>({
          selectedInventoryLocationId: undefined,
        })
      )
    );
  }

  public get selectedInventoryLocationId(): string | undefined {
    return this.localStore?.getValue().selectedInventoryLocationId;
  }

  public set selectedInventoryLocationId(value: string | undefined) {
    if (this.selectedInventoryLocationId !== value) {
      this.localStore?.update((state) => ({
        ...state,
        selectedInventoryLocationId: value,
      }));
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
}
