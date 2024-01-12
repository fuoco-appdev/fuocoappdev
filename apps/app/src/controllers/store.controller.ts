/* eslint-disable @typescript-eslint/no-empty-function */
import { Index } from 'meilisearch';
import { Controller } from '../controller';
import { StoreModel, ProductTabs } from '../models/store.model';
import MeiliSearchService from '../services/meilisearch.service';
import { Subscription, filter, firstValueFrom, take } from 'rxjs';
import ExploreController from './explore.controller';
import { select } from '@ngneat/elf';
import { InventoryLocation } from '../models/explore.model';
import MedusaService from '../services/medusa.service';
import CartController from '../controllers/cart.controller';
import {
  ProductOption,
  Region,
  Product,
  ProductOptionValue,
  SalesChannel,
  CustomerGroup,
} from '@medusajs/medusa';
import { ProductOptions } from '../models/product.model';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import SupabaseService from '../services/supabase.service';
import { AccountState } from '../models/account.model';
import AccountController from './account.controller';
import ProductLikesService from '../services/product-likes.service';
import {
  ProductLikesMetadataResponse,
  AccountResponse,
} from '../protobuf/core_pb';

class StoreController extends Controller {
  private readonly _model: StoreModel;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _productsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationSubscription: Subscription | undefined;
  private _accountSubscription: Subscription | undefined;
  private _customerGroupSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;
  private _limit: number;

  constructor() {
    super();

    this._model = new StoreModel();
    this.onSelectedInventoryLocationChangedAsync =
      this.onSelectedInventoryLocationChangedAsync.bind(this);
    this._limit = 20;
  }

