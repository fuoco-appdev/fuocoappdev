import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { ProductLikesMetadataResponse } from '../protobuf/core_pb';
import { ProductTag, ProductOption, MoneyAmount } from '@medusajs/medusa';
import {
  PricedVariant,
  PricedProduct,
} from '@medusajs/medusa/dist/types/pricing';

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
  isLoading: boolean;
  productId: string | undefined;
  product: PricedProduct | undefined;
  selectedVariant: PricedVariant | undefined;
  likesMetadata: ProductLikesMetadataResponse | null;
}

export class ProductModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'product' },
        withProps<ProductState>({
          isLoading: true,
          productId: undefined,
          product: undefined,
          selectedVariant: undefined,
          likesMetadata: null,
        })
      )
    );
  }

  public get isLoading(): boolean {
    return this.store.getValue().isLoading;
  }

  public set isLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.store.update((state) => ({ ...state, isLoading: value }));
    }
  }

  public get productId(): string | undefined {
    return this.store.getValue().productId;
  }

  public set productId(value: string | undefined) {
    if (this.productId !== value) {
      this.store.update((state) => ({ ...state, productId: value }));
    }
  }

  public get product(): PricedProduct | undefined {
    return this.store.getValue().product;
  }

  public set product(value: PricedProduct | undefined) {
    if (JSON.stringify(this.product) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, product: value }));
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

  public get likesMetadata(): ProductLikesMetadataResponse | null {
    return this.store.getValue().likesMetadata;
  }

  public set likesMetadata(value: ProductLikesMetadataResponse | null) {
    if (JSON.stringify(this.likesMetadata) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, likesMetadata: value }));
    }
  }
}
