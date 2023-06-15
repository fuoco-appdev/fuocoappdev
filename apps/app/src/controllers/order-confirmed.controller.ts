import { Controller } from '../controller';
import { OrderConfirmedModel } from '../models/order-confirmed.model';
import MedusaService from '../services/medusa.service';
import { Order, LineItem } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

class OrderConfirmedController extends Controller {
  private readonly _model: OrderConfirmedModel;
  constructor() {
    super();

    this._model = new OrderConfirmedModel();
  }

  public get model(): OrderConfirmedModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {}

  public override dispose(renderCount: number): void {}

  public async requestOrderAsync(orderId: string): Promise<void> {
    const orderResponse = await MedusaService.medusa.orders.retrieve(orderId);
    await this.updateLocalOrderAsync(orderResponse.order);
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
        const productResponse = await MedusaService.medusa.products.retrieve(
          item.variant.product_id
        );
        product = productResponse.product;
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
