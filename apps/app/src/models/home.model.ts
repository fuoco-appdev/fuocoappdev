import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface HomeState {}

export class HomeModel extends Model {
  constructor() {
    super(createStore({ name: 'home' }, withProps<HomeState>({})));
  }
}
