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
import LogflareService from './logflare.service';
import SupabaseService from './supabase.service';

export default class AccountService extends Service {
  @observable
  public activeAccount!: AccountResponse | null;
  @observable
  public accounts!: AccountResponse[];
  constructor(
    private readonly _supabaseService: SupabaseService,
    private readonly _logflareService: LogflareService,
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
    supabaseId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountResponse> {
    try {
      const response = await fetch(
        `${this.endpointUrl}/account/${supabaseId}`,
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

      const accountResponse = AccountResponse.fromBinary(arrayBuffer);
      return accountResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAsync(session, supabaseId, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: supabaseId,
          },
        });
        throw error;
      }
    }
  }

  public async requestAccountsAsync(
    accountIds: string[],
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestAccountsAsync(accountIds, retries - 1, retryDelay);
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

  public async requestCreateAsync(
    session: Session,
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountResponse> {
    try {
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
      if (
        this.activeAccount?.toJsonString() !== accountResponse.toJsonString()
      ) {
        runInAction(() => (this.activeAccount = accountResponse));
      }

      return accountResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestCreateAsync(session, retries - 1, retryDelay);
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

  public async requestExistsAsync(
    username: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountExistsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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

      const accountExistsResponse =
        AccountExistsResponse.fromBinary(arrayBuffer);
      return accountExistsResponse;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestExistsAsync(username, retries - 1, retryDelay);
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

  public async requestUpdateActiveAsync(
    props: {
      customerId?: string;
      profileUrl?: string;
      birthday?: string;
      status?: 'Incomplete' | 'Complete';
      username?: string;
      metadata?: string;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountResponse> {
    const supabaseUser = await this._supabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }
    try {
      const account = await this.requestUpdateAsync(supabaseUser.id, props);
      if (this.activeAccount?.toJsonString() !== account.toJsonString()) {
        runInAction(() => (this.activeAccount = account));
      }
      return account;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUpdateActiveAsync(props, retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: supabaseUser.id,
          },
        });
        throw error;
      }
    }
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
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountResponse> {
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestUpdateAsync(
          supabaseId,
          props,
          retries - 1,
          retryDelay
        );
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: supabaseId,
          },
        });
        throw error;
      }
    }
  }

  public async requestActiveDeleteAsync(
    retries = 3,
    retryDelay = 1000
  ): Promise<void> {
    const supabaseUser = await this._supabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }

    try {
      await this.requestDeleteAsync(supabaseUser.id);
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestActiveDeleteAsync(retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        await this._logflareService.requestCreateLog({
          message: error.message,
          metadata: {
            level: 'error',
            stack: error.stack,
            message: error.message,
            status: error.status,
            supabaseId: supabaseUser.id,
          },
        });
        throw error;
      }
    }
  }

  public async requestDeleteAsync(
    supabaseId: string,
    retries = 3,
    retryDelay = 1000
  ): Promise<void> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestDeleteAsync(supabaseId, retries - 1, retryDelay);
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

  public async requestSearchAsync(
    props: {
      queryUsername: string;
      accountId: string;
      offset?: number;
      limit?: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestSearchAsync(props, retries - 1, retryDelay);
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

  public async requestFollowersSearchAsync(
    props: {
      queryUsername: string;
      accountId: string;
      offset?: number;
      limit?: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestFollowersSearchAsync(props, retries - 1, retryDelay);
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

  public async requestFollowingSearchAsync(
    props: {
      queryUsername: string;
      accountId: string;
      offset?: number;
      limit?: number;
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountsResponse> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestFollowingSearchAsync(props, retries - 1, retryDelay);
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

  public async requestPresenceAsync(
    props: {
      accountIds: string[];
    },
    retries = 3,
    retryDelay = 1000
  ): Promise<AccountPresenceResponse[]> {
    const session = await this._supabaseService.requestSessionAsync();
    try {
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
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestPresenceAsync(props, retries - 1, retryDelay);
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
