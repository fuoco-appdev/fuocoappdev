/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { Product, MoneyAmount } from '@medusajs/medusa';
import { ProductModel } from '../models/product.model';
import { select } from '@ngneat/elf';
import { StoreModel, StoreState } from '../models/store.model';
import StoreController from './store.controller';
import HomeController from './home.controller';
import MedusaService from '../services/medusa.service';
import i18n from '../i18n';
import CartController from './cart.controller';
import {
  ProductVariant,
  LineItem,
  Region,
  SalesChannel,
} from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

class ProductController extends Controller {
  private readonly _model: ProductModel;
  private _selectedPreviewSubscription: Subscription | undefined;
  private _selectedSalesChannelSubscription: Subscription | undefined;
  private _productIdSubscription: Subscription | undefined;

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
      .pipe(select((model: StoreState) => model.selectedPreview))
      .subscribe({
        next: (value: PricedProduct | undefined) => {
          this._model.thumbnail = value?.thumbnail ?? '';
          this._model.title = value?.title ?? '';
          this._model.subtitle = value?.subtitle ?? '';
        },
      });

    this._selectedSalesChannelSubscription = StoreController.model.store
      .pipe(select((model: StoreState) => model.selectedSalesChannel))
      .subscribe({
        next: (value: Partial<SalesChannel> | undefined) => {
          if (!this._model.productId || !value || !value?.id) {
            return;
          }

          this.requestProductAsync(this._model.productId, value.id);
        },
      });

    this._productIdSubscription = this._model.store
      .pipe(select((model) => model.productId))
      .subscribe({
        next: (value: string | undefined) => {
          const channel = StoreController.model.selectedSalesChannel;
          if (!value || !channel) {
            return;
          }

          this.requestProductAsync(value, channel?.id ?? '');
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._productIdSubscription?.unsubscribe();
    this._selectedPreviewSubscription?.unsubscribe();
    this._selectedSalesChannelSubscription?.unsubscribe();
  }

  public async requestProductAsync(
    id: string,
    salesChannelId: string
  ): Promise<void> {
    this._model.isLoading = true;
    const productResponse = await MedusaService.medusa?.products.list({
      id: id,
      sales_channel_id: [salesChannelId],
    });
    const product = productResponse?.products[0];
    this._model.thumbnail = product?.thumbnail ?? '';
    this._model.title = product?.title ?? '';
    this._model.subtitle = product?.subtitle ?? '';
    this._model.description = product?.description ?? '';
    this._model.tags = product?.tags ?? [];
    this._model.options = product?.options ?? [];
    this._model.variants = product?.variants ?? [];
    this._model.metadata = product?.metadata ?? {};
    this._model.material = product?.material ?? '-';
    this._model.weight =
      product?.weight && product.weight > 0 ? `${product.weight} g` : '-';
    this._model.countryOrigin = product?.origin_country ?? '-';
    this._model.dimensions =
      product?.length && product.width && product.height
        ? `${product.length}L x ${product.width}W x ${product.height}H`
        : '-';
    this._model.type = product?.type ? product.type.value : '-';
    this._model.isLoading = false;
  }

  public resetDetails(): void {
    this._model.thumbnail = '';
    this._model.title = '';
    this._model.subtitle = '';
    this._model.description = '';
    this._model.tags = [];
    this._model.options = [];
    this._model.variants = [];
    this._model.metadata = {};
    this._model.material = '-';
    this._model.weight = '-';
    this._model.countryOrigin = '-';
    this._model.dimensions = '-';
    this._model.type = '-';
  }

  public updateProductId(value: string | undefined): void {
    this._model.productId = value;
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
    const { selectedInventoryLocationId } = HomeController.model;
    const cartId = selectedInventoryLocationId
      ? CartController.model.cartIds[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cartResponse = await MedusaService.medusa?.carts.lineItems.create(
        cartId,
        {
          variant_id: variantId,
          quantity: quantity,
        }
      );
      if (cartResponse?.cart) {
        await CartController.updateLocalCartAsync(cartResponse.cart);
      }

      successCallback?.();
    } catch (error: any) {
      errorCallback?.(error);
    }
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
