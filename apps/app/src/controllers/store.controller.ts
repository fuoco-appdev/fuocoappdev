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
} from '@medusajs/medusa';
import { ProductOptions } from '../models/product.model';

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

  public async searchAsync(query: string): Promise<void> {
    if (!this._model.selectedRegion) {
      return;
    }

    const result = await this._productsIndex.search(query, {
      filter: ['type_value = Wine AND status = published'],
    });
    let hits = result.hits as Product[];
    const removedHits: Product[] = [];
    for (let i = 0; i < hits.length; i++) {
      const typeOption = hits[i].options.find(
        (value) => value.title === ProductOptions.Type
      );
      for (const variant of hits[i].variants) {
        const price = variant.prices?.find(
          (value) => value.region_id === this._model.selectedRegion?.id
        );
        if (!price) {
          hits.splice(i, 1);
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
            (value) => value.id === hits[i].id
          );
          if (
            duplicates.length <= 0 &&
            typeValue?.value?.toLowerCase() !==
              this._model.selectedTab?.toLowerCase()
          ) {
            removedHits.push(hits[i]);
          }
        }
      }
    }

    for (const removedHit of removedHits) {
      const index = hits.indexOf(removedHit);
      hits.splice(index, 1);
    }

    if (this._model.selectedTab === ProductTabs.New) {
      hits.sort(
        (prev, next) =>
          new Date(next.created_at ?? '').valueOf() -
          new Date(prev.created_at ?? '').valueOf()
      );
    }

    this._model.previews = hits;
  }

  public async applyFilterAsync(regionId: string): Promise<void> {
    const region = this._model.regions.find((value) => value.id === regionId);
    await this.updateRegionAsync(region);
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

    if (inventoryLocation.salesChannels.length <= 0) {
      return;
    }

    const min = 0;
    const max = inventoryLocation.salesChannels.length - 1;
    const randomSalesChannelIndex =
      Math.floor(Math.random() * (max - min + 1)) + min;
    this._model.selectedSalesChannel =
      inventoryLocation.salesChannels[randomSalesChannelIndex];
  }

  private async updateRegionAsync(region: Region | undefined): Promise<void> {
    this._model.selectedRegion = region;
    await this.searchAsync('');
  }
}

export default new StoreController();
