import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

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
}

export class StoreModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'store' },
        withProps<StoreState>({
          previews: [],
          input: '',
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
}
