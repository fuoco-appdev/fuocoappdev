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
import {
  ProductOption,
  Region,
  Product,
  ProductOptionValue,
  SalesChannel,
} from '@medusajs/medusa';
import { ProductOptions } from '../models/product.model';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

class StoreController extends Controller {
  private readonly _model: StoreModel;
  private _productsIndex: Index<Record<string, any>> | undefined;
  private _selectedInventoryLocationSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new StoreModel();
    this.onSelectedInventoryLocationChangedAsync =
      this.onSelectedInventoryLocationChangedAsync.bind(this);
  }

  public get model(): StoreModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this._productsIndex = MeiliSearchService.client?.index('products');
    this.intializeAsync(renderCount);
  }

  public override dispose(renderCount: number): void {
    this._selectedInventoryLocationSubscription?.unsubscribe();
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this._model.pagination = 1;
    let timerId: NodeJS.Timeout | number | undefined = undefined;
    clearTimeout(timerId as number | undefined);
    timerId = setTimeout(() => {
      this.searchAsync(value);
    }, 750);
  }

  public updateSelectedPreview(value: Product): void {
    this._model.selectedPreview = value;
  }

  public async updateSelectedTabAsync(
    value: ProductTabs | undefined
  ): Promise<void> {
    this._model.selectedTab = value;
    this._model.pagination = 1;
    await this.searchAsync(this._model.input);
    await this.searchNextPageUntilLimit();
  }

  public async onNextScrollAsync(): Promise<void> {
    await this.searchNextPageAsync();
  }

  public async searchNextPageUntilLimit(limit: number = 10): Promise<void> {
    await this.searchNextPageAsync();

    if (this._model.hasMorePreviews && this._model.previews.length < limit) {
      this.searchNextPageUntilLimit(limit);
    }
  }

  public async searchNextPageAsync(): Promise<void> {
    this._model.pagination = this._model.pagination + 1;

    const limit = 10;
    const offset = limit * (this._model.pagination - 1);
    await this.searchAsync(this._model.input, offset, limit);
  }

  public async searchAsync(
    query: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<void> {
    if (!this._model.selectedRegion || !this._model.selectedSalesChannel) {
      return;
    }

    let queryWithFilter = '';
    if (
      this._model.selectedTab &&
      (this._model.selectedTab === ProductTabs.Red ||
        this._model.selectedTab === ProductTabs.Rose ||
        this._model.selectedTab === ProductTabs.Spirits ||
        this._model.selectedTab === ProductTabs.White)
    ) {
      queryWithFilter += `\"${this._model.selectedTab}\" `;
    }

    queryWithFilter += query;
    const result = await this._productsIndex?.search(queryWithFilter, {
      filter: ['type_value = Wine AND status = published'],
      offset: offset,
      limit: limit,
    });
    let hits = result?.hits as Product[];

    if (hits.length <= 0 && this._model.hasMorePreviews) {
      this._model.hasMorePreviews = false;
      return;
    }

    if (hits.length > 0 && !this._model.hasMorePreviews) {
      this._model.hasMorePreviews = true;
    }

    const productIds: string[] = hits.map((value: Product) => value.id);
    const productsResponse = await MedusaService.medusa?.products.list({
      id: productIds,
      sales_channel_id: [this._model.selectedSalesChannel.id ?? ''],
    });
    const removedHits: PricedProduct[] = [];
    const products = productsResponse?.products ?? [];
    for (let i = 0; i < products.length; i++) {
      const type = products[i].metadata?.['type'] as string;
      for (const variant of products[i].variants) {
        const price = variant.prices?.find(
          (value) => value.region_id === this._model.selectedRegion?.id
        );
        if (!price) {
          products.splice(i, 1);
        }

        // Remove hits with tabs
        if (
          this._model.selectedTab === ProductTabs.Red ||
          this._model.selectedTab === ProductTabs.Rose ||
          this._model.selectedTab === ProductTabs.Spirits ||
          this._model.selectedTab === ProductTabs.White
        ) {
          const duplicates = removedHits.filter(
            (value) => value.id === products[i].id
          );
          if (
            duplicates.length <= 0 &&
            type?.toLowerCase() !== this._model.selectedTab?.toLowerCase()
          ) {
            removedHits.push(products[i]);
          }
        }
      }
    }

    for (const removedHit of removedHits) {
      const index = products.findIndex((value) => value.id === removedHit.id);
      products.splice(index, 1);
    }

    if (this._model.selectedTab === ProductTabs.New) {
      products.sort(
        (prev, next) =>
          new Date(next.created_at ?? '').valueOf() -
          new Date(prev.created_at ?? '').valueOf()
      );
    }

    // Sort available products to the top
    products.sort((prev, next) => {
      for (const variant of next.variants) {
        const quantity = variant.inventory_quantity ?? 0;
        if (quantity <= 0) {
          return -1;
        } else {
          return 1;
        }
      }

      return 1;
    });

    if (offset > 0) {
      const previews = this._model.previews;
      this._model.previews = previews.concat(products);
    } else {
      this._model.previews = products;
    }
  }

  public async applyFilterAsync(
    regionId: string,
    cellarId: string
  ): Promise<void> {
    const region = this._model.regions.find((value) => value.id === regionId);
    await this.updateRegionAsync(region);

    const inventoryLocation = HomeController.model.inventoryLocations.find(
      (value) => value.placeName === cellarId
    );
    if (inventoryLocation) {
      HomeController.updateSelectedInventoryLocation(inventoryLocation);
    }
  }

  private async intializeAsync(renderCount: number): Promise<void> {
    if (renderCount <= 1) {
      await this.requestRegionsAsync();
    }

    this._selectedInventoryLocationSubscription = HomeController.model.store
      .pipe(select((model) => model.selectedInventoryLocation))
      .subscribe({
        next: this.onSelectedInventoryLocationChangedAsync,
      });
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

    const region = this._model.regions.find(
      (value) => value.name === inventoryLocation.region
    );
    await this.updateRegionAsync(region);

    if (!inventoryLocation || inventoryLocation.salesChannels?.length <= 0) {
      return;
    }

    const min = 0;
    const max = inventoryLocation.salesChannels?.length - 1;
    const randomSalesChannelIndex =
      Math.floor(Math.random() * (max - min + 1)) + min;
    this._model.selectedSalesChannel =
      inventoryLocation.salesChannels[randomSalesChannelIndex];
    this._model.pagination = 1;
    await this.searchAsync(this._model.input);
  }

  private async updateRegionAsync(region: Region | undefined): Promise<void> {
    this._model.selectedRegion = region;
  }
}

export default new StoreController();
