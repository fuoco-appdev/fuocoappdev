import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface StoreState {}

export class StoreModel extends Model {
  constructor() {
    super(createStore({ name: 'store' }, withProps<StoreState>({})));
  }
}
