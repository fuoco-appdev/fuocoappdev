/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpTypes } from '@medusajs/types';
import { Index } from 'meilisearch';
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { ProductModel, ProductTabType } from '../models/product.model';
import { AccountResponse } from '../protobuf/account_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { ProductMetadataResponse } from '../protobuf/product_pb';
import MedusaService from '../services/medusa.service';
import MeiliSearchService from '../services/meilisearch.service';
import ProductLikesService from '../services/product-likes.service';
import { StoreOptions } from '../store-options';
import AccountPublicController from './account-public.controller';
import AccountController from './account.controller';
import CartController from './cart.controller';
import ExploreController from './explore.controller';
import StoreController from './store.controller';

export default class ProductController extends Controller {
  private readonly _model: ProductModel;
  private readonly _cartRelations: string;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _stockLocationsIndex: Index<Record<string, any>> | undefined;
  private _selectedSalesChannelDisposer: Lambda | undefined;
  private _customerGroupDisposer: Lambda | undefined;
  private _accountDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;
  private _activeTabIdDisposer: Lambda | undefined;
  private _limit: number;

  constructor(
    private readonly _container: DIContainer<{
      AccountController: AccountController;
      MeiliSearchService: MeiliSearchService;
      StoreController: StoreController;
      ProductLikesService: ProductLikesService;
      AccountPublicController: AccountPublicController;
      MedusaService: MedusaService;
      CartController: CartController;
      ExploreController: ExploreController;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new ProductModel(this._storeOptions);
    this._limit = 20;
    this._cartRelations =
      'payment_session,billing_address,shipping_address,items,region,discounts,gift_cards,customer,payment_sessions,payment,shipping_methods,sales_channel,sales_channels';

    this.updateSelectedVariant = this.updateSelectedVariant.bind(this);
  }

  public get model(): ProductModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    const meiliSearchService = this._container.get('MeiliSearchService');
    const accountController = this._container.get('AccountController');
    const storeController = this._container.get('StoreController');
    this._stockLocationsIndex =
      meiliSearchService.client?.index('stock_locations');

    this._customerGroupDisposer = observe(
      accountController.model,
      'customerGroup',
      async (
        value: IValueDidChange<HttpTypes.AdminCustomerGroup | undefined>
      ) => {
        const customerGroup = value.newValue;
        if (!customerGroup) {
          return;
        }
      }
    );
    this._activeTabIdDisposer = observe(
      this._model,
      'activeTabId',
      async (value: IValueDidChange<ProductTabType>) => {
        const activeTabId = value.newValue;
        await when(() => this._model.metadata !== undefined);
        const metadata = this._model.metadata;
        if (activeTabId === ProductTabType.Price) {
          const selectedSalesChannel:
            | Partial<HttpTypes.AdminSalesChannel>
            | undefined = storeController.model.selectedSalesChannel;
          if (
            this._model.metadata?.salesChannelIds.includes(
              selectedSalesChannel?.id ?? ''
            )
          ) {
            await this.requestProductVariants(metadata?.variantIds ?? []);
          }
        } else if (activeTabId === ProductTabType.Locations) {
          await this.loadStockLocationsAsync();
        }
      }
    );

    this._accountDisposer = observe(
      accountController.model,
      'account',
      async (value: IValueDidChange<AccountResponse | undefined>) => {
        const account = value.newValue;
        if (!account) {
          return;
        }

        await when(() => this._model.productId !== undefined);
        const productId = this._model.productId;
        if (!productId) {
          return;
        }

        await this.requestLikesMetadataAsync(productId, account?.id);
      }
    );

    this.initializeAsync(renderCount);
  }

