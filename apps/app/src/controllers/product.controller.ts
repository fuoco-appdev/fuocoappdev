/* eslint-disable @typescript-eslint/no-empty-function */
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import {
  PricedVariant,
  ProductModel,
  ProductPrice,
} from '../models/product.model';
import { select } from '@ngneat/elf';
import { StoreModel, StoreState, WinePreview } from '../models/store.model';
import StoreController from './store.controller';
import MedusaService from '../services/medusa.service';

class ProductController extends Controller {
  private readonly _model: ProductModel;
  private _selectedPreviewSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new ProductModel();

    this.updateSelectedVariant = this.updateSelectedVariant.bind(this);
  }

  public get model(): ProductModel {
    return this._model;
  }

  public initialize(): void {
    this._selectedPreviewSubscription = StoreController.model.store
      .pipe(select((state: StoreState) => state.selectedPreview))
      .subscribe({
        next: (value: WinePreview | null) => {
          this._model.thumbnail = value?.thumbnail ?? '';
          this._model.title = value?.title ?? '';
          this._model.subtitle = value?.subtitle ?? '';
        },
      });
  }

  public dispose(): void {
    this._selectedPreviewSubscription?.unsubscribe();
  }

  public async requestProductAsync(id: string): Promise<void> {
    const productResponse = await MedusaService.medusa.products.retrieve(id);
    const product = productResponse.product;
    this._model.thumbnail = product.thumbnail ?? '';
    this._model.title = product.title ?? '';
    this._model.subtitle = product.subtitle ?? '';
    this._model.description = product.description ?? '';
    this._model.tags = product.tags ?? [];
    this._model.options = product.options ?? [];
    this._model.variants = product.variants ?? [];
  }

  public updateIsLiked(value: boolean): void {
    this._model.isLiked = value;
  }

  public updateSelectedVariant(id: string): void {
    const variant = this._model.variants.find((value) => value.id === id);
    this._model.selectedVariant = variant;

    // Change based on selected region
    if (variant?.prices) {
      this._model.price = this.formatPrice(variant?.prices[0]);
    }
  }

  private formatPrice(price: ProductPrice): string {
    if (!price.amount) {
      return 'null';
    }

    let value = price.amount.toString();
    let charList = value.split('');
    charList.splice(-2, 0, ',');
    value = charList.join('');
    return `${value} ${price.currency_code}`;
  }
}

export default new ProductController();
