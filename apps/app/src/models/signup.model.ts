import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import { Model } from '../model';
import { SupabaseClient } from '@supabase/supabase-js';

export interface SignupState {
  supabaseClient?: SupabaseClient | undefined;
  emailConfirmationSent: boolean;
  location?: Location;
  email?: string;
  password?: string;
  confirmationPassword?: string;
}

export class SignupModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'signup' },
        withProps<SignupState>({
          supabaseClient: undefined,
          emailConfirmationSent: false,
          location: undefined,
          email: '',
          password: '',
          confirmationPassword: '',
        })
      )
    );
  }

  public get supabaseClient(): SupabaseClient | undefined {
    return this.store.getValue().supabaseClient;
  }

  public set supabaseClient(value: SupabaseClient | undefined) {
    if (JSON.stringify(this.supabaseClient) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, supabaseClient: value }));
    }
  }

  public get emailConfirmationSent(): boolean {
    return this.store.getValue().emailConfirmationSent;
  }

  public set emailConfirmationSent(emailConfirmationSent: boolean) {
    if (this.emailConfirmationSent !== emailConfirmationSent) {
      this.store.update((state) => ({
        ...state,
        emailConfirmationSent: emailConfirmationSent,
      }));
    }
  }

  public get location(): Location {
    return this.store.getValue().location;
  }

  public set location(location: Location) {
    if (this.location !== location) {
      this.store.update((state) => ({ ...state, location: location }));
    }
  }

  public get email(): string {
    return this.store.getValue().email;
  }

  public set email(value: string) {
    if (this.email !== value) {
      this.store.update((state) => ({ ...state, email: value }));
    }
  }

  public get password(): string {
    return this.store.getValue().password;
  }

  public set password(value: string) {
    if (this.password !== value) {
      this.store.update((state) => ({ ...state, password: value }));
    }
  }

  public get confirmationPassword(): string {
    return this.store.getValue().confirmationPassword;
  }

  public set confirmationPassword(value: string) {
    if (this.confirmationPassword !== value) {
      this.store.update((state) => ({ ...state, confirmationPassword: value }));
    }
  }
}
