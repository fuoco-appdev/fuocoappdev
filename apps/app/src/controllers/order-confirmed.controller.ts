import { Controller } from '../controller';
import {
  OrderConfirmedModel,
  RefundItem,
} from '../models/order-confirmed.model';
import MedusaService from '../services/medusa.service';
import { Order, LineItem, StorePostReturnsReq } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import WindowController from './window.controller';

class OrderConfirmedController extends Controller {
  private readonly _model: OrderConfirmedModel;
  constructor() {
    super();

    this._model = new OrderConfirmedModel();
  }

  public get model(): OrderConfirmedModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    this.initializeAsync();
  }

  public override load(renderCount: number): void {
    this.requestReturnReasonsAsync();
  }

  public override disposeInitialization(renderCount: number): void {}

  public override disposeLoad(renderCount: number): void {}

  public async requestOrderAsync(orderId: string): Promise<void> {
    this._model.order = undefined;
    this._model.refundItems = {};
    this._model.returnReasons = [];

    try {
      const orderResponse = await MedusaService.medusa?.orders.retrieve(
        orderId
      );
      if (orderResponse?.order) {
        await this.updateLocalOrderAsync(orderResponse.order);
      }
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

    try {
      const returnResponse = await MedusaService.medusa?.returns.create({
        order_id: this._model.order?.id,
        items: items,
      });
    } catch (error: any) {
      console.error(error);
    }
  }

  private async initializeAsync(): Promise<void> {}

  private async requestReturnReasonsAsync(): Promise<void> {
    try {
      const returnReasonsResponse =
        await MedusaService.medusa?.returnReasons.list();
      this._model.returnReasons = returnReasonsResponse?.return_reasons ?? [];
    } catch (error: any) {
      throw error;
    }
  }

  private async updateLocalOrderAsync(value: Order): Promise<void> {
    const items: LineItem[] = [];
    for (const item of value.items) {
      const itemCache = this._model.order?.items?.find(
        (value) => value.id === item.id
      );
      let product: PricedProduct | undefined = itemCache?.variant.product as
        | PricedProduct
        | undefined;
      if (!product) {
        try {
          const productResponse = await MedusaService.medusa?.products.retrieve(
            item.variant.product_id
          );
          product = productResponse?.product;
        } catch (error: any) {
          console.error(error);
        }
      }

      const variant = product?.variants.find(
        (value) => value.id === item.variant_id
      );
      if (variant) {
        items.push({
          ...item,
          // @ts-ignore
          variant: {
            ...variant,
            // @ts-ignore
            product: product,
          },
        });
      }
    }

    this._model.order = {
      ...value,
      items: items,
    };
  }
}

export default new OrderConfirmedController();
