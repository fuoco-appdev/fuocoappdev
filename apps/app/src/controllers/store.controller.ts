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
  private readonly _productsIndex: Index<Record<string, any>>;
  private _selectedInventoryLocationSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new StoreModel();
    this._productsIndex = MeiliSearchService.client.index('products');
    this.onSelectedInventoryLocationChangedAsync =
      this.onSelectedInventoryLocationChangedAsync.bind(this);
  }

  public get model(): StoreModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this.intializeAsync(renderCount);
  }

  public override dispose(renderCount: number): void {
    this._selectedInventoryLocationSubscription?.unsubscribe();
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this._model.pagination = 1;
    this.searchAsync(value);
  }

  public updateSelectedPreview(value: Product): void {
    this._model.selectedPreview = value;
  }

  public async updateSelectedTabAsync(
    value: ProductTabs | undefined
  ): Promise<void> {
    this._model.selectedTab = value;
    await this.searchAsync('');
  }

  public async onNextScrollAsync(): Promise<void> {
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

    const result = await this._productsIndex.search(query, {
      filter: ['type_value = Wine AND status = published'],
      offset: offset,
      limit: limit,
    });
    let hits = result.hits as Product[];

    if (hits.length <= 0 && this._model.hasMorePreviews) {
      this._model.hasMorePreviews = false;
      return;
    }

    if (hits.length > 0 && !this._model.hasMorePreviews) {
      this._model.hasMorePreviews = true;
    }

    const productIds: string[] = hits.map((value: Product) => value.id);
    const productsResponse = await MedusaService.medusa.products.list({
      id: productIds,
      sales_channel_id: [this._model.selectedSalesChannel.id ?? ''],
    });
    const removedHits: PricedProduct[] = [];
    const products = productsResponse.products;
    for (let i = 0; i < products.length; i++) {
      const typeOption = products[i].options?.find(
        (value) => value.title === ProductOptions.Type
      );
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
          const typeValue = variant.options?.find(
            (value: ProductOptionValue) => value.option_id === typeOption?.id
          );
          const duplicates = removedHits.filter(
            (value) => value.id === products[i].id
          );
          if (
            duplicates.length <= 0 &&
            typeValue?.value?.toLowerCase() !==
              this._model.selectedTab?.toLowerCase()
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
      return;
    }

    this._model.previews = products;
  }

  public async applyFilterAsync(
    regionId: string,
    cellarId: string
  ): Promise<void> {
    const region = this._model.regions.find((value) => value.id === regionId);
    await this.updateRegionAsync(region);

    const inventoryLocation = HomeController.model.inventoryLocations.find(
      (value) => value.company === cellarId
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
    const response = await MedusaService.medusa.regions.list();
    this._model.regions = response.regions;
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
    await this.searchAsync('');
  }

  private async updateRegionAsync(region: Region | undefined): Promise<void> {
    this._model.selectedRegion = region;
  }
}

export default new StoreController();
