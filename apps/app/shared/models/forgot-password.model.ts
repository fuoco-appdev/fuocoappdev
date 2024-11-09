import { SupabaseClient } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class ForgotPasswordModel extends Model {
  @observable
  public supabaseClient?: SupabaseClient | undefined;
  @observable
  public email!: string;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => {
      this.supabaseClient = undefined;
      this.email = '';
    });
  }

  public updateSupabaseClient(value: SupabaseClient | undefined) {
    if (JSON.stringify(this.supabaseClient) !== JSON.stringify(value)) {
      this.supabaseClient = value;
    }
  }

  public updateEmail(value: string) {
    if (this.email !== value) {
      this.email = value;
    }
  }
}
