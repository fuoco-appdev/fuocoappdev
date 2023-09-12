import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { Product, Region, SalesChannel } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

export enum ProductTabs {
  White = 'White',
  Red = 'Red',
  Rose = 'Rose',
  Spirits = 'Spirits',
}

export interface StoreState {
  previews: PricedProduct[];
  input: string;
  selectedPreview: PricedProduct | undefined;
  regions: Region[];
  selectedRegion: Region | undefined;
  selectedTab: ProductTabs | undefined;
  selectedSalesChannel: Partial<SalesChannel> | undefined;
  pagination: number;
  hasMorePreviews: boolean;
  oldScrollPosition: number;
  scrollPosition: number;
  hideSearchTabs: boolean;
  isLoading: boolean;
}

export class StoreModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'store' },
        withProps<StoreState>({
          previews: [],
          input: '',
          selectedPreview: undefined,
          regions: [],
          selectedRegion: undefined,
          selectedTab: undefined,
          selectedSalesChannel: undefined,
          pagination: 1,
          hasMorePreviews: true,
          hideSearchTabs: false,
          oldScrollPosition: 0,
          scrollPosition: 0,
          isLoading: false,
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

  public get hideSearchTabs(): boolean {
    return this.store.getValue().hideSearchTabs;
  }

  public set hideSearchTabs(value: boolean) {
    if (this.hideSearchTabs !== value) {
      this.store.update((state) => ({
        ...state,
        hideSearchTabs: value,
      }));
    }
  }

  public get oldScrollPosition(): number {
    return this.store.getValue().oldScrollPosition;
  }

  public set oldScrollPosition(value: number) {
    if (this.oldScrollPosition !== value) {
      this.store.update((state) => ({
        ...state,
        oldScrollPosition: value,
      }));
    }
  }

  public get scrollPosition(): number {
    return this.store.getValue().scrollPosition;
  }

  public set scrollPosition(value: number) {
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
}
