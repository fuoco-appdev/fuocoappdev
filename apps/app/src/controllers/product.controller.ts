/* eslint-disable @typescript-eslint/no-empty-function */
import { filter, firstValueFrom, Subscription, take } from "rxjs";
import { Controller } from "../controller";
import { MoneyAmount, Product } from "@medusajs/medusa";
import { ProductModel } from "../models/product.model";
import { select } from "@ngneat/elf";
import { StoreModel, StoreState } from "../models/store.model";
import StoreController from "./store.controller";
import ExploreController from "./explore.controller";
import MedusaService from "../services/medusa.service";
import i18n from "../i18n";
import CartController from "./cart.controller";
import {
  CustomerGroup,
  LineItem,
  Region,
  SalesChannel,
} from "@medusajs/medusa";
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing";
import AccountController from "./account.controller";
import AccountPublicController from "./account-public.controller";
import ProductLikesService from "../services/product-likes.service";
import {
  AccountResponse,
  ProductLikesMetadataResponse,
  ProductMetadataResponse,
} from "../protobuf/core_pb";
import { AccountState } from "../models/account.model";

class ProductController extends Controller {
  private readonly _model: ProductModel;
  private _selectedPricedProductSubscription: Subscription | undefined;
  private _selectedProductLikesSubscription: Subscription | undefined;
  private _selectedSalesChannelSubscription: Subscription | undefined;
  private _customerGroupSubscription: Subscription | undefined;
  private _accountSubscription: Subscription | undefined;
  private _selectedRegionSubscription: Subscription | undefined;
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
    this.initializeAsync(renderCount);
  }

  public override load(renderCount: number): void {
    this._selectedPricedProductSubscription?.unsubscribe();
    this._selectedPricedProductSubscription = StoreController.model.store
      .pipe(select((model: StoreState) => model.selectedPricedProduct))
      .subscribe({
        next: (product: PricedProduct | undefined) => {
          if (!product) {
            return;
          }

          this._model.isLoading = true;
          this.updateProduct(product);
          const selectedVariant = this.getCheapestPrice(
            this._model.product?.variants ?? [],
          );
          this.updateSelectedVariant(selectedVariant?.id ?? "");
          this._model.isLoading = false;
        },
      });

    this._selectedProductLikesSubscription?.unsubscribe();
    this._selectedProductLikesSubscription = StoreController.model.store
      .pipe(select((model: StoreState) => model.selectedProductLikesMetadata))
      .subscribe({
        next: (likesMedata: ProductLikesMetadataResponse | null) => {
          this._model.likesMetadata = likesMedata;
        },
      });

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.account))
      .subscribe({
        next: async (account: AccountResponse | undefined) => {
          const productId = await firstValueFrom(
            this._model.store.pipe(
              select((model) => model.productId),
              filter((value) => value !== undefined),
              take(1),
            ),
          );
          if (!productId) {
            return;
          }

          const selectedProductLikesMetadata = await firstValueFrom(
            StoreController.model.store.pipe(
              select((model) => model.selectedProductLikesMetadata),
              take(1),
            ),
          );
          if (selectedProductLikesMetadata) {
            return;
          }

          try {
            const productLikesResponse = await ProductLikesService
              .requestMetadataAsync({
                accountId: account?.id ?? "",
                productIds: [productId],
              });

            if (productLikesResponse.metadata.length > 0) {
              this._model.likesMetadata = productLikesResponse.metadata[0];
            }
          } catch (error: any) {
            console.error(error);
          }

          const selectedPricedProduct = await firstValueFrom(
            StoreController.model.store.pipe(
              select((model) => model.selectedPricedProduct),
              take(1),
            ),
          );

          if (selectedPricedProduct) {
            return;
          }

          this._customerGroupSubscription?.unsubscribe();
          this._customerGroupSubscription = AccountController.model.store
            .pipe(select((model) => model.customerGroup))
            .subscribe({
              next: async (customerGroup: CustomerGroup | undefined) => {
                const selectedRegion = await firstValueFrom(
                  StoreController.model.store.pipe(
                    select((model) => model.selectedRegion),
                    filter((value) => value !== undefined),
                    take(1),
                  ),
                );
                const channel = StoreController.model.selectedSalesChannel;
                if (!productId || !channel) {
                  return;
                }

                if (this._model.productId !== this._model.product?.id) {
                  this.requestProductWithChannelAsync(
                    productId,
                    channel?.id ?? "",
                    selectedRegion?.id ?? "",
                  );
                }
              },
            });
        },
      });
  }

  public override disposeInitialization(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
    this._selectedRegionSubscription?.unsubscribe();
    this._selectedSalesChannelSubscription?.unsubscribe();
  }

  public override disposeLoad(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
    this._selectedProductLikesSubscription?.unsubscribe();
    this._selectedPricedProductSubscription?.unsubscribe();
  }

  public async requestProductLike(
    isLiked: boolean,
    productId: string,
  ): Promise<void> {
    try {
      if (isLiked) {
        const metadata = await ProductLikesService.requestAddAsync({
          accountId: AccountController.model.account?.id ?? "",
          productId: productId,
        });
        if (!metadata) {
          return;
        }
        StoreController.updateProductLikesMetadata(productId, metadata);
        AccountController.updateProductLikesMetadata(productId, metadata);
        AccountController.incrementLikeCount();
        AccountPublicController.updateProductLikesMetadata(productId, metadata);
        return;
      }

      const metadata = await ProductLikesService.requestRemoveAsync({
        accountId: AccountController.model.account?.id ?? "",
        productId: productId,
      });
      if (!metadata) {
        return;
      }
      StoreController.updateProductLikesMetadata(productId, metadata);
      AccountController.updateProductLikesMetadata(productId, metadata);
      AccountController.decrementLikeCount();
      AccountPublicController.updateProductLikesMetadata(productId, metadata);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async requestProductAsync(
    id: string,
  ): Promise<PricedProduct | undefined> {
    const productResponse = await MedusaService.medusa?.products.retrieve(id);
    return productResponse?.product;
  }

  public async requestProductWithChannelAsync(
    id: string,
    salesChannelId: string,
    regionId?: string,
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
    this.updateProduct(product);
    const selectedVariant = this.getCheapestPrice(
      this._model.product?.variants ?? [],
    );
    this.updateSelectedVariant(selectedVariant?.id ?? "");
    this._model.isLoading = false;
  }

  public updateProductId(value: string | undefined): void {
    this._model.productId = value;
  }

  public updateProduct(value: PricedProduct | undefined): void {
    this._model.product = value;
    this.updateMetadata(
      new ProductMetadataResponse({
        title: value?.title,
        subtitle: value?.subtitle ?? undefined,
        description: value?.description ?? undefined,
        thumbnail: value?.thumbnail ?? undefined,
      }),
    );
  }

  public updateMetadata(value: ProductMetadataResponse | undefined): void {
    this._model.metadata = value;
  }

  public updateSelectedVariant(id: string): void {
    if (!this._model.product) {
      return;
    }

    const variant = this._model.product.variants.find(
      (value) => value.id === id,
    );
    this._model.selectedVariant = variant;
  }

  public async addToCartAsync(
    variantId: string,
    quantity: number = 1,
    successCallback?: () => void,
    errorCallback?: (error: Error) => void,
  ): Promise<void> {
    const { selectedInventoryLocationId } = ExploreController.model;
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
        },
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
    variants: PricedVariant[],
  ): Partial<PricedVariant> | undefined {
    if (variants.length <= 0) {
      return undefined;
    }

    const cheapestVariant = variants?.reduce(
      (current: PricedVariant, next: PricedVariant) => {
        return (current?.calculated_price ?? 0) < (next?.calculated_price ?? 0)
          ? current
          : next;
      },
    );
    return cheapestVariant;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._selectedRegionSubscription?.unsubscribe();
    this._selectedRegionSubscription = StoreController.model.store
      .pipe(select((model) => model.selectedRegion))
      .subscribe({
        next: async (region: Region | undefined) => {
          const selectedPricedProduct = await firstValueFrom(
            StoreController.model.store.pipe(
              select((model) => model.selectedPricedProduct),
              take(1),
            ),
          );
          if (selectedPricedProduct) {
            return;
          }

          if (this._model.productId !== this._model.product?.id) {
            const selectedSalesChannel = await firstValueFrom(
              StoreController.model.store.pipe(
                select((model) => model.selectedSalesChannel),
                filter((value) => value !== undefined),
                take(1),
              ),
            );
            this._model.product = undefined;
            this.requestProductWithChannelAsync(
              this._model.productId ?? "",
              selectedSalesChannel?.id ?? "",
              region?.id ?? "",
            );
          }
        },
      });
  }

  private resetMedusaModel(): void {
    this._model.product = undefined;
    this._model.selectedVariant = undefined;
  }
}

export default new ProductController();
