import DevelopmentConfig from '../assets/configs/development.config.json';
import LocalConfig from '../assets/configs/local.config.json';
import ProductionConfig from '../assets/configs/production.config.json';
import { StoreOptions } from '../store-options';

export interface ApiConfig {
  url: string;
}

export interface KongConfig {
  url: string;
}

export interface LogflareConfig {
  url: string;
  source: string;
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

export interface OpenWebuiConfig {
  url: string;
  text_model: string;
}

export default class ConfigService {
  private readonly _api!: ApiConfig;
  private readonly _kong!: KongConfig;
  private readonly _logflare!: LogflareConfig;
  private readonly _medusa!: MedusaConfig;
  private readonly _meiliSearch!: MeiliSearchConfig;
  private readonly _mapbox!: MapboxConfig;
  private readonly _s3!: S3Config;
  private readonly _openWebui!: OpenWebuiConfig;

  constructor(
    private readonly _mode: string,
    private readonly _host: string,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    if (this._mode === 'local') {
      this._api = LocalConfig.api;
      this._kong = LocalConfig.kong;
      this._logflare = LocalConfig.logflare;
      this._medusa = LocalConfig.medusa;
      this._meiliSearch = LocalConfig.meilisearch;
      this._s3 = LocalConfig.s3;
      this._openWebui = LocalConfig.open_webui;

      if (this._host) {
        this._api = {
          url: LocalConfig.api.url.replace('{localhost}', this._host),
        };
        this._kong = {
          url: LocalConfig.kong.url.replace('{localhost}', this._host),
        };
        this._logflare = {
          url: LocalConfig.logflare.url.replace('{localhost}', this._host),
          source: LocalConfig.logflare.source,
        };
        this._medusa = {
          url: LocalConfig.medusa.url.replace('{localhost}', this._host),
        };
        this._meiliSearch = {
          url: LocalConfig.meilisearch.url.replace('{localhost}', this._host),
        };
        this._openWebui = {
          url: LocalConfig.open_webui.url.replace('{localhost}', this._host),
          text_model: LocalConfig.open_webui.text_model,
        };
      }
    }
    // eslint-disable-next-line no-empty
    else if (this._mode === 'development') {
      this._api = DevelopmentConfig.api;
      this._kong = DevelopmentConfig.kong;
      this._logflare = DevelopmentConfig.logflare;
      this._medusa = DevelopmentConfig.medusa;
      this._meiliSearch = DevelopmentConfig.meilisearch;
      this._mapbox = DevelopmentConfig.mapbox;
      this._s3 = DevelopmentConfig.s3;
      this._openWebui = DevelopmentConfig.open_webui;
    }
    // eslint-disable-next-line no-empty
    else if (this._mode === 'production') {
      this._api = ProductionConfig.api;
      this._kong = ProductionConfig.kong;
      this._logflare = ProductionConfig.logflare;
      this._medusa = ProductionConfig.medusa;
      this._meiliSearch = ProductionConfig.meilisearch;
      this._mapbox = ProductionConfig.mapbox;
      this._s3 = ProductionConfig.s3;
      this._openWebui = ProductionConfig.open_webui;
    }
  }

  public get api(): ApiConfig {
    return this._api;
  }

  public get kong(): KongConfig {
    return this._kong;
  }

  public get logflare(): LogflareConfig {
    return this._logflare;
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

  public get openWebui(): OpenWebuiConfig {
    return this._openWebui;
  }
}
