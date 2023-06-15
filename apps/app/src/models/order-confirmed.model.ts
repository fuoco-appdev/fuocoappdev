import { Order } from '@medusajs/medusa';
import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface OrderConfirmedState {
  order: Partial<Order> | undefined;
}

export class OrderConfirmedModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'order-confirmed' },
        withProps<OrderConfirmedState>({
          order: undefined,
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
}
