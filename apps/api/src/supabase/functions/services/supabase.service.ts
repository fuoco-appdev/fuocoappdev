/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createClient,
  SupabaseClient,
} from 'https://esm.sh/@supabase/supabase-js@2.7.0';

class SupabaseService {
  private _client: SupabaseClient | null;

  constructor() {
    this._client = null;
  }

  public createClient(config: { isLocal: boolean } = { isLocal: false }): void {
    const url = Deno.env.get('SUPABASE_URL');
    if (!url) {
      throw new Error("SUPABASE_URL doesn't exist");
    }

    let key: string | undefined;
    if (config.isLocal) {
      key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      if (!key) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY doesn't exist");
      }
    } else {
      key = Deno.env.get('SUPABASE_ANON_KEY');
      if (!key) {
        throw new Error("SUPABASE_ANON_KEY doesn't exist");
      }
    }

    this._client = createClient(url, key);
  }

  public get client(): SupabaseClient {
    return this._client!;
  }
}

export default new SupabaseService();
