import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { StoreOptions } from '../store-options';

export enum ProductTabs {
  // Restaurant
  Appetizers = 'Appetizers',
  MainCourses = 'MainCourses',
  Desserts = 'Desserts',
  Extras = 'Extras',
  Wines = 'Wines',
  // Cellar
  White = 'White',
  Red = 'Red',
  Rose = 'Rose',
  Spirits = 'Spirits',
  // Market
  Produce = 'Produce',
  Fruit = 'Fruits',
  Bread = 'Bread',
  Grains = 'Grains',
  Meats = 'Meats',
  Fish = 'Fish',
  Condiments = 'Condiments',
  Beverages = 'Beverages',
  Snacks = 'Snacks',
  Dairy = 'Dairy',
  Oils = 'Oils',
  Baking = 'Baking',
  Spices = 'Spices',
  Frozen = 'Frozen',
  CannedGoods = 'CannedGoods',
}

export class StoreModel extends Model {
  @observable
  public products: HttpTypes.StoreProduct[];
  @observable
  public pricedProducts: Record<string, HttpTypes.StoreProduct>;
  @observable
  public productLikesMetadata: ProductLikesMetadataResponse[];
  @observable
  public input: string;
  @observable
  public selectedPricedProduct: HttpTypes.StoreProduct | undefined;
  @observable
  public selectedProductLikesMetadata: ProductLikesMetadataResponse | null;
  @observable
  public regions: HttpTypes.StoreRegion[];
  @observable
  public selectedRegion: HttpTypes.StoreRegion | undefined;
  @observable
  public selectedTab: ProductTabs | undefined;
  @observable
  public selectedSalesChannel: Partial<HttpTypes.AdminSalesChannel> | undefined;
  @observable
  public pagination: number;
  @observable
  public hasMorePreviews: boolean;
  @observable
  public scrollPosition: number | undefined;
  @observable
  public isLoading: boolean;
  @observable
  public isReloading: boolean;
  @observable
  public productTypes: HttpTypes.StoreProductType[];

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    this.products = [];
    this.pricedProducts = {};
    this.productLikesMetadata = [];
    this.input = '';
    this.selectedPricedProduct = undefined;
    this.selectedProductLikesMetadata = null;
    this.regions = [];
    this.selectedRegion = undefined;
    this.selectedTab = undefined;
    this.selectedSalesChannel = undefined;
    this.pagination = 1;
    this.hasMorePreviews = true;
    this.scrollPosition = undefined;
    this.isLoading = false;
    this.isReloading = false;
    this.productTypes = [];
  }

  public updateProducts(value: HttpTypes.StoreProduct[]) {
    if (JSON.stringify(this.products) !== JSON.stringify(value)) {
      this.products = value;
    }
  }

  public updatePricedProducts(value: Record<string, HttpTypes.StoreProduct>) {
    if (JSON.stringify(this.pricedProducts) !== JSON.stringify(value)) {
      this.pricedProducts = value;
    }
  }

  public updateProductLikesMetadata(value: ProductLikesMetadataResponse[]) {
    if (JSON.stringify(this.productLikesMetadata) !== JSON.stringify(value)) {
      this.productLikesMetadata = value;
    }
  }

  public updateInput(value: string) {
    if (this.input !== value) {
      this.input = value;
    }
  }

  public updateSelectedPricedProduct(
    value: HttpTypes.StoreProduct | undefined
  ) {
    if (JSON.stringify(this.selectedPricedProduct) !== JSON.stringify(value)) {
      this.selectedPricedProduct = value;
    }
  }

  public updateSelectedProductLikesMetadata(
    value: ProductLikesMetadataResponse | null
  ) {
    if (
      JSON.stringify(this.selectedProductLikesMetadata) !==
      JSON.stringify(value)
    ) {
      this.selectedProductLikesMetadata = value;
    }
  }

  public updateRegions(value: HttpTypes.StoreRegion[]) {
    if (JSON.stringify(this.regions) !== JSON.stringify(value)) {
      this.regions = value;
    }
  }

  public updateSelectedRegion(value: HttpTypes.StoreRegion | undefined) {
    if (JSON.stringify(this.selectedRegion) !== JSON.stringify(value)) {
      this.selectedRegion = value;
    }
  }

  public updateSelectedTab(value: ProductTabs | undefined) {
    if (this.selectedTab !== value) {
      this.selectedTab = value;
    }
  }

  public updateSelectedSalesChannel(
    value: Partial<HttpTypes.AdminSalesChannel> | undefined
  ) {
    if (JSON.stringify(this.selectedSalesChannel) !== JSON.stringify(value)) {
      this.selectedSalesChannel = value;
    }
  }

  public updatePagination(value: number) {
    if (this.pagination !== value) {
      this.pagination = value;
    }
  }

  public updateHasMorePreviews(value: boolean) {
    if (this.hasMorePreviews !== value) {
      this.hasMorePreviews = value;
    }
  }

  public updateScrollPosition(value: number | undefined) {
    if (this.scrollPosition !== value) {
      this.scrollPosition = value;
    }
  }

  public updateIsLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.isLoading = value;
    }
  }

  public updateIsReloading(value: boolean) {
    if (this.isReloading !== value) {
      this.isReloading = value;
    }
  }

  public updateProductTypes(value: HttpTypes.StoreProductType[]) {
    if (JSON.stringify(this.productTypes) !== JSON.stringify(value)) {
      this.productTypes = value;
    }
  }
}
