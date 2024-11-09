/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpTypes } from '@medusajs/types';
import { Index } from 'meilisearch';
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import CartController from '../controllers/cart.controller';
import {
  InventoryLocation,
  InventoryLocationType,
} from '../models/explore.model';
import { ProductTabs, StoreModel } from '../models/store.model';
import { AccountResponse } from '../protobuf/account_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import MedusaService from '../services/medusa.service';
import MeiliSearchService from '../services/meilisearch.service';
import ProductLikesService from '../services/product-likes.service';
import { StoreOptions } from '../store-options';
import { MedusaProductTypeNames } from '../types/medusa.type';
import AccountController from './account.controller';
import ExploreController from './explore.controller';

export default class StoreController extends Controller {
  private readonly _model: StoreModel;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _productsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationDisposer: Lambda | undefined;
  private _accountDisposer: Lambda | undefined;
  private _customerGroupDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;
  private _limit: number;

  constructor(
    private readonly _container: DIContainer<{
      AccountController: AccountController;
      MeiliSearchService: MeiliSearchService;
      StoreController: StoreController;
      ProductLikesService: ProductLikesService;
      MedusaService: MedusaService;
      CartController: CartController;
      ExploreController: ExploreController;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new StoreModel(this._storeOptions);

    this.onSelectedInventoryLocationChangedAsync =
      this.onSelectedInventoryLocationChangedAsync.bind(this);
    this._limit = 20;
  }

  public get model(): StoreModel {
    return this._model;
  }

  public override initialize = (renderCount: number): void => {
    const meiliSearchService = this._container.get('MeiliSearchService');
    const accountController = this._container.get('AccountController');
    this._productsIndex = meiliSearchService.client?.index('products_custom');

    this.initializeAsync(renderCount);

    this._accountDisposer = observe(
      accountController.model,
      'account',
      (value: IValueDidChange<AccountResponse | undefined>) => {
        if (!value.newValue) {
          return;
        }

        this.loadProductsAsync();
      }
    );
    this._customerGroupDisposer = observe(
      accountController.model,
      'customerGroup',
      (value: IValueDidChange<HttpTypes.AdminCustomerGroup | undefined>) => {
        const customerGroup = value.newValue;
        if (!customerGroup) {
          return;
        }

        this.loadProductsAsync();
      }
    );
  };

  public override load(_renderCount: number): void {
    this.loadProductsAsync();
  }

  public override disposeInitialization(_renderCount: number): void {
    this._medusaAccessTokenDisposer?.();
    this._selectedInventoryLocationDisposer?.();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {
    clearTimeout(this._timerId as number | undefined);
    this._customerGroupDisposer?.();
    this._accountDisposer?.();
  }

  public async loadProductsAsync(): Promise<void> {
    await this.searchAsync(this._model.input, 'loading', 0, this._limit);
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this._model.pagination = 1;
    this._model.products = [];
    this._model.pricedProducts = {};
    this._model.hasMorePreviews = true;
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(() => {
      this.searchAsync(value, 'loading', 0, this._limit);
    }, 750);
  }

  public updateSelectedPricedProduct(
    value: HttpTypes.StoreProduct | undefined
  ): void {
    this._model.selectedPricedProduct = value;
  }

  public updateSelectedProductLikesMetadata(
    value: ProductLikesMetadataResponse | null
  ): void {
    this._model.selectedProductLikesMetadata = value;
  }

  public updateScrollPosition(value: number | undefined) {
    this._model.scrollPosition = value;
  }

  public async updateSelectedTabAsync(
    value: ProductTabs | undefined
  ): Promise<void> {
    this._model.selectedTab = value;
    this._model.pagination = 1;
    this._model.products = [];
    this._model.pricedProducts = {};
    const offset = this._limit * (this._model.pagination - 1);

    await this.searchAsync(
      this._model.input,
      'loading',
      offset,
      this._limit,
      true
    );
  }

  public async onNextScrollAsync(): Promise<void> {
    await this.searchNextPageAsync();
  }

  public async searchNextPageAsync(): Promise<void> {
    if (this._model.isLoading) {
      return;
    }

    this._model.pagination = this._model.pagination + 1;

    const offset = this._limit * (this._model.pagination - 1);
    await this.searchAsync(this._model.input, 'loading', offset, this._limit);
  }

  public async reloadProductsAsync(): Promise<void> {
    this._model.selectedTab = undefined;
    this._model.pagination = 1;
    this._model.pricedProducts = {};
    await this.searchAsync(this._model.input, 'reloading', 0, this._limit);
  }

  public async requestProductsAsync(
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && (this._model.isLoading || !this._model.selectedRegion)) {
      return;
    }

    if (!this._model.selectedSalesChannel) {
      return;
    }
    this._model.isLoading = true;

    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const medusaService = this._container.get('MedusaService');
    const productLikesService = this._container.get('ProductLikesService');
    const accountController = this._container.get('AccountController');
    await when(() => this._model.selectedRegion !== undefined);
    const selectedRegion = this._model.selectedRegion;
    await when(() => cartController.model.cart !== undefined);
    const cart = cartController.model.cart;
    await when(
      () => exploreController.model.selectedInventoryLocation !== undefined
    );
    const selectedInventoryLocation: InventoryLocation | undefined =
      exploreController.model.selectedInventoryLocation;
    if (!selectedInventoryLocation?.type) {
      return;
    }

    const productTypeIds = this.getTypeIds(selectedInventoryLocation.type);
    const products = await medusaService.requestStoreProductsAsync({
      sales_channel_id: [this._model.selectedSalesChannel?.id ?? ''],
      offset: offset,
      limit: limit,
      ...(productTypeIds.length > 0 && { type_id: productTypeIds }),
      ...(selectedRegion && {
        region_id: selectedRegion.id,
        currency_code: selectedRegion.currency_code,
      }),
      ...(cart && { cart_id: cart.id }),
      fields: `*variants.calculated_price,+variants.inventory_quantity`,
    });

    if (products.length <= 0 && offset <= 0) {
      this._model.products = [];
    }

    if (products.length < limit && this._model.hasMorePreviews) {
      this._model.hasMorePreviews = false;
    }

    if (products.length <= 0) {
      this._model.isLoading = false;
      this._model.hasMorePreviews = false;
      return;
    }

    if (products.length >= limit && !this._model.hasMorePreviews) {
      this._model.hasMorePreviews = true;
    }

    if (offset > 0) {
      const productsCopy = this._model.products;
      this._model.products = productsCopy.concat(products);
    } else {
      this._model.products = products;
    }

    const pricedProducts = {
      ...this._model.pricedProducts,
    };
    for (const pricedProduct of products ?? []) {
      if (!pricedProduct.id) {
        continue;
      }
      pricedProducts[pricedProduct.id] = pricedProduct;
    }

    this._model.pricedProducts = pricedProducts;
    this._model.isLoading = false;

    const productIds: string[] = products.map(
      (value: HttpTypes.StoreProduct) => value.id
    );
    try {
      const productLikesResponse =
        await productLikesService.requestMetadataAsync({
          accountId: accountController.model.account?.id ?? '',
          productIds: productIds,
        });

      if (offset > 0) {
        const productLikesMetadata = this._model.productLikesMetadata;
        this._model.productLikesMetadata = productLikesMetadata.concat(
          productLikesResponse.metadata
        );
      } else {
        this._model.productLikesMetadata = productLikesResponse.metadata;
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  public async searchAsync(
    query: string,
    loadingType: 'loading' | 'reloading',
    offset: number = 0,
    limit: number = 10,
    force: boolean = false
  ): Promise<void> {
    if (!force && (this._model.isLoading || this._model.isReloading)) {
      return;
    }

    const exploreController = this._container.get('ExploreController');
    const cartController = this._container.get('CartController');
    const medusaService = this._container.get('MedusaService');
    const productLikesService = this._container.get('ProductLikesService');
    const accountController = this._container.get('AccountController');
    const selectedInventoryLocation: InventoryLocation | undefined =
      exploreController.model.selectedInventoryLocation;

    if (loadingType === 'loading') {
      this._model.isLoading = true;
    } else if (loadingType === 'reloading') {
      this._model.isReloading = true;
    }

    const filterValue = this.getFilter(selectedInventoryLocation);
    const sortValue = this.getSorting(selectedInventoryLocation);
    const result = await this._productsIndex?.search(query, {
      filter: [filterValue],
      ...(sortValue && { sort: [sortValue] }),
      offset: offset,
      limit: limit,
    });

    const hits = result?.hits as (HttpTypes.StoreProduct & {
      sales_channel_ids: string[];
    })[];
    if (hits && hits.length <= 0 && offset <= 0) {
      this._model.products = [];
    }

    if (hits && hits.length < limit && this._model.hasMorePreviews) {
      this._model.hasMorePreviews = false;
    }

    if (hits && hits.length <= 0) {
      this._model.isLoading = false;
      this._model.isReloading = false;
      this._model.hasMorePreviews = false;
      return;
    }

    if (hits && hits.length >= limit && !this._model.hasMorePreviews) {
      this._model.hasMorePreviews = true;
    }

    if (offset > 0) {
      const products = this._model.products;
      this._model.products = products.concat(hits);
    } else {
      this._model.products = hits;
    }

    if (loadingType === 'loading') {
      this._model.isLoading = false;
    } else if (loadingType === 'reloading') {
      this._model.isReloading = false;
    }

    const productIds: string[] = hits.map(
      (value: HttpTypes.StoreProduct) => value.id
    );

    try {
      const productLikesResponse =
        await productLikesService.requestMetadataAsync({
          accountId: accountController.model.account?.id ?? '',
          productIds: productIds,
        });

      if (offset > 0) {
        const productLikesMetadata = this._model.productLikesMetadata;
        this._model.productLikesMetadata = productLikesMetadata.concat(
          productLikesResponse.metadata
        );
      } else {
        this._model.productLikesMetadata = productLikesResponse.metadata;
      }
    } catch (error: any) {
      console.error(error);
    }

    const selectedRegion = this._model.selectedRegion;
    const cart = cartController.model.cart;
    const salesChannel =
      selectedInventoryLocation?.salesChannels &&
      selectedInventoryLocation?.salesChannels.length > 0
        ? selectedInventoryLocation?.salesChannels[0]
        : undefined;

    const products = await medusaService.requestStoreProductsAsync({
      id: productIds,
      ...(salesChannel && { sales_channel_id: [salesChannel?.id ?? ''] }),
      ...(selectedRegion && {
        region_id: selectedRegion.id,
        currency_code: selectedRegion.currency_code,
      }),
      ...(cart && { cart_id: cart.id }),
      fields: `*variants.calculated_price,+variants.inventory_quantity`,
    });

    const pricedProducts = {
      ...this._model.pricedProducts,
    };
    for (const pricedProduct of products ?? []) {
      if (!pricedProduct.id) {
        continue;
      }
      pricedProducts[pricedProduct.id] = pricedProduct;
    }

    this._model.pricedProducts = pricedProducts;
  }

  public async applyFilterAsync(
    regionId: string,
    cellarId: string
  ): Promise<void> {
    const region = this._model.regions.find((value) => value.id === regionId);
    this.updateRegion(region);

    const exploreController = this._container.get('ExploreController');
    const inventoryLocation = exploreController.model.inventoryLocations.find(
      (value) => value.id === cellarId
    );
    if (inventoryLocation) {
      exploreController.updateSelectedInventoryLocation(inventoryLocation);
    }
  }

  public updateProductLikesMetadata(
    id: string,
    metadata: ProductLikesMetadataResponse
  ): void {
    const metadataIndex = this._model.productLikesMetadata.findIndex(
      (value) => value.productId === id
    );
    const productLikesMetadata = [...this._model.productLikesMetadata];
    productLikesMetadata[metadataIndex] = metadata;
    this._model.productLikesMetadata = productLikesMetadata;
  }

  private async initializeAsync(_renderCount: number): Promise<void> {
    await this.requestProductTypesAsync();
    await this.requestRegionsAsync();

    const exploreController = this._container.get('ExploreController');
    this._selectedInventoryLocationDisposer?.();
    this._selectedInventoryLocationDisposer = observe(
      exploreController.model,
      'selectedInventoryLocation',
      this.onSelectedInventoryLocationChangedAsync
    );
  }

  private async requestProductTypesAsync(): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const productTypes = await medusaService.requestAdminProductTypesAsync();
    this._model.productTypes = productTypes ?? [];
  }

  private async requestRegionsAsync(): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const regions = await medusaService.requestAdminRegionsAsync();
    this._model.regions = regions ?? [];
  }

  private async onSelectedInventoryLocationChangedAsync(
    value: IValueDidChange<InventoryLocation | undefined>
  ): Promise<void> {
    const inventoryLocation = value.newValue;
    if (
      !inventoryLocation ||
      inventoryLocation.salesChannels?.length <= 0 ||
      !inventoryLocation?.region
    ) {
      this._model.selectedSalesChannel = undefined;
      return;
    }

    this._model.selectedTab = undefined;
    this._model.pagination = 1;
    this._model.products = [];
    this._model.pricedProducts = {};
    this._model.selectedSalesChannel = inventoryLocation.salesChannels[0];

    const region = this._model.regions.find(
      (value) => value.name === inventoryLocation.region
    );

    this.updateRegion(region);
  }

  private updateRegion(region: HttpTypes.StoreRegion | undefined): void {
    this._model.selectedRegion = region;
  }

  private getTypeIds(inventoryType: InventoryLocationType): string[] {
    let names: MedusaProductTypeNames[] = [];

    if (inventoryType === InventoryLocationType.Cellar) {
      names = [MedusaProductTypeNames.Wine];
    } else if (inventoryType === InventoryLocationType.Restaurant) {
      names = [MedusaProductTypeNames.MenuItem, MedusaProductTypeNames.Wine];
    }

    const productTypeIds = this._model.productTypes
      .filter((type) => names.includes(type.value as MedusaProductTypeNames))
      .map((type) => type.id);

    return productTypeIds;
  }

  private getFilter(inventory?: InventoryLocation | undefined): string {
    let filterValue = `status = published`;
    if (inventory?.type) {
      const types = this.getTypeIds(inventory.type);
      filterValue += ` AND type_id IN [${types.join(', ')}]`;
    }

    const salesChannel =
      inventory?.salesChannels && inventory?.salesChannels.length > 0
        ? inventory?.salesChannels[0]
        : undefined;
    if (salesChannel) {
      filterValue += ` AND sales_channel_ids = ${salesChannel.id}`;
    }

    if (
      this._model.selectedTab &&
      this._model.selectedTab !== ProductTabs.Wines
    ) {
      filterValue += ` AND metadata.type = ${this._model.selectedTab}`;
    } else if (
      this._model.selectedTab &&
      this._model.selectedTab === ProductTabs.Wines
    ) {
      filterValue += ` AND metadata.type IN [${ProductTabs.White}, ${ProductTabs.Red}, ${ProductTabs.Rose}, ${ProductTabs.Spirits}]`;
    }

    return filterValue;
  }

  private getSorting(
    inventory: InventoryLocation | undefined
  ): string | undefined {
    let sortValue: string | undefined = undefined;
    if (
      inventory?.type &&
      inventory.type === InventoryLocationType.Restaurant
    ) {
      sortValue = `metadata.order_index:asc`;
    }

    return sortValue;
  }
}
