import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export enum ProductOptions {
  Alcohol = 'Alcohol',
  Brand = 'Brand',
  Code = 'Code',
  Format = 'Format',
  Region = 'Region',
  ResidualSugar = 'Residual Sugar',
  Type = 'Type',
  UVC = 'UVC',
  Vintage = 'Vintage',
}

export interface ProductTag {
  value: string;
  metadata: Record<string, unknown>;
}

export interface ProductPrice {
  amount?: number;
  currency_code?: string;
  region_id?: string;
  variant_id?: string;
}

export interface PricedVariant {
  id?: string;
  title?: string;
  options?: ProductOption[];
  prices?: ProductPrice[];
  inventory_quantity?: number;
}

export interface ProductOption {
  id?: string;
  product_id?: string;
  title?: string;
  value?: string;
  variant_id?: string;
  option_id?: string;
}

export interface ProductMetadata {
  brand?: string;
  region?: string;
}

export interface ProductState {
  thumbnail: string;
  title: string;
  subtitle: string;
  isLiked: boolean;
  likeCount: number;
  description: string;
  price: string;
  tags: ProductTag[];
  options: ProductOption[];
  variants: PricedVariant[];
  metadata: ProductMetadata;
  selectedVariant: PricedVariant | undefined;
}

export class ProductModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'product' },
        withProps<ProductState>({
          thumbnail: '',
          title: '',
          subtitle: '',
          isLiked: false,
          likeCount: 0,
          description: new Array(355).join(' '),
          price: '',
          tags: [],
          options: [],
          variants: [],
          metadata: {},
          selectedVariant: undefined,
        })
      )
    );
  }

  public get thumbnail(): string {
    return this.store.getValue().thumbnail;
  }

  public set thumbnail(value: string) {
    if (this.thumbnail !== value) {
      this.store.update((state) => ({ ...state, thumbnail: value }));
    }
  }

  public get title(): string {
    return this.store.getValue().title;
  }

  public set title(value: string) {
    if (this.title !== value) {
      this.store.update((state) => ({ ...state, title: value }));
    }
  }

  public get subtitle(): string {
    return this.store.getValue().subtitle;
  }

  public set subtitle(value: string) {
    if (this.subtitle !== value) {
      this.store.update((state) => ({ ...state, subtitle: value }));
    }
  }

  public get isLiked(): boolean {
    return this.store.getValue().isLiked;
  }

  public set isLiked(value: boolean) {
    if (this.isLiked !== value) {
      this.store.update((state) => ({ ...state, isLiked: value }));
    }
  }

  public get likeCount(): number {
    return this.store.getValue().likeCount;
  }

  public set likeCount(value: number) {
    if (this.likeCount !== value) {
      this.store.update((state) => ({ ...state, likeCount: value }));
    }
  }

  public get description(): string {
    return this.store.getValue().description;
  }

  public set description(value: string) {
    if (this.description !== value) {
      this.store.update((state) => ({ ...state, description: value }));
    }
  }

  public get price(): string {
    return this.store.getValue().price;
  }

  public set price(value: string) {
    if (this.price !== value) {
      this.store.update((state) => ({ ...state, price: value }));
    }
  }

  public get tags(): ProductTag[] {
    return this.store.getValue().tags;
  }

  public set tags(value: ProductTag[]) {
    if (JSON.stringify(this.tags) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, tags: value }));
    }
  }

  public get options(): ProductOption[] {
    return this.store.getValue().options;
  }

  public set options(value: ProductOption[]) {
    if (JSON.stringify(this.options) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, options: value }));
    }
  }

  public get variants(): PricedVariant[] {
    return this.store.getValue().variants;
  }

  public set variants(value: PricedVariant[]) {
    if (JSON.stringify(this.variants) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, variants: value }));
    }
  }

  public get metadata(): ProductMetadata {
    return this.store.getValue().metadata;
  }

  public set metadata(value: ProductMetadata) {
    if (JSON.stringify(this.metadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, metadata: value }));
    }
  }

  public get selectedVariant(): PricedVariant | undefined {
    return this.store.getValue().selectedVariant;
  }

  public set selectedVariant(value: PricedVariant | undefined) {
    if (JSON.stringify(this.selectedVariant) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, selectedVariant: value }));
    }
  }
}
