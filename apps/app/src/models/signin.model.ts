import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import { Model } from '../model';
import { SupabaseClient } from '@supabase/supabase-js';

export interface SigninState {
  supabaseClient?: SupabaseClient | undefined;
  location?: Location;
  email: string;
  password: string;
}

export class SigninModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'signin' },
        withProps<SigninState>({
          supabaseClient: undefined,
          location: undefined,
          email: '',
          password: '',
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

  public get location(): Location {
    return this.store.getValue().location;
  }

  public set location(location: Location) {
    if (JSON.stringify(this.location) !== JSON.stringify(location)) {
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
}
