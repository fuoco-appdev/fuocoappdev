import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class LoadingModel extends Model {
  @observable
  public isLoading: boolean;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);
    this.isLoading = false;
  }

  public updateIsLoading(isLoading: boolean) {
    if (this.isLoading !== isLoading) {
      this.isLoading = isLoading;
    }
  }
}
