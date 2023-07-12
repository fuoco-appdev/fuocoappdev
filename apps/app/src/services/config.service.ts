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

export interface MeiliSearchConfig {
  url: string;
  key: string;
}

export interface MapboxConfig {
  style_url: string;
  access_token: string;
}

export interface S3Config {
  url: string;
  bucket_name: string;
}

class ConfigService {
  private readonly _supabase!: SupabaseConfig;
  private readonly _medusa!: MedusaConfig;
  private readonly _meiliSearch!: MeiliSearchConfig;
  private readonly _mapbox!: MapboxConfig;
  private readonly _s3!: S3Config;

  constructor() {
    if (process.env['NODE_ENV'] === 'development') {
      this._supabase = DevelopmentConfig.supabase;
      this._medusa = DevelopmentConfig.medusa;
      this._meiliSearch = DevelopmentConfig.meilisearch;
      this._mapbox = DevelopmentConfig.mapbox;
      this._s3 = DevelopmentConfig.s3;
    }
    // eslint-disable-next-line no-empty
    else if (process.env['NODE_ENV'] === 'production') {
      this._supabase = ProductionConfig.supabase;
      this._medusa = ProductionConfig.medusa;
      this._meiliSearch = ProductionConfig.meilisearch;
      this._mapbox = ProductionConfig.mapbox;
      this._s3 = ProductionConfig.s3;
    }
  }

  public get supabase(): SupabaseConfig {
    return this._supabase;
  }

  public get medusa(): MedusaConfig {
    return this._medusa;
  }

  public get meilisearch(): MeiliSearchConfig {
    return this._meiliSearch;
  }

  public get mapbox(): MapboxConfig {
    return this._mapbox;
  }

  public get s3(): S3Config {
    return this._s3;
  }
}

export default new ConfigService();
