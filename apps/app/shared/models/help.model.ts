import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class HelpModel extends Model {
  @observable
  public markdown: string;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);
    this.markdown = '';
  }

  public updateMarkdown(value: string) {
    if (this.markdown !== value) {
      this.markdown = value;
    }
  }
}