  public get model(): StoreModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._productsIndex = MeiliSearchService.client?.index('products');

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
    this._accountSubscription?.unsubscribe();
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription?.unsubscribe();
  }

  public async loadProductsAsync(): Promise<void> {
    const region = await firstValueFrom(
      this._model.store.pipe(
        select((model) => model.selectedRegion),
        filter((value) => value !== undefined),
        take(1)
      )
    );
    if (region) {
      await this.searchAsync(this._model.input, 0, this._limit);
    }
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this._model.pagination = 1;
    this._model.previews = [];
    this._model.hasMorePreviews = true;
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(() => {
      this.searchAsync(value, 0, this._limit);
    }, 750);
  }

  public updateSelectedPreview(value: PricedProduct): void {
    this._model.selectedPreview = value;
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
    this._model.previews = [];
    const offset = this._limit * (this._model.pagination - 1);
    await this.searchAsync(this._model.input, offset, this._limit, true);
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
    await this.searchAsync(this._model.input, offset, this._limit);
  }

  public async searchAsync(
    query: string,
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

    let filter = 'type_value = Wine AND status = published';
    if (
      this._model.selectedTab &&
      (this._model.selectedTab === ProductTabs.Red ||
        this._model.selectedTab === ProductTabs.Rose ||
        this._model.selectedTab === ProductTabs.Spirits ||
        this._model.selectedTab === ProductTabs.White)
    ) {
      filter += ` AND metadata.type = ${this._model.selectedTab}`;
    }

    const result = await this._productsIndex?.search(query, {
      filter: [filter],
      offset: offset,
      limit: limit,
    });

    let hits = result?.hits as Product[];
    if (hits.length <= 0 && offset <= 0) {
      this._model.previews = [];
    }

    if (hits.length < limit && this._model.hasMorePreviews) {
      this._model.hasMorePreviews = false;
    }

    if (hits.length <= 0) {
      this._model.isLoading = false;
      return;
    }

    if (hits.length >= limit && !this._model.hasMorePreviews) {
      this._model.hasMorePreviews = true;
    }

    const hitsOrder = hits.map((value) => value.id);
    const productIds: string[] = hits.map((value: Product) => value.id);

    try {
      const productLikesResponse =
        await ProductLikesService.requestMetadataAsync({
          accountId: AccountController.model.account?.id ?? '',
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

    const { selectedRegion } = this._model;
    const { cart } = CartController.model;
    const productsResponse = await MedusaService.medusa?.products.list({
      id: productIds,
      sales_channel_id: [this._model.selectedSalesChannel?.id ?? ''],
      ...(selectedRegion && {
        region_id: selectedRegion.id,
        currency_code: selectedRegion.currency_code,
      }),
      ...(cart && { cart_id: cart.id }),
    });
    const products = productsResponse?.products ?? [];
    products.sort((a, b) => {
      const currentId = a['id'] ?? '';
      const nextId = b['id'] ?? '';

      if (hitsOrder.indexOf(currentId) > hitsOrder.indexOf(nextId)) {
        return 1;
      } else {
        return -1;
      }
    });
    for (let i = 0; i < products.length; i++) {
      for (const variant of products[i].variants) {
        const price = variant.prices?.find(
          (value) => value.region_id === this._model.selectedRegion?.id
        );
        if (!price) {
          products.splice(i, 1);
        }
      }
    }

    if (offset > 0) {
      const previews = this._model.previews;
      this._model.previews = previews.concat(products);
    } else {
      this._model.previews = products;
    }

    this._model.isLoading = false;
  }

  public async applyFilterAsync(
    regionId: string,
    cellarId: string
  ): Promise<void> {
    const region = this._model.regions.find((value) => value.id === regionId);
    this.updateRegion(region);

    const inventoryLocation = ExploreController.model.inventoryLocations.find(
      (value) => value.id === cellarId
    );
    if (inventoryLocation) {
      ExploreController.updateSelectedInventoryLocation(inventoryLocation);
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

  private resetMedusaModel(): void {
    this._model.previews = [];
    this._model.selectedPreview = undefined;
    this._model.regions = [];
    this._model.selectedRegion = undefined;
    this._model.selectedSalesChannel = undefined;
    this._model.pagination = 1;
    this._model.hasMorePreviews = true;
    this._model.scrollPosition = undefined;
    this._model.isLoading = false;
    this._model.productTypes = [];
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    await this.requestProductTypesAsync();
    await this.requestRegionsAsync();

    this._customerGroupSubscription?.unsubscribe();
    this._customerGroupSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.customerGroup))
      .subscribe({
        next: (customerGroup: CustomerGroup | undefined) => {
          if (!customerGroup) {
            return;
          }

          this.searchAsync(this._model.input, 0, this._limit);
        },
      });

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.account))
      .subscribe({
        next: (value: AccountResponse | undefined) => {
          if (!value) {
            return;
          }

          this.searchAsync(this._model.input, 0, this._limit);
        },
      });

    this._selectedInventoryLocationSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription = ExploreController.model.store
      .pipe(select((model) => model.selectedInventoryLocation))
      .subscribe({
        next: this.onSelectedInventoryLocationChangedAsync,
      });
  }

  private async requestProductTypesAsync(): Promise<void> {
    const response = await MedusaService.medusa?.productTypes.list();
    this._model.productTypes = response?.product_types ?? [];
  }

  private async requestRegionsAsync(): Promise<void> {
    const response = await MedusaService.medusa?.regions.list();
    this._model.regions = response?.regions ?? [];
  }

  private async onSelectedInventoryLocationChangedAsync(
    inventoryLocation: InventoryLocation
  ): Promise<void> {
    if (!inventoryLocation?.region) {
      return;
    }

    if (!inventoryLocation || inventoryLocation.salesChannels?.length <= 0) {
      return;
    }

    this._model.selectedSalesChannel = inventoryLocation.salesChannels[0];
    this._model.pagination = 1;

    const region = this._model.regions.find(
      (value) => value.name === inventoryLocation.region
    );

    this.updateRegion(region);
  }

  private updateRegion(region: Region | undefined): void {
    this._model.selectedRegion = region;
  }
}

export default new StoreController();
