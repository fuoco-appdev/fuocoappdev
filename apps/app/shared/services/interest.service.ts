import {
  CreateInterestRequest,
  InterestResponse,
  InterestsRequest,
  InterestsResponse,
  SearchInterestsRequest,
} from '../protobuf/interest_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import LogflareService from './logflare.service';
import SupabaseService from './supabase.service';

export default class InterestService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _logflareService: LogflareService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestFindAsync(
    ids: string[],
    retries = 3,
    retryDelay = 1000
  ): Promise<InterestsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const request = new InterestsRequest({
        ids: ids,
      });
      const response = await fetch(`${this.endpointUrl}/interest/interests`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: request.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const interestsResponse = InterestsResponse.fromBinary(arrayBuffer);
      return interestsResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestFindAsync(ids, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestCreateAsync(
    name: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<InterestResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const request = new CreateInterestRequest({
        name: name,
      });
      const response = await fetch(`${this.endpointUrl}/interest/create`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: request.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const interestResponse = InterestResponse.fromBinary(arrayBuffer);
      return interestResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCreateAsync(name, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestSearchAsync(
    props: {
      query: string;
      limit?: number;
      offset?: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<InterestsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const request = new SearchInterestsRequest({
        query: props.query,
        offset: props.offset,
        limit: props.limit,
      });
      const response = await fetch(`${this.endpointUrl}/interest/search`, {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: request.toBinary(),
      });

      const arrayBuffer = new Uint8Array(await response.arrayBuffer());
      this.assertResponse(arrayBuffer);

      const interestsResponse = InterestsResponse.fromBinary(arrayBuffer);
      return interestsResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSearchAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: session?.user.id,
          },
        });
        throw error;
      }
    }
  }
}
