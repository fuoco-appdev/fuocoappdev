import { Service } from "../service";
import { BehaviorSubject, Observable } from "rxjs";
import SupabaseService from "./supabase.service";
import axios, { AxiosError } from "axios";
import WindowController from "../controllers/window.controller";
import { Session, User } from "@supabase/supabase-js";
import {
  AccountFollowerCountMetadataResponse,
  AccountFollowerRequest,
  AccountFollowerRequestsRequest,
  AccountFollowerResponse,
  AccountFollowersRequest,
  AccountFollowersResponse,
} from "../protobuf/account-follower_pb";

class AccountFollowersService extends Service {
  constructor() {
    super();
  }

  public async requestCountMetadataAsync(
    accountId: string,
  ): Promise<AccountFollowerCountMetadataResponse> {
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-followers/count-metadata/${accountId}`,
      headers: {
        ...this.headers,
      },
      data: "",
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerCountMetadataResponse =
      AccountFollowerCountMetadataResponse.fromBinary(arrayBuffer);
    return accountFollowerCountMetadataResponse;
  }

  public async requestFollowersAsync(props: {
    accountId: string;
    otherAccountIds: string[];
  }): Promise<AccountFollowersResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowersRequest = new AccountFollowersRequest({
      accountId: props.accountId,
      otherAccountIds: props.otherAccountIds,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-followers/followers`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: accountFollowersRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowersResponse = AccountFollowersResponse.fromBinary(
      arrayBuffer,
    );

    return accountFollowersResponse;
  }

  public async requestFollowerRequestsAsync(props: {
    accountId: string;
    offset: number;
    limit: number;
  }): Promise<AccountFollowersResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequestsRequest = new AccountFollowerRequestsRequest({
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-followers/requests`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: accountFollowerRequestsRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowersResponse = AccountFollowersResponse.fromBinary(
      arrayBuffer,
    );

    return accountFollowersResponse;
  }

  public async requestAddAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<AccountFollowerResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequest = new AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-followers/add`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: accountFollowerRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse = AccountFollowerResponse.fromBinary(
      arrayBuffer,
    );

    return accountFollowerResponse;
  }

  public async requestRemoveAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<AccountFollowerResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequest = new AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-followers/remove`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: accountFollowerRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse = AccountFollowerResponse.fromBinary(
      arrayBuffer,
    );

    return accountFollowerResponse;
  }

  public async requestConfirmAsync(props: {
    accountId: string;
    followerId: string;
  }): Promise<AccountFollowerResponse | null> {
    const session = await SupabaseService.requestSessionAsync();
    const accountFollowerRequest = new AccountFollowerRequest({
      accountId: props.accountId,
      followerId: props.followerId,
    });
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-followers/confirm`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: accountFollowerRequest.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountFollowerResponse = AccountFollowerResponse.fromBinary(
      arrayBuffer,
    );

    return accountFollowerResponse;
  }
}

export default new AccountFollowersService();
