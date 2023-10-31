import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import { SupabaseClient } from '@supabase/supabase-js';

export interface ResetPasswordState {
  supabaseClient: SupabaseClient | undefined;
}

export class ResetPasswordModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'reset-password' },
        withProps<ResetPasswordState>({
          supabaseClient: undefined,
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
}
