import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

class MeiliSearchService {
  private _url: string | undefined;
  private _apiKey: string | undefined;
  constructor() {
    this._url = Deno.env.get('MEILISEARCH_URL');
    this._apiKey = Deno.env.get('MEILISEARCH_MASTER_KEY');
    if (!this._url) {
      throw new Error("MEILISEARCH_URL doesn't exist");
    }
    if (!this._apiKey) {
      throw new Error("MEILISEARCH_MASTER_KEY doesn't exist");
    }
  }

  public async createIndexAsync(indexName: string): Promise<{
    uid: string;
    createdAt: string;
    updatedAt: string;
    primaryKey: string;
  } | null> {
    try {
      const response = await axiod.post(
        `${this._url}/indexes`,
        {
          uid: indexName,
          primaryKey: 'id',
        },
        {
          headers: {
            Authorization: `Bearer ${this._apiKey}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async getIndexAsync(indexName: string): Promise<{
    uid: string;
    createdAt: string;
    updatedAt: string;
    primaryKey: string;
  } | null> {
    try {
      const response = await axiod.get(`${this._url}/indexes/${indexName}`, {
        headers: {
          Authorization: `Bearer ${this._apiKey}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async updateSettingsAsync(
    indexName: string,
    attributes: {
      searchableAttributes: string[];
      displayedAttributes: string[];
      filterableAttributes: string[];
      sortableAttributes: string[];
    }
  ): Promise<object | null> {
    try {
      const response = await axiod.patch(
        `${this._url}/indexes/${indexName}/settings`,
        attributes,
        {
          headers: {
            Authorization: `Bearer ${this._apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async addDocumentAsync(
    indexName: string,
    data: object
  ): Promise<object | null> {
    try {
      const response = await axiod.post(
        `${this._url}/indexes/${indexName}/documents`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this._apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async updateDocumentAsync(
    indexName: string,
    data: object
  ): Promise<object | null> {
    try {
      const response = await axiod.put(
        `${this._url}/indexes/${indexName}/documents`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this._apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async deleteDocumentAsync(
    indexName: string,
    id: string
  ): Promise<object | null> {
    try {
      const response = await axiod.delete(
        `${this._url}/indexes/${indexName}/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this._apiKey}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }
}

export default new MeiliSearchService();
