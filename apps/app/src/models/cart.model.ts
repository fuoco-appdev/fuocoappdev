import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import e from 'express';
import { Cart } from '@medusajs/medusa';

export interface CartState {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined;
}

export interface CartLocalState {
  cartId: string | undefined;
}

export class CartModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'cart' },
        withProps<CartState>({
          cart: undefined,
        })
      ),
      undefined,
      createStore(
        { name: 'cart-local' },
        withProps<CartLocalState>({
          cartId: undefined,
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
    if (this.cart !== value) {
      this.store?.update((state) => ({ ...state, cart: value }));
    }
  }

  public get cartId(): string | undefined {
    return this.localStore?.getValue().cartId;
  }

  public set cartId(value: string | undefined) {
    if (this.cartId !== value) {
      this.localStore?.update((state) => ({ ...state, cartId: value }));
    }
  }
}
