import { MeiliSearch } from 'meilisearch';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';

export default class MeiliSearchService extends Service {
  private _client: MeiliSearch | undefined;

  constructor(
    private readonly _publicKey: string,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public get client(): MeiliSearch | undefined {
    return this._client;
  }

  public initializeMeiliSearch(): void {
    this._client = new MeiliSearch({
      host: this._configService.meilisearch.url,
      apiKey: this._publicKey,
    });
  }

  public override dispose(): void {}
}
