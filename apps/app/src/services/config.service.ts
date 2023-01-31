import DevelopmentConfig from '../assets/configs/development.config.json';
import ProductionConfig from '../assets/configs/production.config.json';

export interface SupabaseConfig {
  url: string;
  functions_url: string;
  key: string;
}

class ConfigService {
  private readonly _supabase!: SupabaseConfig;

  constructor() {
    if (process.env['NODE_ENV'] === 'development') {
      this._supabase = DevelopmentConfig.supabase;
    }
    // eslint-disable-next-line no-empty
    else if (process.env['NODE_ENV'] === 'production') {
      this._supabase = ProductionConfig.supabase;
    }
  }

  public get supabase(): SupabaseConfig {
    return this._supabase;
  }
}

export default new ConfigService();
