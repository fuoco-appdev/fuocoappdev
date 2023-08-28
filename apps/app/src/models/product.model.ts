import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { ProductTag, ProductOption, MoneyAmount } from '@medusajs/medusa';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';

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

export interface ProductState {
  productId: string | undefined;
  thumbnail: string;
  title: string;
  subtitle: string;
  isLiked: boolean;
  likeCount: number;
  description: string;
  price: MoneyAmount | undefined;
  tags: ProductTag[];
  options: ProductOption[];
  variants: PricedVariant[];
  metadata: Record<string, unknown>;
  selectedVariant: PricedVariant | undefined;
  material: string;
  weight: string;
  countryOrigin: string;
  dimensions: string;
  type: string;
}

export class ProductModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'product' },
        withProps<ProductState>({
          productId: undefined,
          thumbnail: '',
          title: '',
          subtitle: '',
          isLiked: false,
          likeCount: 0,
          description: new Array(355).join(' '),
          price: undefined,
          tags: [],
          options: [],
          variants: [],
          metadata: {},
          selectedVariant: undefined,
          material: '-',
          weight: '-',
          countryOrigin: '-',
          dimensions: '-',
          type: '-',
        })
      )
    );
  }

  public get productId(): string | undefined {
    return this.store.getValue().productId;
  }

  public set productId(value: string | undefined) {
    if (this.productId !== value) {
      this.store.update((state) => ({ ...state, productId: value }));
    }
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

  public get price(): MoneyAmount {
    return this.store.getValue().price;
  }

  public set price(value: MoneyAmount) {
    if (JSON.stringify(this.price) !== JSON.stringify(value)) {
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

  public get metadata(): Record<string, unknown> {
    return this.store.getValue().metadata;
  }

  public set metadata(value: Record<string, unknown>) {
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

  public get material(): string {
    return this.store.getValue().material;
  }

  public set material(value: string) {
    if (this.material !== value) {
      this.store.update((state) => ({ ...state, material: value }));
    }
  }

  public get weight(): string {
    return this.store.getValue().weight;
  }

  public set weight(value: string) {
    if (this.weight !== value) {
      this.store.update((state) => ({ ...state, weight: value }));
    }
  }

  public get countryOrigin(): string {
    return this.store.getValue().countryOrigin;
  }

  public set countryOrigin(value: string) {
    if (this.countryOrigin !== value) {
      this.store.update((state) => ({ ...state, countryOrigin: value }));
    }
  }

  public get dimensions(): string {
    return this.store.getValue().dimensions;
  }

  public set dimensions(value: string) {
    if (this.dimensions !== value) {
      this.store.update((state) => ({ ...state, dimensions: value }));
    }
  }

  public get type(): string {
    return this.store.getValue().type;
  }

  public set type(value: string) {
    if (this.type !== value) {
      this.store.update((state) => ({ ...state, type: value }));
    }
  }
}
