/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { CartModel } from '../models/cart.model';
import StoreController from './store.controller';
import { select } from '@ngneat/elf';
import {
  Region,
  Cart,
  LineItem,
  StorePostCartsCartReq,
  Order,
  Swap,
} from '@medusajs/medusa';
import MedusaService from '../services/medusa.service';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import WindowController from './window.controller';

class CartController extends Controller {
  private readonly _model: CartModel;
  private _selectedRegionSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new CartModel();
    this.onSelectedRegionChangedAsync =
      this.onSelectedRegionChangedAsync.bind(this);
  }

  public get model(): CartModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._selectedRegionSubscription = StoreController.model.store
      .pipe(select((model) => model.selectedRegion))
      .subscribe({
        next: this.onSelectedRegionChangedAsync,
      });
  }

  public override dispose(renderCount: number): void {
    this._selectedRegionSubscription?.unsubscribe();
  }

  public updateDiscountCodeText(value: string): void {
    this._model.discountCode = value;
  }

  public async updateDiscountCodeAsync(): Promise<void> {
    if (!this._model.discountCode || this._model.discountCode.length <= 0) {
      return;
    }

    await this.updateCartAsync({
      discounts: [{ code: this._model.discountCode }],
    });

    this._model.discountCode = '';
  }

  public async removeDiscountCodeAsync(code: string): Promise<void> {
    if (!this._model.cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa.carts.deleteDiscount(
        this._model.cartId,
        code
      );
      this.updateLocalCartAsync(cartResponse.cart);
    } catch (error: any) {
      WindowController.addToast({
        key: `remove-discount-code-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async updateCartAsync(payload: StorePostCartsCartReq): Promise<void> {
    if (!this._model.cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa.carts.update(
        this._model.cartId,
        payload
      );
      await this.updateLocalCartAsync(cartResponse.cart);
    } catch (error: any) {
      WindowController.addToast({
        key: `update-cart-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async completeCartAsync(): Promise<Cart | Order | Swap | null> {
    if (!this._model.cartId) {
      return null;
    }

    try {
      const completeCartResponse = await MedusaService.medusa.carts.complete(
        this._model.cartId
      );

      return completeCartResponse.data;
    } catch (error: any) {
      WindowController.addToast({
        key: `complete-cart-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
      return null;
    }
  }

  public async resetCartAsync(): Promise<void> {
    if (!StoreController.model.selectedRegion) {
      return;
    }

    await this.createCartAsync(StoreController.model.selectedRegion.id);
  }

  public async removeLineItemAsync(item: LineItem): Promise<void> {
    try {
      const cartResponse = await MedusaService.medusa.carts.lineItems.delete(
        item.cart_id,
        item.id
      );
      await this.updateLocalCartAsync(cartResponse.cart);
    } catch (error: any) {
      WindowController.addToast({
        key: `remove-line-item-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async updateLineItemQuantityAsync(
    quantity: number,
    item: LineItem
  ): Promise<void> {
    try {
      const cartResponse = await MedusaService.medusa.carts.lineItems.update(
        item.cart_id,
        item.id,
        {
          quantity: quantity,
        }
      );
      await this.updateLocalCartAsync(cartResponse.cart);
    } catch (error: any) {
      WindowController.addToast({
        key: `update-line-item-quantity-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }

  public async updateLocalCartAsync(
    value: Omit<Cart, 'refundable_amount' | 'refunded_total'>
  ): Promise<void> {
    const items: LineItem[] = [];
    for (const item of value.items) {
      const itemCache = this._model.cart?.items.find(
        (value) => value.id === item.id
      );
      let product: PricedProduct | undefined = itemCache?.variant.product as
        | PricedProduct
        | undefined;
      if (!product) {
        try {
          const productResponse = await MedusaService.medusa.products.list({
            id: item.variant.product_id,
            sales_channel_id: [value.sales_channel_id ?? ''],
          });
          product = productResponse.products[0];
        } catch (error: any) {
          WindowController.addToast({
            key: `retrieve-product-${Math.random()}`,
            message: error.name,
            description: error.message,
            type: 'error',
          });
        }
      }

      const variant = product?.variants.find(
        (value) => value.id === item.variant_id
      );
      if (variant) {
        items.push({
          ...item,
          // @ts-ignore
          variant: {
            ...variant,
            // @ts-ignore
            product: product,
          },
        });
      }
    }

    this._model.cart = {
      ...value,
      items: items,
    };
  }

  private async createCartAsync(
    regionId: string
  ): Promise<Omit<Cart, 'refundable_amount' | 'refunded_total'> | null> {
    const { selectedSalesChannel } = StoreController.model;
    if (!selectedSalesChannel) {
      return null;
    }

    try {
      const cartResponse = await MedusaService.medusa.carts.create({
        region_id: regionId,
        sales_channel_id: selectedSalesChannel.id,
      });

      this._model.cartId = cartResponse.cart.id;
      await this.updateLocalCartAsync(cartResponse.cart);

      return cartResponse.cart;
    } catch (error: any) {
      WindowController.addToast({
        key: `create-cart-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
      return null;
    }
  }

  private async onSelectedRegionChangedAsync(
    value: Region | undefined
  ): Promise<void> {
    if (!this._model.cartId && value?.id) {
      await this.createCartAsync(value.id);
    }

    if (this._model.cartId && this._model.cartId?.length > 0) {
      try {
        const cartResponse = await MedusaService.medusa.carts.retrieve(
          this._model.cartId
        );
        await this.updateLocalCartAsync(cartResponse.cart);
      } catch (error: any) {
        WindowController.addToast({
          key: `retrieve-cart-${Math.random()}`,
          message: error.name,
          description: error.message,
          type: 'error',
        });
      }
    }
  }
}

export default new CartController();
