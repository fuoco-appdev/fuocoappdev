import { when } from 'mobx';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import {
  OrderConfirmedModel,
  RefundItem,
} from '../models/order-confirmed.model';
import MedusaService from '../services/medusa.service';
import { StoreOptions } from '../store-options';
import StoreController from './store.controller';

export default class OrderConfirmedController extends Controller {
  private readonly _model: OrderConfirmedModel;
  constructor(
    private readonly _container: DIContainer<{
      MedusaService: MedusaService;
      StoreController: StoreController;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new OrderConfirmedModel(this._storeOptions);
  }

  public get model(): OrderConfirmedModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {
    this.initializeAsync();
  }

  public override load(_renderCount: number): void {
    this.requestReturnReasonsAsync();
  }

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public async requestOrderAsync(orderId: string): Promise<void> {
    this._model.order = undefined;
    this._model.refundItems = {};
    this._model.returnReasons = [];

    const medusaService = this._container.get('MedusaService');

    try {
      this._model.order = await medusaService.requestStoreOrderAsync(orderId);
    } catch (error: any) {
      console.error(error);
    }
  }

  public updateRefundItem(itemId: string, value: RefundItem): void {
    const copy = { ...this._model.refundItems };
    copy[itemId] = value;
    this._model.refundItems = copy;
  }

  public async createReturnAsync(): Promise<void> {
    if (!this._model.order?.id) {
      return;
    }

    const items: RefundItem[] = [];
    for (const key in this._model.refundItems) {
      const item = this._model.refundItems[key];
      if (item.quantity > 0) {
        items.push(item);
      }
    }

    const medusaService = this._container.get('MedusaService');
    try {
      await medusaService.requestStoreCreateReturn({
        order_id: this._model.order?.id,
        items: items,
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  private async initializeAsync(): Promise<void> {}

  private async loadAsync(): Promise<void> {
    await this.requestShippingOptions();
  }

  private async requestReturnReasonsAsync(): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const returnReasons = await medusaService.requestStoreReturnReasons();
    this._model.returnReasons = returnReasons ?? [];
  }

  private async requestShippingOptions(): Promise<void> {
    const medusaService = this._container.get('MedusaService');
    const storeController = this._container.get('StoreController');
    await when(() => storeController.model.selectedRegion !== undefined);
    const selectedRegion = storeController.model.selectedRegion;

    try {
      const shippingOptions = await medusaService.requestStoreShippingOptions({
        region_id: selectedRegion?.id,
      });
      this._model.shippingOptions = shippingOptions ?? [];
    } catch (error: any) {
      console.error(error);
    }
  }
}
