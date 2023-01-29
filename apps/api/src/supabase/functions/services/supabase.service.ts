import {
  createClient,
  SupabaseClient,
} from 'https://deno.land/x/supabase@1.3.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

class SupabaseService {
  private readonly _client: SupabaseClient;
  private readonly _serviceRoleKey: string;

  constructor() {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url) {
      throw new Error("SUPABASE_URL doesn't exist");
    }
    if (!key) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY doesn't exist");
    }

    this._client = createClient(url, key, {
      detectSessionInUrl: false,
    });
    this._serviceRoleKey = key;
  }

  public get client(): SupabaseClient {
    return this._client;
  }

  public get serviceRoleKey(): string {
    return this._serviceRoleKey;
  }
}

export default new SupabaseService();
