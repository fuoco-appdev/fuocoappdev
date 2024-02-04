import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';
import WindowController from '../controllers/window.controller';
import {
  RealtimeChannel,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

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
    client: SupabaseClient<any, 'public', any>,
    accountId: string
  ): void {
    this._realtimeChannel = client
      .channel(`account-notification-${accountId}`)
      .on(
        'broadcast',
        {
          event: 'CREATED',
        },
        (payload: Record<string, any>) => {
          this._notificationCreatedBehaviorSubject.next(payload);
        }
      );
    this._realtimeChannel.subscribe();
  }

  public disposeRealtime(client: SupabaseClient<any, 'public', any>): void {
    if (this._realtimeChannel) {
      client.removeChannel(this._realtimeChannel);
    }
  }

  public async requestUnseenCountAsync(
    accountId: string
  ): Promise<core.AccountNotificationCountResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account-notification/unseen-count/${accountId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountNotificationCountResponse =
      core.AccountNotificationCountResponse.fromBinary(arrayBuffer);
    return accountNotificationCountResponse;
  }
}

export default new AccountNotificationService();
