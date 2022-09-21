import { createClient, SupabaseClient } from "https://deno.land/x/supabase@1.3.1/mod.ts"
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

class SupabaseService {
    private readonly _client: SupabaseClient;

    constructor() {
        const env = config({path: '../../.env'});
        const url: string = env.SUPABASE_URL;
        const key: string = env.SUPABASE_KEY;
        if (!url) {
            throw new Error("SUPABASE_URL doesn't exist");
        }
        if (!key) {
            throw new Error("SUPABASE_KEY doesn't exist");
        }

        this._client = createClient(url, key);
    }

    public get client(): SupabaseClient  {
        return this._client;
    }
}

export default new SupabaseService();