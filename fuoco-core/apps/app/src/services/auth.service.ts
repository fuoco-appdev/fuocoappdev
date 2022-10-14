import {createClient, SupabaseClient, User} from '@supabase/supabase-js';
import ConfigService from './config.service';

class AuthService {
    private _supabaseClient!: SupabaseClient;

    constructor() {
        this._supabaseClient = createClient(ConfigService.supabase.url, ConfigService.supabase.key);
    }

    public get supabaseClient(): SupabaseClient {
        return this._supabaseClient;
    }

    public get user(): User | null {
        return this.supabaseClient.auth.user();
    }

    public async signoutAsync(): Promise<void> {
        if (this.user) {
            await this.supabaseClient.auth.signOut();
        }
    }
}

export default new AuthService();