import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class EmailConfirmationModel extends Model {
  @observable
  public email: string | undefined;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => (this.email = ''));
  }

  public updateEmail(value: string | undefined) {
    if (JSON.stringify(this.email) !== JSON.stringify(value)) {
      this.email = value;
    }
  }
}
