import { SupabaseClient } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Location } from 'react-router-dom';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class SignupModel extends Model {
  @observable
  public supabaseClient?: SupabaseClient | undefined;
  @observable
  public emailConfirmationSent!: boolean;
  @observable
  public location?: Location;
  @observable
  public email?: string;
  @observable
  public password?: string;
  @observable
  public confirmationPassword?: string;

  constructor(options?: StoreOptions) {
    super(options);
    makeObservable(this);

    runInAction(() => {
      this.supabaseClient = undefined;
      this.emailConfirmationSent = false;
      this.location = undefined;
      this.email = '';
      this.password = '';
      this.confirmationPassword = '';
    });
  }

  public updateSupabaseClient(value: SupabaseClient | undefined) {
    if (JSON.stringify(this.supabaseClient) !== JSON.stringify(value)) {
      this.supabaseClient = value;
    }
  }

  public updateEmailConfirmationSent(emailConfirmationSent: boolean) {
    if (this.emailConfirmationSent !== emailConfirmationSent) {
      this.emailConfirmationSent = emailConfirmationSent;
    }
  }

  public updateLocation(location: Location) {
    if (this.location !== location) {
      this.location = location;
    }
  }

  public updatEmail(value: string) {
    if (this.email !== value) {
      this.email = value;
    }
  }

  public updatePassword(value: string) {
    if (this.password !== value) {
      this.password = value;
    }
  }

  public updateConfirmationPassword(value: string) {
    if (this.confirmationPassword !== value) {
      this.confirmationPassword = value;
    }
  }
}
