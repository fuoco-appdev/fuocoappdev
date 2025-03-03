import { makeObservable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class LandingModel extends Model {
  constructor(options?: StoreOptions) {
    super({
      ...options,
      ...{ persistableProperties: { local: ['_selectedInventoryLocationId'] } },
    });
    makeObservable(this);
  }
}
