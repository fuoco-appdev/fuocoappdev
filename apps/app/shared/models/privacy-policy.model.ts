import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class PrivacyPolicyModel extends Model {
  @observable
  public markdown!: string;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => (this.markdown = ''));
  }

  public updateMarkdown(value: string) {
    if (this.markdown !== value) {
      this.markdown = value;
    }
  }
}
