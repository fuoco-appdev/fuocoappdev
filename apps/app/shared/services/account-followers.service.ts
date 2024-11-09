import {
  AccountFollowerCountMetadataResponse,
  AccountFollowerRequest,
  AccountFollowerRequestsRequest,
  AccountFollowerResponse,
  AccountFollowersRequest,
  AccountFollowersResponse,
} from '../protobuf/account-follower_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import SupabaseService from './supabase.service';

export default class AccountFollowersService extends Service {
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
  }

  public override dispose(): void {}

  public async requestCountMetadataAsync(
    accountId: string
  ): Promise<AccountFollowerCountMetadataResponse> {
    const response = await fetch(
      `${this.endpointUrl}/account-followers/count-metadata/${accountId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
        },
        body: '',
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountFollowerCountMetadataResponse =
      AccountFollowerCountMetadataResponse.fromBinary(arrayBuffer);
    return accountFollowerCountMetadataResponse;
  }

  public async requestFollowersAsync(props: {
    accountId: string;
    otherAccountIds: string[];
  }): Promise<AccountFollowersResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    const accountFollowersRequest = new AccountFollowersRequest({
      accountId: props.accountId,
      otherAccountIds: props.otherAccountIds,
    });
    const response = await fetch(
      `${this.endpointUrl}/account-followers/followers`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: accountFollowersRequest.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountFollowersResponse =
      AccountFollowersResponse.fromBinary(arrayBuffer);

    return accountFollowersResponse;
  }

  public async requestFollowerRequestsAsync(props: {
    accountId: string;
    offset: number;
    limit: number;
  }): Promise<AccountFollowersResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    const accountFollowerRequestsRequest = new AccountFollowerRequestsRequest({
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await fetch(
      `${this.endpointUrl}/account-followers/requests`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: accountFollowerRequestsRequest.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountFollowersResponse =
      AccountFollowersResponse.fromBinary(arrayBuffer);

    return accountFollowersResponse;
  }

  public async requestAddAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<AccountFollowerResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    const accountFollowerRequest = new AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await fetch(`${this.endpointUrl}/account-followers/add`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: accountFollowerRequest.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse =
      AccountFollowerResponse.fromBinary(arrayBuffer);

    return accountFollowerResponse;
  }

  public async requestRemoveAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<AccountFollowerResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    const accountFollowerRequest = new AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await fetch(
      `${this.endpointUrl}/account-followers/remove`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: accountFollowerRequest.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse =
      AccountFollowerResponse.fromBinary(arrayBuffer);

    return accountFollowerResponse;
  }

  public async requestConfirmAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<AccountFollowerResponse | null> {
    const session = await this._supabaseService.requestSessionAsync();
    const accountFollowerRequest = new AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await fetch(
      `${this.endpointUrl}/account-followers/confirm`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: accountFollowerRequest.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse =
      AccountFollowerResponse.fromBinary(arrayBuffer);

    return accountFollowerResponse;
  }
}
