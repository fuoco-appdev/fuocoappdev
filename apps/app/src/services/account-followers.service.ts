import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';
import WindowController from '../controllers/window.controller';
import { Session, User } from '@supabase/supabase-js';

class AccountFollowersService extends Service {
  constructor() {
    super();
  }

  public async requestCountMetadataAsync(
    accountId: string
  ): Promise<core.AccountFollowerCountMetadataResponse> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-followers/count-metadata/${accountId}`,
      headers: {
        ...this.headers,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerCountMetadataResponse =
      core.AccountFollowerCountMetadataResponse.fromBinary(arrayBuffer);
    return accountFollowerCountMetadataResponse;
  }

  public async requestFollowersAsync(props: {
    accountId: string;
    otherAccountIds: string[];
  }): Promise<core.AccountFollowersResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowersRequest = new core.AccountFollowersRequest({
      accountId: props.accountId,
      otherAccountIds: props.otherAccountIds,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-followers/followers`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: accountFollowersRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowersResponse =
      core.AccountFollowersResponse.fromBinary(arrayBuffer);

    return accountFollowersResponse;
  }

  public async requestFollowerRequestsAsync(props: {
    accountId: string;
    offset: number;
    limit: number;
  }): Promise<core.AccountFollowersResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequestsRequest =
      new core.AccountFollowerRequestsRequest({
        accountId: props.accountId,
        offset: props.offset,
        limit: props.limit,
      });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-followers/requests`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: accountFollowerRequestsRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowersResponse =
      core.AccountFollowersResponse.fromBinary(arrayBuffer);

    return accountFollowersResponse;
  }

  public async requestAddAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<core.AccountFollowerResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequest = new core.AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-followers/add`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: accountFollowerRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse =
      core.AccountFollowerResponse.fromBinary(arrayBuffer);

    return accountFollowerResponse;
  }

  public async requestRemoveAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<core.AccountFollowerResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequest = new core.AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-followers/remove`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: accountFollowerRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse =
      core.AccountFollowerResponse.fromBinary(arrayBuffer);

    return accountFollowerResponse;
  }

  public async requestConfirmAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<core.AccountFollowerResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequest = new core.AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-followers/confirm`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: accountFollowerRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse =
      core.AccountFollowerResponse.fromBinary(arrayBuffer);

    return accountFollowerResponse;
  }
}

export default new AccountFollowersService();
