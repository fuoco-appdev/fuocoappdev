import { Order, ReturnReason } from '@medusajs/medusa';
import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface RefundItem {
  item_id: string;
  quantity: number;
  reason_id?: string;
  note?: string;
}

export interface OrderConfirmedState {
  order: Partial<Order> | undefined;
  returnReasons: ReturnReason[];
  refundItems: Record<string, RefundItem>;
}

export class OrderConfirmedModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'order-confirmed' },
        withProps<OrderConfirmedState>({
          order: undefined,
          returnReasons: [],
          refundItems: {},
        })
      )
    );
  }

  public get order(): Partial<Order> | undefined {
    return this.store.getValue().order;
  }

  public set order(value: Partial<Order> | undefined) {
    if (JSON.stringify(this.order) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, order: value }));
    }
  }

  public get returnReasons(): ReturnReason[] {
    return this.store.getValue().returnReasons;
  }

  public set returnReasons(value: ReturnReason[]) {
    if (JSON.stringify(this.returnReasons) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, returnReasons: value }));
    }
  }

  public get refundItems(): Record<string, RefundItem> {
    return this.store.getValue().refundItems;
  }

  public set refundItems(value: Record<string, RefundItem>) {
    if (JSON.stringify(this.refundItems) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, refundItems: value }));
    }
  }
}
