/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { CartModel } from '../models/cart.model';
import StoreController from './store.controller';
import { select } from '@ngneat/elf';
import { Region, Cart, LineItem } from '@medusajs/medusa';
import MedusaService from '../services/medusa.service';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

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

  public initialize(renderCount: number): void {
    this._selectedRegionSubscription = StoreController.model.store
      .pipe(select((model) => model.selectedRegion))
      .subscribe({
        next: this.onSelectedRegionChangedAsync,
      });
  }

  public dispose(renderCount: number): void {
    this._selectedRegionSubscription?.unsubscribe();
  }

  public async removeLineItemAsync(item: LineItem): Promise<void> {
    const cartResponse = await MedusaService.medusa.carts.lineItems.delete(
      item.cart_id,
      item.id
    );
    await this.updateCartAsync(cartResponse.cart);
  }

  public async updateLineItemQuantityAsync(
    quantity: number,
    item: LineItem
  ): Promise<void> {
    const cartResponse = await MedusaService.medusa.carts.lineItems.update(
      item.cart_id,
      item.id,
      {
        quantity: quantity,
      }
    );
    await this.updateCartAsync(cartResponse.cart);
  }

  public async updateCartAsync(
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
        const productResponse = await MedusaService.medusa.products.retrieve(
          item.variant.product_id
        );
        product = productResponse.product;
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

  private async onSelectedRegionChangedAsync(
    value: Region | undefined
  ): Promise<void> {
    if (!this._model.cartId && value?.id) {
      const cartResponse = await MedusaService.medusa.carts.create({
        region_id: value.id,
      });
      this._model.cartId = cartResponse.cart.id;
      await this.updateCartAsync(cartResponse.cart);
    }

    if (!this._model.cart) {
      const cartResponse = await MedusaService.medusa.carts.retrieve(
        this._model.cartId ?? ''
      );
      await this.updateCartAsync(cartResponse.cart);
    }
  }
}

export default new CartController();
