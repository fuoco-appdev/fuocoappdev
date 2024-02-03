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
  private postgresChangesSubscription: RealtimeChannel | undefined;
  constructor() {
    super();
  }

  public initialize(client: SupabaseClient<any, 'public', any>): void {
    this.postgresChangesSubscription = client
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'account_notification',
        },
        (payload) => console.log(payload)
      )
      .subscribe();
  }

  public dispose(): void {
    this.postgresChangesSubscription?.unsubscribe();
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
