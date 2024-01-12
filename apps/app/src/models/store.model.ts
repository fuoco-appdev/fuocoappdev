import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { Product, Region, SalesChannel, ProductType } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { ProductLikesMetadataResponse } from 'src/protobuf/core_pb';

export enum ProductTabs {
  White = 'White',
  Red = 'Red',
  Rose = 'Rose',
  Spirits = 'Spirits',
}

export interface StoreState {
  products: Product[];
  pricedProducts: Record<string, PricedProduct>;
  productLikesMetadata: ProductLikesMetadataResponse[];
  input: string;
  selectedPricedProduct: PricedProduct | undefined;
  selectedProductLikesMetadata: ProductLikesMetadataResponse | null;
  regions: Region[];
  selectedRegion: Region | undefined;
  selectedTab: ProductTabs | undefined;
  selectedSalesChannel: Partial<SalesChannel> | undefined;
  pagination: number;
  hasMorePreviews: boolean;
  scrollPosition: number | undefined;
  isLoading: boolean;
  productTypes: ProductType[];
}

export class StoreModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'store' },
        withProps<StoreState>({
          products: [],
          pricedProducts: {},
          productLikesMetadata: [],
          input: '',
          selectedPricedProduct: undefined,
          selectedProductLikesMetadata: null,
          regions: [],
          selectedRegion: undefined,
          selectedTab: undefined,
          selectedSalesChannel: undefined,
          pagination: 1,
          hasMorePreviews: true,
          scrollPosition: undefined,
          isLoading: false,
          productTypes: [],
        })
      )
    );
  }

  public get products(): Product[] {
    return this.store.getValue().products;
  }

  public set products(value: Product[]) {
    if (JSON.stringify(this.products) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, products: value }));
    }
  }

  public get pricedProducts(): Record<string, PricedProduct> {
    return this.store.getValue().pricedProducts;
  }

  public set pricedProducts(value: Record<string, PricedProduct>) {
    if (JSON.stringify(this.pricedProducts) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, pricedProducts: value }));
    }
  }

  public get productLikesMetadata(): ProductLikesMetadataResponse[] {
    return this.store.getValue().productLikesMetadata;
  }

  public set productLikesMetadata(value: ProductLikesMetadataResponse[]) {
    if (JSON.stringify(this.productLikesMetadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, productLikesMetadata: value }));
    }
  }

  public get input(): string {
    return this.store.getValue().input;
  }

  public set input(value: string) {
    if (this.input !== value) {
      this.store.update((state) => ({ ...state, input: value }));
    }
  }

  public get selectedPricedProduct(): PricedProduct | undefined {
    return this.store.getValue().selectedPricedProduct;
  }

  public set selectedPricedProduct(value: PricedProduct | undefined) {
    if (JSON.stringify(this.selectedPricedProduct) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        selectedPricedProduct: value,
      }));
    }
  }

  public get selectedProductLikesMetadata(): ProductLikesMetadataResponse | null {
    return this.store.getValue().selectedProductLikesMetadata;
  }

  public set selectedProductLikesMetadata(
    value: ProductLikesMetadataResponse | null
  ) {
    if (
      JSON.stringify(this.selectedProductLikesMetadata) !==
      JSON.stringify(value)
    ) {
      this.store.update((state) => ({
        ...state,
        selectedProductLikesMetadata: value,
      }));
    }
  }

  public get regions(): Region[] {
    return this.store.getValue().regions;
  }

  public set regions(value: Region[]) {
    if (JSON.stringify(this.regions) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        regions: value,
      }));
    }
  }

  public get selectedRegion(): Region | undefined {
    return this.store.getValue().selectedRegion;
  }

  public set selectedRegion(value: Region | undefined) {
    if (JSON.stringify(this.selectedRegion) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        selectedRegion: value,
      }));
    }
  }

  public get selectedTab(): ProductTabs | undefined {
    return this.store.getValue().selectedTab;
  }

  public set selectedTab(value: ProductTabs | undefined) {
    if (this.selectedTab !== value) {
      this.store.update((state) => ({
        ...state,
        selectedTab: value,
      }));
    }
  }

  public get selectedSalesChannel(): Partial<SalesChannel> | undefined {
    return this.store.getValue().selectedSalesChannel;
  }

  public set selectedSalesChannel(value: Partial<SalesChannel> | undefined) {
    if (JSON.stringify(this.selectedSalesChannel) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        selectedSalesChannel: value,
      }));
    }
  }

  public get pagination(): number {
    return this.store.getValue().pagination;
  }

  public set pagination(value: number) {
    if (this.pagination !== value) {
      this.store.update((state) => ({
        ...state,
        pagination: value,
      }));
    }
  }

  public get hasMorePreviews(): boolean {
    return this.store.getValue().hasMorePreviews;
  }

  public set hasMorePreviews(value: boolean) {
    if (this.hasMorePreviews !== value) {
      this.store.update((state) => ({
        ...state,
        hasMorePreviews: value,
      }));
    }
  }

  public get scrollPosition(): number | undefined {
    return this.store.getValue().scrollPosition;
  }

  public set scrollPosition(value: number | undefined) {
    if (this.scrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        scrollPosition: value,
      }));
    }
  }

  public get isLoading(): boolean {
    return this.store.getValue().isLoading;
  }

  public set isLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.store.update((state) => ({
        ...state,
        isLoading: value,
      }));
    }
  }

  public get productTypes(): ProductType[] {
    return this.store.getValue().productTypes;
  }

  public set productTypes(value: ProductType[]) {
    if (JSON.stringify(this.productTypes) !== JSON.stringify(value)) {
      this.store.update((state) => ({
        ...state,
        productTypes: value,
      }));
    }
  }
}
