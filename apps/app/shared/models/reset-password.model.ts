import { SupabaseClient } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class ResetPasswordModel extends Model {
  @observable
  public supabaseClient: SupabaseClient | undefined;
  @observable
  public password!: string;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => {
      this.supabaseClient = undefined;
      this.password = '';
    });
  }

  public updateSupabaseClient(value: SupabaseClient | undefined) {
    if (JSON.stringify(this.supabaseClient) !== JSON.stringify(value)) {
      this.supabaseClient = value;
    }
  }

  public updatePassword(value: string) {
    if (this.password !== value) {
      this.password = value;
    }
  }
}
