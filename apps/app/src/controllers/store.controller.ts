/* eslint-disable @typescript-eslint/no-empty-function */
import { Index } from 'meilisearch';
import { Controller } from '../controller';
import { StoreModel, ProductTabs } from '../models/store.model';
import MeiliSearchService from '../services/meilisearch.service';
import { Subscription } from 'rxjs';
import HomeController from './home.controller';
import { select } from '@ngneat/elf';
import { InventoryLocation } from '../models/home.model';
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
import ProductLikesService from 'src/services/product-likes.service';
import { ProductLikesMetadataResponse } from 'src/protobuf/core_pb';

class StoreController extends Controller {
  private readonly _model: StoreModel;
  private _timerId: NodeJS.Timeout | number | undefined;
  private _productsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationSubscription: Subscription | undefined;
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
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription?.unsubscribe();
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

  public updateSelectedProductLikes(
    value: ProductLikesMetadataResponse | undefined
  ): void {
    this._model.selectedProductLikes = value;
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
    await this.searchAsync(this._model.input, offset, this._limit);
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
    limit: number = 10
  ): Promise<void> {
    if (this._model.isLoading || !this._model.selectedRegion) {
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
        const productLikes = this._model.productLikes;
        this._model.productLikes = productLikes.concat(
          productLikesResponse.metadata
        );
      } else {
        this._model.productLikes = productLikesResponse.metadata;
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

    const inventoryLocation = HomeController.model.inventoryLocations.find(
      (value) => value.id === cellarId
    );
    if (inventoryLocation) {
      HomeController.updateSelectedInventoryLocation(inventoryLocation);
    }
  }

  public updateProductLikesMetadata(
    id: string,
    metadata: ProductLikesMetadataResponse
  ): void {
    const metadataIndex = this._model.productLikes.findIndex(
      (value) => value.productId === id
    );
    const productLikes = [...this._model.productLikes];
    productLikes[metadataIndex] = metadata;
    this._model.productLikes = productLikes;
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
          this.searchAsync(this._model.input, 0, this._limit);
        },
      });

    this._selectedInventoryLocationSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription = HomeController.model.store
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
    this.searchAsync(this._model.input, 0, this._limit);
  }

  private updateRegion(region: Region | undefined): void {
    this._model.selectedRegion = region;
  }
}

export default new StoreController();
