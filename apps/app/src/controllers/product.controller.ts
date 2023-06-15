/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { Product, MoneyAmount } from '@medusajs/medusa';
import { ProductModel } from '../models/product.model';
import { select } from '@ngneat/elf';
import { StoreModel, StoreState } from '../models/store.model';
import StoreController from './store.controller';
import MedusaService from '../services/medusa.service';
import i18n from '../i18n';
import CartController from './cart.controller';
import { ProductVariant, LineItem, Region } from '@medusajs/medusa';

class ProductController extends Controller {
  private readonly _model: ProductModel;
  private _selectedPreviewSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new ProductModel();

    this.updateSelectedVariant = this.updateSelectedVariant.bind(this);
  }

  public get model(): ProductModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._selectedPreviewSubscription = StoreController.model.store
      .pipe(select((state: StoreState) => state.selectedPreview))
      .subscribe({
        next: (value: Product | undefined) => {
          this._model.thumbnail = value?.thumbnail ?? '';
          this._model.title = value?.title ?? '';
          this._model.subtitle = value?.subtitle ?? '';
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._selectedPreviewSubscription?.unsubscribe();
  }

  public async requestProductAsync(id: string): Promise<void> {
    const productResponse = await MedusaService.medusa.products.retrieve(id);
    const product = productResponse.product;
    this._model.thumbnail = product.thumbnail ?? '';
    this._model.title = product.title ?? '';
    this._model.subtitle = product.subtitle ?? '';
    this._model.description = product.description ?? '';
    this._model.tags = product.tags ?? [];
    this._model.options = product.options ?? [];
    this._model.variants = product.variants ?? [];
    this._model.material = product.material ?? '-';
    this._model.weight =
      product.weight && product.weight > 0 ? `${product.weight} g` : '-';
    this._model.countryOrigin = product.origin_country ?? '-';
    this._model.dimensions =
      product.length && product.width && product.height
        ? `${product.length}L x ${product.width}W x ${product.height}H`
        : '-';
    this._model.type = product.type ? product.type.value : '-';
  }

  public updateIsLiked(value: boolean): void {
    this._model.isLiked = value;
  }

  public updateSelectedVariant(id: string): void {
    const variant = this._model.variants.find((value) => value.id === id);
    this._model.selectedVariant = variant;

    // Change based on selected region
    if (variant?.prices) {
      this._model.price = variant?.prices[0];
    }
  }

  public async addToCartAsync(
    variantId: string,
    quantity: number = 1,
    successCallback?: () => void,
    errorCallback?: (error: Error) => void
  ): Promise<void> {
    if (!CartController.model.cartId) {
      return;
    }

    const cartResponse = await MedusaService.medusa.carts.lineItems.create(
      CartController.model.cartId,
      {
        variant_id: variantId,
        quantity: quantity,
      }
    );
    if (cartResponse.response.status >= 400) {
      errorCallback?.(new Error(cartResponse.response.statusText));
      return;
    }

    await CartController.updateLocalCartAsync(cartResponse.cart);

    successCallback?.();
  }

  public getCheapestPrice(prices: MoneyAmount[]): MoneyAmount | undefined {
    const cheapestPrice = prices?.reduce((current, next) => {
      return (current?.amount ?? 0) < (next?.amount ?? 0) ? current : next;
    });
    return cheapestPrice;
  }

  public getPricesByRegion(
    region: Region,
    variant: ProductVariant
  ): MoneyAmount[] {
    const prices = variant.prices?.filter(
      (value: MoneyAmount) =>
        value.currency_code === region?.currency_code ?? ''
    );
    return prices;
  }

  public getAvailablePrices(
    prices: MoneyAmount[],
    variant: ProductVariant
  ): MoneyAmount[] {
    const availablePrices = prices?.filter((price) => {
      const cartItem: LineItem | undefined =
        CartController.model.cart?.items.find(
          (item) => item.variant_id === price.variant_id
        );
      return (
        !cartItem ||
        variant.allow_backorder ||
        cartItem.quantity < variant.inventory_quantity
      );
    });
    return availablePrices;
  }
}

export default new ProductController();
