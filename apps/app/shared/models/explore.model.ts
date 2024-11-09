import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export enum InventoryLocationType {
  Cellar = 'cellar',
  Restaurant = 'restaurant',
}

export enum ExploreTabs {
  Cellar = 'Cellar',
  Restaurant = 'Restaurant',
}

export interface InventoryLocation {
  id: string;
  coordinates: { lng: number; lat: number };
  placeName: string;
  company: string;
  description: string;
  region: string;
  salesChannels: Partial<HttpTypes.AdminSalesChannel>[];
  type?: InventoryLocationType;
  avatar?: string;
  thumbnails?: string[];
}

export class ExploreModel extends Model {
  @observable
  public input: string;
  @observable
  public selectedTab: ExploreTabs | undefined;
  @observable
  public inventoryLocations: InventoryLocation[];
  @observable
  public searchedStockLocations: HttpTypes.AdminStockLocation[];
  @observable
  public searchedStockLocationsPagination: number;
  @observable
  public hasMoreSearchedStockLocations: boolean;
  @observable
  public searchedStockLocationScrollPosition: number | undefined;
  @observable
  public areSearchedStockLocationsLoading: boolean;
  @observable
  public areSearchedStockLocationsReloading: boolean;
  @observable
  public selectedInventoryLocation: InventoryLocation | undefined;
  @observable
  public wineCount: number;
  @observable
  public isSelectedInventoryLocationLoaded: boolean;
  @observable
  public longitude: number | undefined;
  @observable
  public latitude: number | undefined;
  @observable
  public zoom: number | undefined;
  @observable
  public selectedInventoryLocationId: string | undefined;

  constructor(options?: StoreOptions) {
    super({
      ...options,
      ...{ persistableProperties: { local: ['_selectedInventoryLocationId'] } },
    });
    makeObservable(this);

    this.input = '';
    this.selectedTab = undefined;
    this.inventoryLocations = [];
    this.searchedStockLocations = [];
    this.searchedStockLocationsPagination = 1;
    this.hasMoreSearchedStockLocations = true;
    this.searchedStockLocationScrollPosition = 0;
    this.selectedInventoryLocation = undefined;
    this.areSearchedStockLocationsLoading = false;
    this.areSearchedStockLocationsReloading = false;
    this.wineCount = 0;
    this.isSelectedInventoryLocationLoaded = false;
    this.longitude = undefined;
    this.latitude = undefined;
    this.zoom = undefined;
    this.selectedInventoryLocationId = undefined;
  }

  public updateSelectedTab(value: ExploreTabs | undefined) {
    if (this.selectedTab !== value) {
      this.selectedTab = value;
    }
  }

  public updateSelectedInventoryLocationId(value: string | undefined) {
    if (this.selectedInventoryLocationId !== value) {
      this.selectedInventoryLocationId = value;
    }
  }

  public updateSearchedStockLocations(value: HttpTypes.AdminStockLocation[]) {
    if (JSON.stringify(this.searchedStockLocations) !== JSON.stringify(value)) {
      this.searchedStockLocations = value;
    }
  }

  public updateSearchedStockLocationsPagination(value: number) {
    if (this.searchedStockLocationsPagination !== value) {
      this.searchedStockLocationsPagination = value;
    }
  }

  public updateHasMoreSearchedStockLocations(value: boolean) {
    if (this.hasMoreSearchedStockLocations !== value) {
      this.hasMoreSearchedStockLocations = value;
    }
  }

  public updateSearchedStockLocationScrollPosition(value: number | undefined) {
    if (this.searchedStockLocationScrollPosition !== value) {
      this.searchedStockLocationScrollPosition = value;
    }
  }

  public updateAreSearchedStockLocationsLoading(value: boolean) {
    if (this.areSearchedStockLocationsLoading !== value) {
      this.areSearchedStockLocationsLoading = value;
    }
  }

  public updateAreSearchedStockLocationsReloading(value: boolean) {
    if (this.areSearchedStockLocationsReloading !== value) {
      this.areSearchedStockLocationsReloading = value;
    }
  }

  public updateInput(value: string) {
    if (this.input !== value) {
      this.input = value;
    }
  }

  public updateInventoryLocations(value: InventoryLocation[]) {
    if (JSON.stringify(this.inventoryLocations) !== JSON.stringify(value)) {
      this.inventoryLocations = value;
    }
  }

  public updateWineCount(value: number) {
    if (this.wineCount !== value) {
      this.wineCount = value;
    }
  }

  public updateSelectedInventoryLocation(value: InventoryLocation | undefined) {
    if (
      JSON.stringify(this.selectedInventoryLocation) !== JSON.stringify(value)
    ) {
      this.selectedInventoryLocation = value;
    }
  }

  public updateIsSelectedInventoryLocationLoaded(value: boolean) {
    if (this.isSelectedInventoryLocationLoaded !== value) {
      this.isSelectedInventoryLocationLoaded = value;
    }
  }

  public updateLongitude(value: number | undefined) {
    if (this.longitude !== value) {
      this.longitude = value;
    }
  }

  public updateLatitude(value: number | undefined) {
    if (this.latitude !== value) {
      this.latitude = value;
    }
  }

  public updateZoom(value: number | undefined) {
    if (this.zoom !== value) {
      this.zoom = value;
    }
  }
}
