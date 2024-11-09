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
import SupabaseService from './supabase.service';

export default class InterestService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestFindAsync(ids: string[]): Promise<InterestsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
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
  }

  public async requestCreateAsync(name: string): Promise<InterestResponse> {
    const session = await this._supabaseService.requestSessionAsync();
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
  }

  public async requestSearchAsync(props: {
    query: string;
    limit?: number;
    offset?: number;
  }): Promise<InterestsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
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
  }
}
