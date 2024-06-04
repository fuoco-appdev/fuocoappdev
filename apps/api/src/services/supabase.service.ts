import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import {
  createClient,
  SupabaseClient,
} from 'https://esm.sh/@supabase/supabase-js@2.7.0';

class SupabaseService {
  private readonly _client: SupabaseClient;
  private readonly _key: string | undefined;

  constructor() {
    const url = Deno.env.get('SUPABASE_URL');
    this._key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url) {
      throw new Error("SUPABASE_URL doesn't exist");
    }
    if (!this._key) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY doesn't exist");
    }

    this._client = createClient(url, this._key);
  }

  public get client(): SupabaseClient {
    return this._client;
  }

  public get key(): string | undefined {
    return this._key;
  }
}

export default new SupabaseService();
