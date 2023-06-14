import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { Product, Region, SalesChannel } from '@medusajs/medusa';

export enum ProductTabs {
  New = 'new',
  White = 'white',
  Red = 'red',
  Rose = 'rose',
  Spirits = 'spirits',
}

export interface StoreState {
  previews: Product[];
  input: string;
  selectedPreview: Product | undefined;
  regions: Region[];
  selectedRegion: Region | undefined;
  selectedTab: ProductTabs | undefined;
  selectedSalesChannel: Partial<SalesChannel> | undefined;
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
        })
      )
    );
  }

  public get previews(): Product[] {
    return this.store.getValue().previews;
  }

  public set previews(value: Product[]) {
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

  public get selectedPreview(): Product | undefined {
    return this.store.getValue().selectedPreview;
  }

  public set selectedPreview(value: Product | undefined) {
    if (JSON.stringify(this.selectedPreview) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedPreview: value }));
    }
  }

  public get regions(): Region[] {
    return this.store?.getValue().regions;
  }

  public set regions(value: Region[]) {
    if (JSON.stringify(this.regions) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        regions: value,
      }));
    }
  }

  public get selectedRegion(): Region | undefined {
    return this.store?.getValue().selectedRegion;
  }

  public set selectedRegion(value: Region | undefined) {
    if (JSON.stringify(this.selectedRegion) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        selectedRegion: value,
      }));
    }
  }

  public get selectedTab(): ProductTabs | undefined {
    return this.store?.getValue().selectedTab;
  }

  public set selectedTab(value: ProductTabs | undefined) {
    if (this.selectedTab !== value) {
      this.store?.update((state) => ({
        ...state,
        selectedTab: value,
      }));
    }
  }

  public get selectedSalesChannel(): Partial<SalesChannel> | undefined {
    return this.store?.getValue().selectedSalesChannel;
  }

  public set selectedSalesChannel(value: Partial<SalesChannel> | undefined) {
    if (JSON.stringify(this.selectedSalesChannel) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        selectedSalesChannel: value,
      }));
    }
  }
}
