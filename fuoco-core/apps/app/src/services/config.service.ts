import DevelopmentConfig from '../assets/configs/development.config.json';

export interface SupabaseConfig {
    url: string;
    key: string;
}

class ConfigService {
    private readonly _supabase!: SupabaseConfig;

    constructor() {
        if (process.env['NODE_ENV'] === "development") {
            this._supabase = DevelopmentConfig.superbase;
        }
        // eslint-disable-next-line no-empty
        else if (process.env['NODE_ENV'] === "production") {}
    }

    public get supabase(): SupabaseConfig {
        return this._supabase;
    }
}

export default new ConfigService();