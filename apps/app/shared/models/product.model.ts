import { HttpTypes } from '@medusajs/types';
import { makeObservable } from 'mobx';
import { Model } from '../model';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { ProductMetadataResponse } from '../protobuf/product_pb';
import { StoreOptions } from '../store-options';

export enum ProductTabType {
  Price = 'price',
  Locations = 'locations',
}

export enum ProductOptions {
  Alcohol = 'Alcohol',
  Brand = 'Brand',
  Varietals = 'Varietals',
  ProducerBottler = 'Producer Bottler',
  Code = 'Code',
  Format = 'Format',
  Region = 'Region',
  ResidualSugar = 'Residual Sugar',
  Type = 'Type',
  UVC = 'UVC',
  Vintage = 'Vintage',
}

export class ProductModel extends Model {
  public isLoading: boolean;
  public productId: string | undefined;
  public variants: HttpTypes.AdminProductVariant[] | undefined;
  public metadata: ProductMetadataResponse | undefined;
  public selectedVariant: HttpTypes.AdminProductVariant | undefined;
  public likesMetadata: ProductLikesMetadataResponse | null;
  public activeTabId: ProductTabType;
  public prevTransitionKeyIndex: number;
  public transitionKeyIndex: number;
  public stockLocationInput: string;
  public searchedStockLocations: HttpTypes.AdminStockLocation[];
  public searchedStockLocationsPagination: number;
  public hasMoreSearchedStockLocations: boolean;
  public searchedStockLocationScrollPosition: number | undefined;
  public areSearchedStockLocationsLoading: boolean;

  constructor(options?: StoreOptions) {
    super(options);

    makeObservable(this);

    this.isLoading = false;
    this.productId = undefined;
    this.variants = undefined;
    this.metadata = undefined;
    this.selectedVariant = undefined;
    this.likesMetadata = null;
    this.activeTabId = ProductTabType.Locations;
    this.prevTransitionKeyIndex = 0;
    this.transitionKeyIndex = 0;
    this.stockLocationInput = '';
    this.searchedStockLocations = [];
    this.searchedStockLocationsPagination = 1;
    this.hasMoreSearchedStockLocations = true;
    this.searchedStockLocationScrollPosition = 0;
    this.areSearchedStockLocationsLoading = false;
  }

  public updateStockLocationInput(value: string) {
    if (this.stockLocationInput !== value) {
      this.stockLocationInput = value;
    }
  }

  public updateIsLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.isLoading = value;
    }
  }

  public updateProductId(value: string | undefined) {
    if (this.productId !== value) {
      this.productId = value;
    }
  }

  public updateVariants(value: HttpTypes.AdminProductVariant[] | undefined) {
    if (JSON.stringify(this.variants) !== JSON.stringify(value)) {
      this.variants = value;
    }
  }

  public updateMetadata(value: ProductMetadataResponse | undefined) {
    if (JSON.stringify(this.metadata) !== JSON.stringify(value)) {
      this.metadata = value;
    }
  }

  public updateSelectedVariant(
    value: HttpTypes.AdminProductVariant | undefined
  ) {
    if (JSON.stringify(this.selectedVariant) !== JSON.stringify(value)) {
      this.selectedVariant = value;
    }
  }

  public updateLikesMetadata(value: ProductLikesMetadataResponse | null) {
    if (JSON.stringify(this.likesMetadata) !== JSON.stringify(value)) {
      this.likesMetadata = value;
    }
  }

  public updateActiveTabId(value: ProductTabType) {
    if (JSON.stringify(this.activeTabId) !== JSON.stringify(value)) {
      this.activeTabId = value;
    }
  }

  public updatePrevTransitionKeyIndex(value: number) {
    if (this.prevTransitionKeyIndex !== value) {
      this.prevTransitionKeyIndex = value;
    }
  }

  public updateTransitionKeyIndex(value: number) {
    if (this.transitionKeyIndex !== value) {
      this.transitionKeyIndex = value;
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
}
