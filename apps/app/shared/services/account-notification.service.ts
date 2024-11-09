import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import {
  AccountNotificationCountResponse,
  AccountNotificationsRequest,
  AccountNotificationsResponse,
} from '../protobuf/account-notification_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import SupabaseService from './supabase.service';

export interface AccountData {
  id: string;
  customer_id: string;
  profile_url: string;
  username: string;
}

export default class AccountNotificationService extends Service {
  @observable
  public notificationCreated!: Record<string, any>;
  private _realtimeChannel: RealtimeChannel | undefined;

  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
    makeObservable(this);

    runInAction(() => (this.notificationCreated = {}));
  }

  public override dispose(): void {}

  public initializeRealtime(
    client: SupabaseClient<any, 'public', any>,
    accountId: string
  ): void {
    this._realtimeChannel?.unsubscribe();
    this._realtimeChannel = client.channel('db-changes').on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'account_notification',
        filter: `account_id=eq.${accountId}`,
      },
      (payload: Record<string, any>) => {
        runInAction(() => (this.notificationCreated = payload));
      }
    );
    this._realtimeChannel.subscribe((status, error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  public disposeRealtime(client: SupabaseClient<any, 'public', any>): void {
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
    const session = await this._supabaseService.requestSessionAsync();
    const response = await fetch(
      `${this.endpointUrl}/account-notification/notifications`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: request.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountNotificationsResponse =
      AccountNotificationsResponse.fromBinary(arrayBuffer);
    return accountNotificationsResponse;
  }

  public async requestUnseenCountAsync(
    accountId: string
  ): Promise<AccountNotificationCountResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const response = await fetch(
      `${this.endpointUrl}/account-notification/unseen-count/${accountId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: '',
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountNotificationCountResponse =
      AccountNotificationCountResponse.fromBinary(arrayBuffer);
    return accountNotificationCountResponse;
  }

  public async requestUpdateSeenAsync(
    accountId: string
  ): Promise<AccountNotificationCountResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const response = await fetch(
      `${this.endpointUrl}/account-notification/seen-all/${accountId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: '',
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountNotificationCountResponse =
      AccountNotificationCountResponse.fromBinary(arrayBuffer);
    return accountNotificationCountResponse;
  }
}
