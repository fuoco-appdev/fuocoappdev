import {createClient, SupabaseClient} from '@supabase/supabase-js';
import ConfigService from './config.service';

class AuthService {
    private _supabaseClient!: SupabaseClient;

    constructor() {
        this._supabaseClient = createClient(ConfigService.supabase.url, ConfigService.supabase.key);
    }

    public get supabaseClient(): SupabaseClient {
        return this._supabaseClient;
    }
}

export default new AuthService();