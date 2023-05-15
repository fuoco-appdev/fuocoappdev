/* eslint-disable @typescript-eslint/no-empty-function */
import { Index } from 'meilisearch';
import { Controller } from '../controller';
import { StoreModel, WinePreview } from '../models/store.model';
import MeiliSearchService from '../services/meilisearch.service';

class StoreController extends Controller {
  private readonly _model: StoreModel;
  private readonly _productsIndex: Index<Record<string, any>>;

  constructor() {
    super();

    this._model = new StoreModel();
    this._productsIndex = MeiliSearchService.client.index('products');
  }

  public get model(): StoreModel {
    return this._model;
  }

  public initialize(): void {
    this.searchAsync('');
  }

  public dispose(): void {}

  public updateInput(value: string) {
    this._model.input = value;
    this.searchAsync(value);
  }

  public async searchAsync(query: string): Promise<void> {
    const result = await this._productsIndex.search(query, {
      filter: ['type_value = Wine'],
    });
    this._model.previews = result.hits as WinePreview[];
  }
}

export default new StoreController();
