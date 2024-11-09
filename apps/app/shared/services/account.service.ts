import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import {
  AccountExistsRequest,
  AccountExistsResponse,
  AccountLikeRequest,
  AccountPresenceRequest,
  AccountPresenceResponse,
  AccountPresencesResponse,
  AccountRequest,
  AccountResponse,
  AccountsRequest,
  AccountsResponse,
} from '../protobuf/account_pb';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';
import SupabaseService from './supabase.service';

export default class AccountService extends Service {
  @observable
  public activeAccount!: AccountResponse | null;
  @observable
  public accounts!: AccountResponse[];
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _configService: ConfigService,
    private readonly _supabaseAnonKey: string,
    private readonly _storeOptions: StoreOptions
  ) {
    super(_configService, _supabaseAnonKey, _storeOptions);
    makeObservable(this);

    runInAction(() => {
      this.activeAccount = null;
      this.accounts = [];
    });
  }

  public override dispose(): void {}

  public clearActiveAccount(): void {
    runInAction(() => (this.activeAccount = null));
  }

  public async requestActiveAsync(session: Session): Promise<AccountResponse> {
    const account = await this.requestAsync(session, session.user.id);
    runInAction(() => (this.activeAccount = account));
    return account;
  }

  public async requestAsync(
    session: Session,
    supabaseId: string
  ): Promise<AccountResponse> {
    const response = await fetch(`${this.endpointUrl}/account/${supabaseId}`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: '',
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountResponse = AccountResponse.fromBinary(arrayBuffer);
    return accountResponse;
  }

  public async requestAccountsAsync(
    accountIds: string[]
  ): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new AccountsRequest({
      accountIds: accountIds,
    });
    const response = await fetch(`${this.endpointUrl}/account/accounts`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: request.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountsResponse = AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }

  public async requestCreateAsync(session: Session): Promise<AccountResponse> {
    const account = new AccountRequest({
      supabaseId: session.user.id,
    });
    const response = await fetch(`${this.endpointUrl}/account/create`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: account.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountResponse = AccountResponse.fromBinary(arrayBuffer);
    if (this.activeAccount?.toJsonString() !== accountResponse.toJsonString()) {
      runInAction(() => (this.activeAccount = accountResponse));
    }

    return accountResponse;
  }

  public async requestExistsAsync(
    username: string
  ): Promise<AccountExistsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new AccountExistsRequest({
      username: username,
    });
    const response = await fetch(`${this.endpointUrl}/account/exists`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: request.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountExistsResponse = AccountExistsResponse.fromBinary(arrayBuffer);
    return accountExistsResponse;
  }

  public async requestUpdateActiveAsync(props: {
    customerId?: string;
    profileUrl?: string;
    birthday?: string;
    status?: 'Incomplete' | 'Complete';
    username?: string;
    metadata?: string;
  }): Promise<AccountResponse> {
    const supabaseUser = await this._supabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }

    const account = await this.requestUpdateAsync(supabaseUser.id, props);
    if (this.activeAccount?.toJsonString() !== account.toJsonString()) {
      runInAction(() => (this.activeAccount = account));
    }
    return account;
  }

  public async requestUpdateAsync(
    supabaseId: string,
    props: {
      customerId?: string;
      profileUrl?: string;
      status?: 'Incomplete' | 'Complete';
      username?: string;
      birthday?: string;
      metadata?: string;
    }
  ): Promise<AccountResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const user = new AccountRequest({
      customerId: props.customerId,
      profileUrl: props.profileUrl,
      status: props.status,
      username: props.username,
      birthday: props.birthday,
      metadata: props.metadata,
    });

    const response = await fetch(
      `${this.endpointUrl}/account/update/${supabaseId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: user.toBinary(),
      }
    );

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountResponse = AccountResponse.fromBinary(arrayBuffer);
    return accountResponse;
  }

  public async requestActiveDeleteAsync(): Promise<void> {
    const supabaseUser = await this._supabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }

    await this.requestDeleteAsync(supabaseUser.id);
  }

  public async requestDeleteAsync(supabaseId: string): Promise<void> {
    const session = await this._supabaseService.requestSessionAsync();
    const response = await fetch(
      `${this.endpointUrl}/account/delete/${supabaseId}`,
      {
        method: 'post',
        headers: {
          ...this.headers,
          'Session-Token': `${session?.access_token}`,
        },
        body: '',
      }
    );

    if (response.status > 400) {
      throw await response.text();
    }
  }

  public async requestSearchAsync(props: {
    queryUsername: string;
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new AccountLikeRequest({
      queryUsername: props.queryUsername,
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await fetch(`${this.endpointUrl}/account/search`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: request.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountsResponse = AccountsResponse.fromBinary(arrayBuffer);
    runInAction(() => (this.accounts = accountsResponse.accounts));
    return accountsResponse;
  }

  public async requestFollowersSearchAsync(props: {
    queryUsername: string;
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new AccountLikeRequest({
      queryUsername: props.queryUsername,
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await fetch(
      `${this.endpointUrl}/account/followers/search`,
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

    const accountsResponse = AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }

  public async requestFollowingSearchAsync(props: {
    queryUsername: string;
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new AccountLikeRequest({
      queryUsername: props.queryUsername,
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await fetch(
      `${this.endpointUrl}/account/following/search`,
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

    const accountsResponse = AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }

  public async requestPresenceAsync(props: {
    accountIds: string[];
  }): Promise<AccountPresenceResponse[]> {
    const session = await this._supabaseService.requestSessionAsync();
    const request = new AccountPresenceRequest({
      accountIds: props.accountIds,
    });
    const response = await fetch(`${this.endpointUrl}/account/presence`, {
      method: 'post',
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      body: request.toBinary(),
    });

    const arrayBuffer = new Uint8Array(await response.arrayBuffer());
    this.assertResponse(arrayBuffer);

    const accountPresencesResponse =
      AccountPresencesResponse.fromBinary(arrayBuffer);
    return accountPresencesResponse.accountPresences;
  }

  public async requestUpsertAccountPresenceAsync(
    accountId: string,
    isOnline: boolean
  ): Promise<void> {
    const date = new Date(Date.now());
    const response = await this._supabaseService.supabaseClient
      ?.from('account_presence')
      .upsert({
        account_id: accountId,
        is_online: isOnline,
        last_seen: date.toUTCString(),
      });

    if (response?.error) {
      console.error("Can't upsert account presence:", response.error);
    }
  }

  public subscribeAccountPresence(
    accountIds: string[],
    onPayload: (payload: Record<string, any>) => void
  ): RealtimeChannel | undefined {
    return this._supabaseService.supabaseClient
      ?.channel('account-presence-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'account_presence',
          filter: `account_id=in.(${accountIds.join(',')})`,
        },
        onPayload
      )
      .subscribe();
  }
}
