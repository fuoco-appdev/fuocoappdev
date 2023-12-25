import ConfigService from './config.service';
import { MeiliSearch } from 'meilisearch';

class MeiliSearchService {
  private _client: MeiliSearch | undefined;

  constructor() {}

  public get client(): MeiliSearch | undefined {
    return this._client;
  }

  public initializeMeiliSearch(): void {
    this._client = new MeiliSearch({
      host: ConfigService.meilisearch.url,
      apiKey: process.env['MEILISEARCH_PUBLIC_KEY'] ?? '',
    });
  }
}

export default new MeiliSearchService();
