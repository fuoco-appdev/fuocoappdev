import { MeiliSearch } from 'meilisearch';
import ConfigService from './config.service';

class MeiliSearchService {
  private _client: MeiliSearch | undefined;

  constructor() {}

  public get client(): MeiliSearch | undefined {
    return this._client;
  }

  public initializeMeiliSearch(): void {
    this._client = new MeiliSearch({
      host: ConfigService.meilisearch.url,
      apiKey: import.meta.env['MEILISEARCH_PUBLIC_KEY'] ?? '',
    });
  }
}

export default new MeiliSearchService();
