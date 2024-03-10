/* eslint-disable @typescript-eslint/no-empty-function */
import { filter, firstValueFrom, Subscription, take } from "rxjs";
import { Controller } from "../controller";
import { MoneyAmount, Product, ProductVariant } from "@medusajs/medusa";
import { ProductModel, ProductTabType } from "../models/product.model";
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
import { StockLocation } from "@medusajs/stock-location/dist/models";
import { Index } from "meilisearch";
import MeiliSearchService from "../services/meilisearch.service";

class ProductController extends Controller {
  private readonly _model: ProductModel;
  private readonly _cartRelations: string;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _stockLocationsIndex: Index<Record<string, any>> | undefined;
  private _selectedSalesChannelSubscription: Subscription | undefined;
  private _customerGroupSubscription: Subscription | undefined;
  private _accountSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _activeTabIdSubscription: Subscription | undefined;
  private _limit: number;

  constructor() {
    super();

    this._model = new ProductModel();
    this._limit = 20;
    this._cartRelations =
      "payment_session,billing_address,shipping_address,items,region,discounts,gift_cards,customer,payment_sessions,payment,shipping_methods,sales_channel,sales_channels";

    this.updateSelectedVariant = this.updateSelectedVariant.bind(this);
  }

  public get model(): ProductModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._stockLocationsIndex = MeiliSearchService.client?.index(
      "stock_locations",
    );

