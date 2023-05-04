import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface CartState {}

export class CartModel extends Model {
  constructor() {
    super(createStore({ name: 'cart' }, withProps<CartState>({})));
  }
}
