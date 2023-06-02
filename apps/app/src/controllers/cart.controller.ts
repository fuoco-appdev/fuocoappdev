/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { CartModel } from '../models/cart.model';
import StoreController from './store.controller';
import { select } from '@ngneat/elf';
import { Region } from '@medusajs/medusa';
import MedusaService from '../services/medusa.service';

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

  public initialize(): void {
    this._selectedRegionSubscription = StoreController.model.store
      .pipe(select((model) => model.selectedRegion))
      .subscribe({
        next: this.onSelectedRegionChangedAsync,
      });
  }

  public dispose(): void {
    this._selectedRegionSubscription?.unsubscribe();
  }

  private async onSelectedRegionChangedAsync(
    value: Region | undefined
  ): Promise<void> {
    if (!this._model.cartId && value?.id) {
      const cartResponse = await MedusaService.medusa.carts.create({
        region_id: value.id,
      });
      this._model.cart = cartResponse.cart;
      this._model.cartId = cartResponse.cart.id;
    }

    if (!this._model.cart) {
      const cartResponse = await MedusaService.medusa.carts.retrieve(
        this._model.cartId ?? ''
      );
      console.log(cartResponse.cart);
      this._model.cart = cartResponse.cart;
    }
  }
}

export default new CartController();
