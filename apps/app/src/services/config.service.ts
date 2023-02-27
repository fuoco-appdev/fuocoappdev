import DevelopmentConfig from '../assets/configs/development.config.json';
import ProductionConfig from '../assets/configs/production.config.json';

export interface SupabaseConfig {
  url: string;
  functions_url: string;
  key: string;
}

export interface MedusaConfig {
  url: string;
  key: string;
}

class ConfigService {
  private readonly _supabase!: SupabaseConfig;
  private readonly _medusa!: MedusaConfig;

  constructor() {
    if (process.env['NODE_ENV'] === 'development') {
      this._supabase = DevelopmentConfig.supabase;
      this._medusa = DevelopmentConfig.medusa;
    }
    // eslint-disable-next-line no-empty
    else if (process.env['NODE_ENV'] === 'production') {
      this._supabase = ProductionConfig.supabase;
      this._medusa = ProductionConfig.medusa;
    }
  }

  public get supabase(): SupabaseConfig {
    return this._supabase;
  }

  public get medusa(): MedusaConfig {
    return this._medusa;
  }
}

export default new ConfigService();
