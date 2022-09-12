import { createClient, SupabaseClient } from '@supabase/supabase-js'

class AuthService {
    private readonly _supabaseClient: SupabaseClient;

    constructor() {
        this._supabaseClient = createClient(
            'https://vsejdtreyvcnevkkffiq.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZWpkdHJleXZjbmV2a2tmZmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA0ODYzMDcsImV4cCI6MTk3NjA2MjMwN30.oqbLPY9hpnCYBh28DM-r8pHKmYyvSqNgbFfNlZcjgXU');
    }

    public get supabaseClient(): SupabaseClient {
        return this._supabaseClient;
    }
}

export default new AuthService();