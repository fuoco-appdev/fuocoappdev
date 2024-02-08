import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import e from 'express';
import { Cart } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

export interface CartState {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined;
  requiredFoodProducts: PricedProduct[];
  isFoodInCartRequired: boolean | undefined;
  discountCode: string;
}

export interface CartLocalState {
  cartIds: Record<string, string | undefined>;
}

export class CartModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'cart' },
        withProps<CartState>({
          cart: undefined,
          requiredFoodProducts: [],
          isFoodInCartRequired: undefined,
          discountCode: '',
        })
      ),
      undefined,
      createStore(
        { name: 'cart-local' },
        withProps<CartLocalState>({
          cartIds: {},
        })
      )
    );
  }

  public get cart():
    | Omit<Cart, 'refundable_amount' | 'refunded_total'>
    | undefined {
    return this.store?.getValue().cart;
  }

  public set cart(
    value: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
  ) {
    if (JSON.stringify(this.cart) !== JSON.stringify(value)) {
      this.store?.update((state) => ({ ...state, cart: value }));
    }
  }

  public get requiredFoodProducts(): PricedProduct[] {
    return this.store?.getValue().requiredFoodProducts;
  }

  public set requiredFoodProducts(value: PricedProduct[]) {
    if (JSON.stringify(this.requiredFoodProducts) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        requiredFoodProducts: value,
      }));
    }
  }

  public get isFoodInCartRequired(): boolean | undefined {
    return this.store?.getValue().isFoodInCartRequired;
  }

  public set isFoodInCartRequired(value: boolean | undefined) {
    if (this.isFoodInCartRequired !== value) {
      this.store?.update((state) => ({
        ...state,
        isFoodInCartRequired: value,
      }));
    }
  }

  public get discountCode(): string {
    return this.store?.getValue().discountCode;
  }

  public set discountCode(value: string) {
    if (this.discountCode !== value) {
      this.store?.update((state) => ({ ...state, discountCode: value }));
    }
  }

  public get cartIds(): Record<string, string | undefined> {
    return this.localStore?.getValue().cartIds;
  }

  public set cartIds(value: Record<string, string | undefined>) {
    if (JSON.stringify(this.cartIds) !== JSON.stringify(value)) {
      this.localStore?.update((state) => ({ ...state, cartIds: value }));
    }
  }
}
