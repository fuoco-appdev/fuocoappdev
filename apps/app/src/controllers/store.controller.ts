/* eslint-disable @typescript-eslint/no-empty-function */
import { Index } from "meilisearch";
import { Controller } from "../controller";
import { ProductTabs, StoreModel } from "../models/store.model";
import MeiliSearchService from "../services/meilisearch.service";
import { filter, firstValueFrom, Subscription, take } from "rxjs";
import ExploreController from "./explore.controller";
import { select } from "@ngneat/elf";
import {
  InventoryLocation,
  InventoryLocationType,
} from "../models/explore.model";
import MedusaService from "../services/medusa.service";
import CartController from "../controllers/cart.controller";
import {
  CustomerGroup,
  Product,
  ProductOption,
  ProductOptionValue,
  Region,
  SalesChannel,
} from "@medusajs/medusa";
import { ProductOptions } from "../models/product.model";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import SupabaseService from "../services/supabase.service";
import { AccountState } from "../models/account.model";
import AccountController from "./account.controller";
import ProductLikesService from "../services/product-likes.service";
import {
  AccountResponse,
  ProductLikesMetadataResponse,
} from "../protobuf/core_pb";
import { MedusaProductTypeNames } from "../types/medusa.type";

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
    this.onSelectedInventoryLocationChangedAsync = this
      .onSelectedInventoryLocationChangedAsync.bind(this);
    this._limit = 20;
  }

  public get model(): StoreModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._productsIndex = MeiliSearchService.client?.index("products_custom");

    this.initializeAsync(renderCount);
  }

  public override load(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
    this._accountSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.account))
      .subscribe({
        next: (value: AccountResponse | undefined) => {
          if (!value) {
            return;
          }

          this.loadProductsAsync();
        },
      });

    this._customerGroupSubscription?.unsubscribe();
    this._customerGroupSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.customerGroup))
      .subscribe({
        next: (customerGroup: CustomerGroup | undefined) => {
          if (!customerGroup) {
            return;
          }

          this.loadProductsAsync();
        },
      });

    this.loadProductsAsync();
  }

  public override disposeInitialization(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._selectedInventoryLocationSubscription?.unsubscribe();
  }

  public override disposeLoad(renderCount: number): void {
    clearTimeout(this._timerId as number | undefined);
    this._customerGroupSubscription?.unsubscribe();
    this._accountSubscription?.unsubscribe();
  }

  public async loadProductsAsync(): Promise<void> {
    const region = await firstValueFrom(
      this._model.store.pipe(
        select((model) => model.selectedRegion),
        filter((value) => value !== undefined),
        take(1),
      ),
    );
    if (!region) {
      return;
    }

    await this.searchAsync(this._model.input, 0, this._limit);
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this._model.pagination = 1;
    this._model.products = [];
    this._model.pricedProducts = {};
    this._model.hasMorePreviews = true;
    clearTimeout(this._timerId as number | undefined);
    this._timerId = setTimeout(() => {
      this.searchAsync(value, 0, this._limit);
    }, 750);
  }

  public updateSelectedPricedProduct(value: PricedProduct | undefined): void {
    this._model.selectedPricedProduct = value;
  }

  public updateSelectedProductLikesMetadata(
    value: ProductLikesMetadataResponse | null,
  ): void {
    this._model.selectedProductLikesMetadata = value;
  }

  public updateScrollPosition(value: number | undefined) {
    this._model.scrollPosition = value;
  }

  public async updateSelectedTabAsync(
    value: ProductTabs | undefined,
  ): Promise<void> {
    this._model.selectedTab = value;
    this._model.pagination = 1;
    this._model.products = [];
    this._model.pricedProducts = {};
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
    force: boolean = false,
  ): Promise<void> {
    if (!force && (this._model.isLoading || !this._model.selectedRegion)) {
      return;
    }

    if (!this._model.selectedSalesChannel) {
      return;
    }

    const selectedInventoryLocation: InventoryLocation = await firstValueFrom(
      ExploreController.model.store.pipe(
        select((model) => model.selectedInventoryLocation),
        filter((value) => value !== undefined),
        take(1),
      ),
    );
    if (!selectedInventoryLocation.type) {
      return;
    }

    this._model.isLoading = true;

    let filterValue = await this.getFilterAsync(selectedInventoryLocation.type);
    const result = await this._productsIndex?.search(query, {
      filter: [filterValue],
      offset: offset,
      limit: limit,
    });

    let hits = result?.hits as Product[];
    if (hits && hits.length <= 0 && offset <= 0) {
      this._model.products = [];
    }

    if (hits && hits.length < limit && this._model.hasMorePreviews) {
      this._model.hasMorePreviews = false;
    }

    if (hits && hits.length <= 0) {
      this._model.isLoading = false;
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

    this._model.isLoading = false;

    const productIds: string[] = hits.map((value: Product) => value.id);

    try {
      const productLikesResponse = await ProductLikesService
        .requestMetadataAsync({
          accountId: AccountController.model.account?.id ?? "",
          productIds: productIds,
        });

      if (offset > 0) {
        const productLikesMetadata = this._model.productLikesMetadata;
        this._model.productLikesMetadata = productLikesMetadata.concat(
          productLikesResponse.metadata,
        );
      } else {
        this._model.productLikesMetadata = productLikesResponse.metadata;
      }
    } catch (error: any) {
      console.error(error);
    }

    const selectedRegion = await firstValueFrom(
      this._model.store.pipe(
        select((model) => model.selectedRegion),
        filter((value) => value !== undefined),
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
    const productsResponse = await MedusaService.medusa?.products.list({
      id: productIds,
      sales_channel_id: [this._model.selectedSalesChannel?.id ?? ""],
      ...(selectedRegion && {
        region_id: selectedRegion.id,
        currency_code: selectedRegion.currency_code,
      }),
      ...(cart && { cart_id: cart.id }),
    });
    const products = productsResponse?.products ?? [];
    for (let i = 0; i < products.length; i++) {
      for (const variant of products[i].variants) {
        const price = variant.prices?.find(
          (value) => value.region_id === this._model.selectedRegion?.id,
        );
        if (!price) {
          products.splice(i, 1);
        }
      }
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
  }

  public async applyFilterAsync(
    regionId: string,
    cellarId: string,
  ): Promise<void> {
    const region = this._model.regions.find((value) => value.id === regionId);
    this.updateRegion(region);

    const inventoryLocation = ExploreController.model.inventoryLocations.find(
      (value) => value.id === cellarId,
    );
    if (inventoryLocation) {
      ExploreController.updateSelectedInventoryLocation(inventoryLocation);
    }
  }

  public updateProductLikesMetadata(
    id: string,
    metadata: ProductLikesMetadataResponse,
  ): void {
    const metadataIndex = this._model.productLikesMetadata.findIndex(
      (value) => value.productId === id,
    );
    const productLikesMetadata = [...this._model.productLikesMetadata];
    productLikesMetadata[metadataIndex] = metadata;
    this._model.productLikesMetadata = productLikesMetadata;
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    await this.requestProductTypesAsync();
    await this.requestRegionsAsync();

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
    inventoryLocation: InventoryLocation,
  ): Promise<void> {
    if (!inventoryLocation?.region) {
      return;
    }

    if (!inventoryLocation || inventoryLocation.salesChannels?.length <= 0) {
      return;
    }

    this._model.selectedTab = undefined;
    this._model.pagination = 1;
    this._model.products = [];
    this._model.pricedProducts = {};
    this._model.selectedSalesChannel = inventoryLocation.salesChannels[0];

    const region = this._model.regions.find(
      (value) => value.name === inventoryLocation.region,
    );

    this.updateRegion(region);
  }

  private updateRegion(region: Region | undefined): void {
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

  private async getFilterAsync(
    inventoryType: InventoryLocationType,
  ): Promise<string> {
    const types = this.getTypeIds(inventoryType);
    let filterValue = `type_id IN [${types.join(", ")}]`;
    filterValue +=
      ` AND sales_channel_ids = ${this._model.selectedSalesChannel?.id}`;
    filterValue += ` AND status = published`;
    if (
      this._model.selectedTab &&
      this._model.selectedTab !== ProductTabs.Wines
    ) {
      filterValue += ` AND metadata.type = ${this._model.selectedTab}`;
    } else if (
      this._model.selectedTab &&
      this._model.selectedTab === ProductTabs.Wines
    ) {
      filterValue +=
        ` AND metadata.type IN [${ProductTabs.White}, ${ProductTabs.Red}, ${ProductTabs.Rose}, ${ProductTabs.Spirits}]`;
    }

    return filterValue;
  }
}

export default new StoreController();
