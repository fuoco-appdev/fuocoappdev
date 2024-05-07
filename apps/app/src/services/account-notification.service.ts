import {
  RealtimeChannel,
  SupabaseClient
} from "@supabase/supabase-js";
import axios from "axios";
import { BehaviorSubject, Observable } from "rxjs";
import {
  AccountNotificationCountResponse,
  AccountNotificationsRequest,
  AccountNotificationsResponse,
} from "../protobuf/account-notification_pb";
import { Service } from "../service";
import SupabaseService from "./supabase.service";

export interface AccountData {
  id: string;
  customer_id: string;
  profile_url: string;
  username: string;
}

class AccountNotificationService extends Service {
  private readonly _notificationCreatedBehaviorSubject: BehaviorSubject<
    Record<string, any>
  >;
  private _realtimeChannel: RealtimeChannel | undefined;
  constructor() {
    super();

    this._notificationCreatedBehaviorSubject = new BehaviorSubject<
      Record<string, any>
    >({});
  }

  public get notificationCreatedObservable(): Observable<Record<string, any>> {
    return this._notificationCreatedBehaviorSubject.asObservable();
  }

  public initializeRealtime(
    client: SupabaseClient<any, "public", any>,
    accountId: string,
  ): void {
    this._realtimeChannel?.unsubscribe();
    this._realtimeChannel = client
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'account_notification'
        },
        (payload: Record<string, any>) => {
          this._notificationCreatedBehaviorSubject.next(payload);
        },
      );
    this._realtimeChannel.subscribe((status, error) => {
      if (error) {
        console.error(error);
      }

      console.log(status);
    });
  }

  public disposeRealtime(client: SupabaseClient<any, "public", any>): void {
    if (this._realtimeChannel) {
      this._realtimeChannel?.unsubscribe();
    }
  }

  public async requestNotificationsAsync({
    accountId,
    limit,
    offset,
  }: {
    accountId: string;
    limit: number;
    offset: number;
  }): Promise<AccountNotificationsResponse> {
    const request = new AccountNotificationsRequest({
      accountId: accountId,
      limit: limit,
      offset: offset,
    });
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-notification/notifications`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountNotificationsResponse = AccountNotificationsResponse
      .fromBinary(arrayBuffer);
    return accountNotificationsResponse;
  }

  public async requestUnseenCountAsync(
    accountId: string,
  ): Promise<AccountNotificationCountResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-notification/unseen-count/${accountId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: "",
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountNotificationCountResponse = AccountNotificationCountResponse
      .fromBinary(arrayBuffer);
    return accountNotificationCountResponse;
  }

  public async requestUpdateSeenAsync(
    accountId: string,
  ): Promise<AccountNotificationCountResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: "post",
      url: `${this.endpointUrl}/account-notification/seen-all/${accountId}`,
      headers: {
        ...this.headers,
        "Session-Token": `${session?.access_token}`,
      },
      data: "",
      responseType: "arraybuffer",
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountNotificationCountResponse = AccountNotificationCountResponse
      .fromBinary(arrayBuffer);
    return accountNotificationCountResponse;
  }
}

export default new AccountNotificationService();