    this.initializeAsync(renderCount);
  }

  public override async load(renderCount: number): Promise<void> {
    const productId = await firstValueFrom(
      this._model.store.pipe(
        select((model) => model.productId),
        filter((value) => value !== undefined),
        take(1),
      ),
    );
    await this.requestProductAsync(
      productId,
    );

    this._activeTabIdSubscription?.unsubscribe();
    this._activeTabIdSubscription = this._model.store.pipe(
      select((model) => model.activeTabId),
    ).subscribe({
      next: async (value: ProductTabType) => {
        const metadata = await firstValueFrom(
          this._model.store.pipe(
            select((model) => model.metadata),
            filter((value) => value !== undefined),
            take(1),
          ),
        );
        if (value === ProductTabType.Price) {
          const selectedSalesChannel: Partial<SalesChannel> | undefined =
            await firstValueFrom(
              StoreController.model.store.pipe(
                select((model) => model.selectedSalesChannel),
                take(1),
              ),
            );
          if (
            this._model.metadata?.salesChannelIds.includes(
              selectedSalesChannel?.id ?? "",
            )
          ) {
            await this.requestProductVariants(metadata?.variantIds ?? []);
          }
        } else if (value === ProductTabType.Locations) {
          await this.loadStockLocationsAsync();
        }
      },
    });

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.account))
      .subscribe({
        next: async (account: AccountResponse | undefined) => {
          if (!account) {
            return;
          }

          await this.requestLikesMetadataAsync(productId, account?.id);
        },
      });
  }

  public override disposeInitialization(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
    this._selectedSalesChannelSubscription?.unsubscribe();
  }

  public override disposeLoad(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
  }

  public async loadStockLocationsAsync(): Promise<void> {
    await this.searchStockLocationsAsync(
      this._model.stockLocationInput,
      0,
      this._limit,
    );
  }

  public async onStockLocationsNextScrollAsync(): Promise<void> {
    if (this._model.areSearchedStockLocationsLoading) {
      return;
    }

    this._model.searchedStockLocationsPagination =
      this._model.searchedStockLocationsPagination + 1;
    const offset = this._limit *
      (this._model.searchedStockLocationsPagination - 1);
    await this.searchStockLocationsAsync(
      this._model.stockLocationInput,
      offset,
      this._limit,
    );
  }

  public updateStockLocationInput(value: string): void {
    this._model.stockLocationInput = value;
    this._model.searchedStockLocationsPagination = 1;
    this._model.searchedStockLocations = [];
    this._model.hasMoreSearchedStockLocations = true;
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(() => {
      this.searchStockLocationsAsync(value, 0, this._limit);
    }, 750);
  }

  public updateSearchedStockLocationScrollPosition(value: number | undefined) {
    this._model.searchedStockLocationScrollPosition = value;
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
  ): Promise<void> {
    this._model.metadata = undefined;

    if (this._model.isLoading) {
      return;
    }

    this._model.isLoading = true;
    const cachedProducts: (Product & { sales_channel_ids: string[] })[] =
      await firstValueFrom(
        StoreController.model.store.pipe(
          select((model) => model.products),
          take(1),
        ),
      );
    const cachedProduct = cachedProducts.find((value) => value.id === id);
    if (cachedProduct) {
      this._model.metadata = new ProductMetadataResponse({
        title: cachedProduct.title,
        subtitle: cachedProduct.subtitle ?? undefined,
        description: cachedProduct.description ?? undefined,
        thumbnail: cachedProduct.thumbnail ?? undefined,
        type: JSON.stringify(cachedProduct.type),
        material: cachedProduct.material ?? undefined,
        length: cachedProduct.length ?? undefined,
        weight: cachedProduct.weight ?? undefined,
        width: cachedProduct.width ?? undefined,
        height: cachedProduct.height ?? undefined,
        originCountry: cachedProduct.origin_country ?? undefined,
        metadata: JSON.stringify(cachedProduct.metadata),
        tags: cachedProduct.tags?.map((value) => JSON.stringify(value)),
        options: cachedProduct.options?.map((value) => JSON.stringify(value)),
        variantIds: cachedProduct.variants.map((value) => value.id ?? ""),
        salesChannelIds: cachedProduct.sales_channel_ids,
      });
    } else {
      try {
        const productMetadataResponse = await MedusaService
          .requestProductMetadataAsync(id);
        this._model.metadata = productMetadataResponse;
      } catch (error: any) {
        console.error(error);
      }
    }

    const account = await firstValueFrom(
      AccountController.model.store.pipe(
        select((model) => model.account),
        take(1),
      ),
    );
    await this.requestLikesMetadataAsync(id, account?.id);

    this._model.isLoading = false;
  }

  public async requestLikesMetadataAsync(
    productId: string,
    accountId: string | undefined,
  ): Promise<void> {
    const cachedProductLikesMetadataList: ProductLikesMetadataResponse[] =
      await firstValueFrom(
        StoreController.model.store.pipe(
          select((model) => model.productLikesMetadata),
          take(1),
        ),
      );
    const cachedProductLikesMetadata = cachedProductLikesMetadataList.find((
      value,
    ) => value.productId === productId);
    if (cachedProductLikesMetadata) {
      this._model.likesMetadata = cachedProductLikesMetadata;
    } else {
      try {
        const productLikesResponse = await ProductLikesService
          .requestMetadataAsync({
            accountId: accountId ?? "",
            productIds: [productId],
          });

        if (productLikesResponse.metadata.length > 0) {
          this._model.likesMetadata = productLikesResponse.metadata[0];
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  }

  public updateProductId(value: string | undefined): void {
    this._model.productId = value;
  }

  public updateMetadata(value: ProductMetadataResponse | undefined): void {
    this._model.metadata = value;
  }

  public updateActiveTabId(value: ProductTabType): void {
    this._model.prevTransitionKeyIndex = Object.values(ProductTabType).indexOf(
      this._model.activeTabId,
    );
    this._model.transitionKeyIndex = Object.values(ProductTabType).indexOf(
      value,
    );
    this._model.activeTabId = value;
  }

  public updateSelectedVariant(id: string): void {
    if (!this._model.variants) {
      return;
    }

    const variant = this._model.variants?.find(
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
        {
          expand: this._cartRelations,
        },
      );

      if (!cartResponse?.cart) {
        return;
      }

      CartController.updateCarts(cartResponse.cart.id, cartResponse.cart);
      CartController.updateSelectedCart(
        cartResponse.cart,
      );

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

  public async searchStockLocationsAsync(
    query: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false,
  ): Promise<void> {
    if (!force && this._model.areSearchedStockLocationsLoading) {
      return;
    }

    this._model.areSearchedStockLocationsLoading = true;

    let filter = this.getFilter();
    const result = await this._stockLocationsIndex?.search(query, {
      filter: [filter],
      offset: offset,
      limit: limit,
    });

    let hits = result?.hits as StockLocation[] | undefined;
    if (!hits) {
      this._model.areSearchedStockLocationsLoading = false;
      return;
    }

    if (hits.length <= 0 && offset <= 0) {
      this._model.searchedStockLocations = [];
    }

    if (hits.length < limit && this._model.hasMoreSearchedStockLocations) {
      this._model.hasMoreSearchedStockLocations = false;
    }

    if (hits.length <= 0) {
      this._model.areSearchedStockLocationsLoading = false;
      return;
    }

    if (hits.length >= limit && !this._model.hasMoreSearchedStockLocations) {
      this._model.hasMoreSearchedStockLocations = true;
    }

    if (offset > 0) {
      const stockLocations = this._model.searchedStockLocations;
      this._model.searchedStockLocations = stockLocations.concat(hits);
    } else {
      this._model.searchedStockLocations = hits;
    }

    this._model.areSearchedStockLocationsLoading = false;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._customerGroupSubscription?.unsubscribe();
    this._customerGroupSubscription = AccountController.model.store
      .pipe(select((model) => model.customerGroup))
      .subscribe({
        next: async (customerGroup: CustomerGroup | undefined) => {
          if (!customerGroup) {
            return;
          }
        },
      });
  }

  private async requestProductVariants(variantIds: string[]): Promise<void> {
    const currentVariantIds = this._model.variants?.map((value) => value.id);
    if (JSON.stringify(variantIds) === JSON.stringify(currentVariantIds)) {
      return;
    }

    const salesChannel = await firstValueFrom(
      StoreController.model.store.pipe(
        select((model) => model.selectedSalesChannel),
        filter((value) => value !== undefined),
        take(1),
      ),
    );

    const selectedRegion = await firstValueFrom(
      StoreController.model.store.pipe(
        select((model) => model.selectedRegion),
        take(1),
      ),
    );

    const cart = await firstValueFrom(
      CartController.model.store.pipe(
        select((model) => model.cart),
        filter((value) => value !== undefined),
        take(1),
      ),
    );

    const response = await MedusaService.medusa?.products.variants.list({
      id: variantIds,
      sales_channel_id: salesChannel.id,
      ...(selectedRegion && {
        region_id: selectedRegion.id,
      }),
      ...(cart && { cart_id: cart.id }),
    });
    const variants = response?.variants;
    this._model.variants = variants;
    const selectedVariant = this.getCheapestPrice(
      variants ?? [],
    );
    this.updateSelectedVariant(selectedVariant?.id ?? "");
  }

  private getFilter(): string {
    let filter = `sales_channel_ids IN [${
      this._model.metadata?.salesChannelIds.join(", ")
    }]`;
    return filter;
  }
}

export default new ProductController();
