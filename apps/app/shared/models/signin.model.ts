import { SupabaseClient } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Location } from 'react-router-dom';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export interface SigninState {}

export class SigninModel extends Model {
  @observable
  public supabaseClient?: SupabaseClient | undefined;
  @observable
  public location?: Location;
  @observable
  public email!: string;
  @observable
  public password!: string;
  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => {
      this.supabaseClient = undefined;
      this.location = undefined;
      this.email = '';
      this.password = '';
    });
  }

  public updateSupabaseClient(value: SupabaseClient | undefined) {
    if (JSON.stringify(this.supabaseClient) !== JSON.stringify(value)) {
      this.supabaseClient = value;
    }
  }

  public updateLocation(location: Location) {
    if (JSON.stringify(this.location) !== JSON.stringify(location)) {
      this.location = location;
    }
  }

  public updatePassword(value: string) {
    if (this.password !== value) {
      this.password = value;
    }
  }
}
