import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface FulfillmentProvider {
  id?: string;
  is_installed?: boolean;
}

export interface PaymentProvider {
  id?: string;
  is_installed?: boolean;
}

export interface Country {
  id?: number;
  iso_2?: string;
  iso_3?: string;
  num_code?: number;
  name?: string;
}

export interface Region {
  automatic_taxes?: boolean;
  countries?: Country[];
  created_at?: Date;
  currency_code?: string;
  deleted_at?: Date | null;
  fulfillment_providers?: FulfillmentProvider[];
  gift_cards_taxable?: boolean;
  id?: string;
  includes_tax?: boolean;
  metadata?: object | null;
  name?: string;
  payment_providers?: PaymentProvider[];
  tax_code?: string;
  tax_provider_id?: string | null;
  tax_rate?: number;
  updated_at?: Date;
}

export interface WinePricePreview {
  amount: number;
  created_at: string;
  currency_code: string;
  deleted_at: string;
  id: string;
  max_quantity: number;
  min_quantity: number;
  price_list_id: string;
  region_id: string;
  updated_at: string;
  variant_id: string;
}

export interface WineVariantPreview {
  prices: WinePricePreview[];
}

export interface WinePreview {
  id: string | null;
  title: string | null;
  subtitle: string | null;
  thumbnail: string | null;
  handle: string | null;
  variants: WineVariantPreview[];
}

export interface StoreState {
  previews: WinePreview[];
  input: string;
  selectedPreview: WinePreview | undefined;
  regions: Region[];
  selectedRegion: Region | undefined;
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
        })
      )
    );
  }

  public get previews(): WinePreview[] {
    return this.store.getValue().previews;
  }

  public set previews(value: WinePreview[]) {
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

  public get selectedPreview(): WinePreview | undefined {
    return this.store.getValue().selectedPreview;
  }

  public set selectedPreview(value: WinePreview | undefined) {
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
}
