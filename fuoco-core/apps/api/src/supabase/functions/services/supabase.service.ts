import { createClient, SupabaseClient } from "https://deno.land/x/supabase@1.3.1/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

class SupabaseService {
    private readonly _client: SupabaseClient;

    constructor() {
        const url = Deno.env.get('SUPABASE_URL');
        const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        console.log(Deno.env.get('SUPABASE_ANON_KEY'));
        if (!url) {
            throw new Error("SUPABASE_URL doesn't exist");
        }
        if (!key) {
            throw new Error("SUPABASE_ANON_KEY doesn't exist");
        }

        this._client = createClient(url, key, {
            detectSessionInUrl: false
        });
    }

    public get client(): SupabaseClient  {
        return this._client;
    }
}

export default new SupabaseService();