  public override async load(_renderCount: number): Promise<void> {
    await when(() => this._model.productId !== undefined);
    const productId = this._model.productId;
    if (!productId) {
      return;
    }
    await this.requestProductAsync(productId);
  }

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenDisposer?.();
    this._customerGroupDisposer?.();
    this._selectedSalesChannelDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    this._accountDisposer?.();
  }

  public async loadStockLocationsAsync(): Promise<void> {
    await this.searchStockLocationsAsync(
      this._model.stockLocationInput,
      0,
      this._limit
    );
  }

  public async onStockLocationsNextScrollAsync(): Promise<void> {
    if (this._model.areSearchedStockLocationsLoading) {
      return;
    }

    this._model.searchedStockLocationsPagination =
      this._model.searchedStockLocationsPagination + 1;
    const offset =
      this._limit * (this._model.searchedStockLocationsPagination - 1);
    await this.searchStockLocationsAsync(
      this._model.stockLocationInput,
      offset,
      this._limit
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
    productId: string
  ): Promise<void> {
    const productLikesService = this._container.get('ProductLikesService');
    const accountController = this._container.get('AccountController');
    const storeController = this._container.get('StoreController');
    const accountPublicController = this._container.get(
      'AccountPublicController'
    );
    try {
      if (isLiked) {
        const metadata = await productLikesService.requestAddAsync({
          accountId: accountController.model.account?.id ?? '',
          productId: productId,
        });
        if (!metadata) {
          return;
        }
        storeController.updateProductLikesMetadata(productId, metadata);
        accountController.updateProductLikesMetadata(productId, metadata);
        accountController.incrementLikeCount();
        accountPublicController.updateProductLikesMetadata(productId, metadata);
        return;
      }

      const metadata = await productLikesService.requestRemoveAsync({
        accountId: accountController.model.account?.id ?? '',
        productId: productId,
      });
      if (!metadata) {
        return;
      }
      storeController.updateProductLikesMetadata(productId, metadata);
      accountController.updateProductLikesMetadata(productId, metadata);
      accountController.decrementLikeCount();
      accountPublicController.updateProductLikesMetadata(productId, metadata);
    } catch (error: any) {
      console.error(error);
    }
  }

  public async requestProductAsync(id: string): Promise<void> {
    this._model.metadata = undefined;

    if (this._model.isLoading) {
      return;
    }

    const accountController = this._container.get('AccountController');
    const storeController = this._container.get('StoreController');
    const medusaService = this._container.get('MedusaService');
    this._model.isLoading = true;
    const cachedProducts: HttpTypes.StoreProduct[] =
      storeController.model.products;
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
        variantIds: cachedProduct.variants?.map((value) => value.id ?? ''),
        salesChannelIds: [],
      });
    } else {
      try {
        const productMetadataResponse =
          await medusaService.requestProductMetadataAsync(id);
        this._model.metadata = productMetadataResponse;
      } catch (error: any) {
        console.error(error);
      }
    }

    const account = accountController.model.account;
    await this.requestLikesMetadataAsync(id, account?.id);

    this._model.isLoading = false;
  }

  public async requestLikesMetadataAsync(
    productId: string,
    accountId: string | undefined
  ): Promise<void> {
    const productLikesService = this._container.get('ProductLikesService');
    const storeController = this._container.get('StoreController');
    const cachedProductLikesMetadataList: ProductLikesMetadataResponse[] =
      storeController.model.productLikesMetadata;
    const cachedProductLikesMetadata = cachedProductLikesMetadataList.find(
      (value) => value.productId === productId
    );
    if (cachedProductLikesMetadata) {
      this._model.likesMetadata = cachedProductLikesMetadata;
    } else {
      try {
        const productLikesResponse =
          await productLikesService.requestMetadataAsync({
            accountId: accountId ?? '',
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
      this._model.activeTabId
    );
    this._model.transitionKeyIndex =
      Object.values(ProductTabType).indexOf(value);
    this._model.activeTabId = value;
  }

  public updateSelectedVariant(id: string): void {
    if (!this._model.variants) {
      return;
    }

    const variant = this._model.variants?.find((value) => value.id === id);
    this._model.selectedVariant = variant;
  }

  public async addToCartAsync(
    variantId: string,
    quantity: number = 1,
    successCallback?: () => void,
    errorCallback?: (error: Error) => void
  ): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const { selectedInventoryLocationId } = exploreController.model;
    const cartId = selectedInventoryLocationId
      ? cartController.model.cartIds?.[selectedInventoryLocationId]
      : undefined;
    if (!cartId) {
      return;
    }

    try {
      const cart = await medusaService.requestStoreAddLineItem(
        cartId,
        {
          variant_id: variantId,
          quantity: quantity,
        },
        {
          expand: this._cartRelations,
        }
      );

      if (!cart) {
        return;
      }

      cartController.updateCarts(cart.id, cart);
      cartController.updateSelectedCart(cart);

      successCallback?.();
    } catch (error: any) {
      errorCallback?.(error);
    }
  }

  public getCheapestPrice(
    variants: HttpTypes.StoreProductVariant[]
  ): Partial<HttpTypes.StoreProductVariant> | undefined {
    if (variants.length <= 0) {
      return undefined;
    }

    const cheapestVariant = variants?.reduce(
      (
        current: HttpTypes.StoreProductVariant,
        next: HttpTypes.StoreProductVariant
      ) => {
        return (current?.calculated_price ?? 0) < (next?.calculated_price ?? 0)
          ? current
          : next;
      }
    );
    return cheapestVariant;
  }

  public async searchStockLocationsAsync(
    query: string,
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
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

    let hits = result?.hits as HttpTypes.AdminStockLocation[] | undefined;
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

  private async initializeAsync(_renderCount: number): Promise<void> {}

  private async requestProductVariants(variantIds: string[]): Promise<void> {
    const currentVariantIds = this._model.variants?.map((value) => value.id);
    if (JSON.stringify(variantIds) === JSON.stringify(currentVariantIds)) {
      return;
    }

    const storeController = this._container.get('StoreController');
    const medusaService = this._container.get('MedusaService');
    const cartController = this._container.get('CartController');
    await when(() => storeController.model.selectedSalesChannel !== undefined);
    const salesChannel = storeController.model.selectedSalesChannel;

    const selectedRegion = storeController.model.selectedRegion;
    await when(() => cartController.model.cart !== undefined);
    const cart = cartController.model.cart;

    // const response = await medusaService.medusa?.products.variants.list({
    //   id: variantIds,
    //   sales_channel_id: salesChannel?.id,
    //   ...(selectedRegion && {
    //     region_id: selectedRegion.id,
    //   }),
    //   ...(cart && { cart_id: cart.id }),
    // });
    // const variants = response?.variants;
    // this._model.variants = variants;
    // const selectedVariant = this.getCheapestPrice(variants ?? []);
    // this.updateSelectedVariant(selectedVariant?.id ?? '');
  }

  private getFilter(): string {
    let filter = `sales_channel_ids IN [${this._model.metadata?.salesChannelIds.join(
      ', '
    )}]`;
    return filter;
  }
}
