import { HttpTypes } from '@medusajs/types';
import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export interface RefundItem {
  item_id: string;
  quantity: number;
  reason_id?: string;
  note?: string;
}

export class OrderConfirmedModel extends Model {
  @observable
  public order: Partial<HttpTypes.StoreOrder> | undefined;
  @observable
  public returnReasons: HttpTypes.StoreReturnReason[];
  @observable
  public refundItems: Record<string, RefundItem>;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    this.order = undefined;
    this.returnReasons = [];
    this.refundItems = {};
  }

  public updateOrder(value: Partial<HttpTypes.StoreOrder> | undefined) {
    if (JSON.stringify(this.order) !== JSON.stringify(value)) {
      this.order = value;
    }
  }

  public updateReturnReasons(value: HttpTypes.StoreReturnReason[]) {
    if (JSON.stringify(this.returnReasons) !== JSON.stringify(value)) {
      this.returnReasons = value;
    }
  }

  public updateRefundItems(value: Record<string, RefundItem>) {
    if (JSON.stringify(this.refundItems) !== JSON.stringify(value)) {
      this.refundItems = value;
    }
  }
}
