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
import LogflareService from './logflare.service';
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
    private readonly _logflareService: LogflareService,
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

  public async requestNotificationsAsync(
    props: {
      accountId: string;
      limit: number;
      offset: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountNotificationsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
      const request = new AccountNotificationsRequest({
        accountId: props.accountId,
        limit: props.limit,
        offset: props.offset,
      });
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestNotificationsAsync(props, retries - 1, retryDelay);
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

  public async requestUnseenCountAsync(
    accountId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountNotificationCountResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUnseenCountAsync(accountId, retries - 1, retryDelay);
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

  public async requestUpdateSeenAsync(
    accountId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountNotificationCountResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUpdateSeenAsync(accountId, retries - 1, retryDelay);
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
