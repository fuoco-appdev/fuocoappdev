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
  LineItem,
  Region,
  SalesChannel,
  CustomerGroup,
} from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import AccountController from './account.controller';

class ProductController extends Controller {
  private readonly _model: ProductModel;
  private _selectedPreviewSubscription: Subscription | undefined;
  private _selectedSalesChannelSubscription: Subscription | undefined;
  private _customerGroupSubscription: Subscription | undefined;
  private _selectedRegionSubscription: Subscription | undefined;
  private _productIdSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new ProductModel();

    this.updateSelectedVariant = this.updateSelectedVariant.bind(this);
  }

  public get model(): ProductModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._medusaAccessTokenSubscription =
      MedusaService.accessTokenObservable.subscribe({
        next: (value: string | undefined) => {
          if (!value) {
            this.resetMedusaModel();
            this.initializeAsync(renderCount);
          }
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
    this._productIdSubscription?.unsubscribe();
    this._selectedPreviewSubscription?.unsubscribe();
    this._selectedRegionSubscription?.unsubscribe();
    this._selectedSalesChannelSubscription?.unsubscribe();
  }

  public async requestProductAsync(
    id: string
  ): Promise<PricedProduct | undefined> {
    const productResponse = await MedusaService.medusa?.products.retrieve(id);
    return productResponse?.product;
  }

  public async requestProductWithChannelAsync(
    id: string,
    salesChannelId: string,
    regionId?: string
  ): Promise<void> {
    this._model.isLoading = true;
    const { cart } = CartController.model;
    const productResponse = await MedusaService.medusa?.products.list({
      id: id,
      sales_channel_id: [salesChannelId],
      ...(regionId && {
        region_id: regionId,
      }),
      ...(cart && { cart_id: cart.id }),
    });
    const product = productResponse?.products[0];
    this.updateDetails(product);
    const selectedVariant = this.getCheapestPrice(this._model.variants);
    this.updateSelectedVariant(selectedVariant?.id ?? '');
    this._model.isLoading = false;
  }

  public updateDetails(product: PricedProduct | undefined): void {
    this._model.thumbnail = product?.thumbnail ?? '';
    this._model.title = product?.title ?? '';
    this._model.subtitle = product?.subtitle ?? '';
    this._model.description = product?.description ?? '';
    this._model.tags = product?.tags ?? [];
    this._model.options = product?.options ?? [];
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
    this._model.variants = product?.variants ?? [];
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

  public getCheapestPrice(
    variants: PricedVariant[]
  ): Partial<PricedVariant> | undefined {
    const cheapestVariant = variants?.reduce(
      (current: PricedVariant, next: PricedVariant) => {
        return (current?.calculated_price ?? 0) < (next?.calculated_price ?? 0)
          ? current
          : next;
      }
    );
    return cheapestVariant;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._selectedPreviewSubscription?.unsubscribe();
    this._selectedPreviewSubscription = StoreController.model.store
      .pipe(select((model: StoreState) => model.selectedPreview))
      .subscribe({
        next: (product: PricedProduct | undefined) => {
          if (!product) {
            return;
          }

          this._model.isLoading = true;
          this.updateDetails(product);
          const selectedVariant = this.getCheapestPrice(this._model.variants);
          this.updateSelectedVariant(selectedVariant?.id ?? '');
          this._model.isLoading = false;
        },
      });

    this._selectedRegionSubscription?.unsubscribe();
    this._selectedRegionSubscription = StoreController.model.store
      .pipe(select((model) => model.selectedRegion))
      .subscribe({
        next: (region: Region | undefined) => {
          if (StoreController.model.selectedPreview) {
            return;
          }

          const channel = StoreController.model.selectedSalesChannel;
          this.resetDetails();
          this.requestProductWithChannelAsync(
            this._model.productId ?? '',
            channel?.id ?? '',
            region?.id ?? ''
          );
        },
      });

    this._productIdSubscription?.unsubscribe();
    this._productIdSubscription = this._model.store
      .pipe(select((model) => model.productId))
      .subscribe({
        next: (id: string | undefined) => {
          if (StoreController.model.selectedPreview) {
            return;
          }

          this._customerGroupSubscription?.unsubscribe();
          this._customerGroupSubscription = AccountController.model.store
            .pipe(select((model) => model.customerGroup))
            .subscribe({
              next: (customerGroup: CustomerGroup | undefined) => {
                this._selectedRegionSubscription?.unsubscribe();
                this._selectedRegionSubscription = StoreController.model.store
                  .pipe(select((model) => model.selectedRegion))
                  .subscribe({
                    next: (region: Region | undefined) => {
                      const channel =
                        StoreController.model.selectedSalesChannel;
                      if (!id || !channel) {
                        return;
                      }

                      this.resetDetails();
                      this.requestProductWithChannelAsync(
                        id,
                        channel?.id ?? '',
                        region?.id ?? ''
                      );
                    },
                  });
              },
            });
        },
      });
  }

  private resetMedusaModel(): void {
    this._model.thumbnail = '';
    this._model.title = '';
    this._model.subtitle = '';
    this._model.isLiked = false;
    this._model.likeCount = 0;
    this._model.description = new Array(355).join(' ');
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
}

export default new ProductController();
