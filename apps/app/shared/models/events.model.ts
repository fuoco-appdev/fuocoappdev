import { makeObservable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class EventsModel extends Model {
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);
  }
}
