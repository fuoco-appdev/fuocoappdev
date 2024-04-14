import { createStore, withProps } from '@ngneat/elf';
import { SupabaseClient } from '@supabase/supabase-js';
import { Model } from '../model';

export interface ForgotPasswordState {
  supabaseClient?: SupabaseClient | undefined;
  email: string;
}

export class ForgotPasswordModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'forgot-password' },
        withProps<ForgotPasswordState>({
          supabaseClient: undefined,
          email: '',
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

  public get email(): string {
    return this.store.getValue().email;
  }

  public set email(value: string) {
    if (this.email !== value) {
      this.store.update((state) => ({ ...state, email: value }));
    }
  }
}
