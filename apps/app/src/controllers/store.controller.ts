/* eslint-disable @typescript-eslint/no-empty-function */
import { Index } from 'meilisearch';
import { Controller } from '../controller';
import { StoreModel, WinePreview } from '../models/store.model';
import MeiliSearchService from '../services/meilisearch.service';
import { Subscription } from 'rxjs';
import HomeController from './home.controller';
import { select } from '@ngneat/elf';
import { SalesChannel } from '../models/home.model';
import MedusaService from '../services/medusa.service';

class StoreController extends Controller {
  private readonly _model: StoreModel;
  private readonly _productsIndex: Index<Record<string, any>>;
  private _selectedSalesChannelSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new StoreModel();
    this._productsIndex = MeiliSearchService.client.index('products');
    this.onSelectedSalesChannelChangedAsync =
      this.onSelectedSalesChannelChangedAsync.bind(this);
  }

  public get model(): StoreModel {
    return this._model;
  }

  public initialize(): void {
    this.intializeAsync();
  }

  public dispose(): void {
    this._selectedSalesChannelSubscription?.unsubscribe();
  }

  public updateInput(value: string): void {
    this._model.input = value;
    this.searchAsync(value);
  }

  public updateSelectedPreview(value: WinePreview): void {
    this._model.selectedPreview = value;
  }

  public async searchAsync(query: string): Promise<void> {
    if (!this._model.selectedRegion) {
      return;
    }

    const result = await this._productsIndex.search(query, {
      filter: ['type_value = Wine AND status = published'],
    });
    const hits = result.hits as WinePreview[];
    for (let i = 0; i < hits.length; i++) {
      for (const variant of hits[i].variants) {
        const price = variant.prices.find(
          (value) => value.region_id === this._model.selectedRegion?.id
        );
        if (!price) {
          hits.splice(i, 1);
        }
      }
    }
    this._model.previews = hits;
  }

  private async intializeAsync(): Promise<void> {
    await this.requestRegionsAsync();
    this._selectedSalesChannelSubscription = HomeController.model.store
      .pipe(select((model) => model.selectedSalesChannel))
      .subscribe({
        next: this.onSelectedSalesChannelChangedAsync,
      });
  }

  private async requestRegionsAsync(): Promise<void> {
    const response = await MedusaService.medusa.regions.list();
    this._model.regions = response.regions;
  }

  private async onSelectedSalesChannelChangedAsync(
    salesChannel: SalesChannel
  ): Promise<void> {
    if (!salesChannel?.region) {
      return;
    }

    const region = this._model.regions.find(
      (value) => value.name === salesChannel.region
    );
    this._model.selectedRegion = region;
    await this.searchAsync('');
  }
}

export default new StoreController();
