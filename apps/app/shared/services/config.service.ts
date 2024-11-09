import DevelopmentConfig from '../assets/configs/development.config.json';
import ProductionConfig from '../assets/configs/production.config.json';
import { StoreOptions } from '../store-options';

export interface SupabaseConfig {
  url: string;
  functions_url: string;
}

export interface MedusaConfig {
  url: string;
}

export interface MeiliSearchConfig {
  url: string;
}

export interface MapboxConfig {
  style_url: string;
}

export interface S3Config {
  url: string;
  bucket_name: string;
}

export interface DiscordConfig {
  url: string;
}

export default class ConfigService {
  private readonly _supabase!: SupabaseConfig;
  private readonly _medusa!: MedusaConfig;
  private readonly _meiliSearch!: MeiliSearchConfig;
  private readonly _mapbox!: MapboxConfig;
  private readonly _s3!: S3Config;
  private readonly _discord!: DiscordConfig;

  constructor(
    private readonly _mode: string,
    private readonly _host: string,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    if (this._mode === 'development') {
      this._supabase = DevelopmentConfig.supabase;
      this._medusa = DevelopmentConfig.medusa;
      this._meiliSearch = DevelopmentConfig.meilisearch;
      this._mapbox = DevelopmentConfig.mapbox;
      this._s3 = DevelopmentConfig.s3;
      this._discord = DevelopmentConfig.discord;

      if (this._host) {
        this._supabase = {
          url: DevelopmentConfig.supabase.url.replace(
            '{localhost}',
            this._host
          ),
          functions_url: DevelopmentConfig.supabase.functions_url.replace(
            '{localhost}',
            this._host
          ),
        };
        this._medusa = {
          url: DevelopmentConfig.medusa.url.replace('{localhost}', this._host),
        };
        this._meiliSearch = {
          url: DevelopmentConfig.meilisearch.url.replace(
            '{localhost}',
            this._host
          ),
        };
      }
    }
    // eslint-disable-next-line no-empty
    else if (this._mode === 'production') {
      this._supabase = ProductionConfig.supabase;
      this._medusa = ProductionConfig.medusa;
      this._meiliSearch = ProductionConfig.meilisearch;
      this._mapbox = ProductionConfig.mapbox;
      this._s3 = ProductionConfig.s3;
      this._discord = ProductionConfig.discord;
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

  public get discord(): DiscordConfig {
    return this._discord;
  }
}
