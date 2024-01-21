import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import mapboxgl from 'mapbox-gl';
import { SalesChannel } from '@medusajs/medusa';
import { StockLocation } from '@medusajs/stock-location/dist/models';

export interface InventoryLocation {
  id: string;
  coordinates: mapboxgl.LngLat;
  placeName: string;
  company: string;
  description: string;
  region: string;
  salesChannels: Partial<SalesChannel>[];
  avatar?: string;
}

export interface ExploreState {
  input: string;
  inventoryLocations: InventoryLocation[];
  searchedStockLocations: StockLocation[];
  searchedStockLocationsPagination: number;
  hasMoreSearchedStockLocations: boolean;
  searchedStockLocationScrollPosition: number | undefined;
  areSearchedStockLocationsLoading: boolean;
  selectedInventoryLocation: InventoryLocation | undefined;
  wineCount: number;
  isSelectedInventoryLocationLoaded: boolean;
  longitude: number | undefined;
  latitude: number | undefined;
  zoom: number | undefined;
}

export interface ExploreLocalState {
  selectedInventoryLocationId: string | undefined;
}

export class ExploreModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'explore' },
        withProps<ExploreState>({
          input: '',
          inventoryLocations: [],
          searchedStockLocations: [],
          searchedStockLocationsPagination: 1,
          hasMoreSearchedStockLocations: true,
          searchedStockLocationScrollPosition: 0,
          selectedInventoryLocation: undefined,
          areSearchedStockLocationsLoading: false,
          wineCount: 0,
          isSelectedInventoryLocationLoaded: false,
          longitude: undefined,
          latitude: undefined,
          zoom: undefined,
        })
      ),
      undefined,
      createStore(
        { name: 'explore-local' },
        withProps<ExploreLocalState>({
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

  public get searchedStockLocations(): StockLocation[] {
    return this.store.getValue().searchedStockLocations;
  }

  public set searchedStockLocations(value: StockLocation[]) {
    if (JSON.stringify(this.searchedStockLocations) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        searchedStockLocations: value,
      }));
    }
  }

  public get searchedStockLocationsPagination(): number {
    return this.store.getValue().searchedStockLocationsPagination;
  }

  public set searchedStockLocationsPagination(value: number) {
    if (this.searchedStockLocationsPagination !== value) {
      this.store.update((state) => ({
        ...state,
        searchedStockLocationsPagination: value,
      }));
    }
  }

  public get hasMoreSearchedStockLocations(): boolean {
    return this.store.getValue().hasMoreSearchedStockLocations;
  }

  public set hasMoreSearchedStockLocations(value: boolean) {
    if (this.hasMoreSearchedStockLocations !== value) {
      this.store.update((state) => ({
        ...state,
        hasMoreSearchedStockLocations: value,
      }));
    }
  }

  public get searchedStockLocationScrollPosition(): number | undefined {
    return this.store.getValue().searchedStockLocationScrollPosition;
  }

  public set searchedStockLocationScrollPosition(value: number | undefined) {
    if (this.searchedStockLocationScrollPosition !== value) {
      this.searchedStockLocationScrollPosition = value;
    }
  }

  public get areSearchedStockLocationsLoading(): boolean {
    return this.store.getValue().areSearchedStockLocationsLoading;
  }

  public set areSearchedStockLocationsLoading(value: boolean) {
    if (this.areSearchedStockLocationsLoading !== value) {
      this.store.update((state) => ({
        ...state,
        areSearchedStockLocationsLoading: value,
      }));
    }
  }

  public get input(): string {
    return this.store.getValue().input;
  }

  public set input(value: string) {
    if (this.input !== value) {
      this.store.update((state) => ({
        ...state,
        input: value,
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

  public get isSelectedInventoryLocationLoaded(): boolean {
    return this.store?.getValue().isSelectedInventoryLocationLoaded;
  }

  public set isSelectedInventoryLocationLoaded(value: boolean) {
    if (this.isSelectedInventoryLocationLoaded !== value) {
      this.store?.update((state) => ({
        ...state,
        isSelectedInventoryLocationLoaded: value,
      }));
    }
  }

  public get longitude(): number | undefined {
    return this.store.getValue().longitude;
  }

  public set longitude(value: number | undefined) {
    if (this.longitude !== value) {
      this.store.update((state) => ({ ...state, longitude: value }));
    }
  }

  public get latitude(): number | undefined {
    return this.store.getValue().latitude;
  }

  public set latitude(value: number | undefined) {
    if (this.latitude !== value) {
      this.store.update((state) => ({ ...state, latitude: value }));
    }
  }

  public get zoom(): number | undefined {
    return this.store.getValue().zoom;
  }

  public set zoom(value: number | undefined) {
    if (this.zoom !== value) {
      this.store.update((state) => ({ ...state, zoom: value }));
    }
  }
}
