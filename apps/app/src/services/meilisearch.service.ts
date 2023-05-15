import ConfigService from './config.service';
import { MeiliSearch } from 'meilisearch';

class MeiliSearchService {
  private readonly _client: MeiliSearch;

  constructor() {
    this._client = new MeiliSearch({
      host: ConfigService.meilisearch.url,
      apiKey: ConfigService.meilisearch.key,
    });
  }

  public get client(): MeiliSearch {
    return this._client;
  }
}

export default new MeiliSearchService();
