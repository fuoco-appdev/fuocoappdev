import {
  createClient,
  SupabaseClient,
} from 'https://esm.sh/@supabase/supabase-js@2.7.0';

class SupabaseService {
  private readonly _client: SupabaseClient;

  constructor() {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url) {
      throw new Error("SUPABASE_URL doesn't exist");
    }
    if (!key) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY doesn't exist");
    }

    this._client = createClient(url, key);
  }

  public get client(): SupabaseClient {
    return this._client;
  }
}

export default new SupabaseService();
