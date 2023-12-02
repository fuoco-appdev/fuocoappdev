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
  previews: PricedProduct[];
  productLikesMetadata: ProductLikesMetadataResponse[];
  input: string;
  selectedPreview: PricedProduct | undefined;
  selectedProductLikesMetadata: ProductLikesMetadataResponse | undefined;
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
          previews: [],
          productLikesMetadata: [],
          input: '',
          selectedPreview: undefined,
          selectedProductLikesMetadata: undefined,
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

  public get previews(): PricedProduct[] {
    return this.store.getValue().previews;
  }

  public set previews(value: PricedProduct[]) {
    if (JSON.stringify(this.previews) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, previews: value }));
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

  public get selectedPreview(): PricedProduct | undefined {
    return this.store.getValue().selectedPreview;
  }

  public set selectedPreview(value: PricedProduct | undefined) {
    if (JSON.stringify(this.selectedPreview) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedPreview: value }));
    }
  }

  public get selectedProductLikesMetadata():
    | ProductLikesMetadataResponse
    | undefined {
    return this.store.getValue().selectedProductLikesMetadata;
  }

  public set selectedProductLikesMetadata(
    value: ProductLikesMetadataResponse | undefined
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
