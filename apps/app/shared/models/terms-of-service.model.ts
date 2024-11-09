import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class TermsOfServiceModel extends Model {
  @observable
  public markdown!: string;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => (this.markdown = ''));
  }

  public updateMarkdown(value: string) {
    if (this.markdown !== value) {
      runInAction(() => (this.markdown = value));
    }
  }
}
