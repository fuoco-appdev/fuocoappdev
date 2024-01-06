import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';
import WindowController from '../controllers/window.controller';
import { Session, User } from '@supabase/supabase-js';

class AccountService extends Service {
  private readonly _activeAccountBehaviorSubject: BehaviorSubject<core.AccountResponse | null>;
  private readonly _accountsBehaviorSubject: BehaviorSubject<
    core.AccountResponse[]
  >;

  constructor() {
    super();

    this._activeAccountBehaviorSubject =
      new BehaviorSubject<core.AccountResponse | null>(null);
    this._accountsBehaviorSubject = new BehaviorSubject<core.AccountResponse[]>(
      []
    );
  }

  public get activeAccountObservable(): Observable<core.AccountResponse | null> {
    return this._activeAccountBehaviorSubject.asObservable();
  }

  public get accountsObservable(): Observable<core.AccountResponse[]> {
    return this._accountsBehaviorSubject.asObservable();
  }

  public get activeAccount(): core.AccountResponse | null {
    return this._activeAccountBehaviorSubject.getValue();
  }

  public clearActiveAccount(): void {
    this._activeAccountBehaviorSubject.next(null);
  }

  public async requestActiveAsync(
    session: Session
  ): Promise<core.AccountResponse> {
    const account = await this.requestAsync(session, session.user.id);
    this._activeAccountBehaviorSubject.next(account);
    return account;
  }

  public async requestAsync(
    session: Session,
    supabaseId: string
  ): Promise<core.AccountResponse> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountResponse = core.AccountResponse.fromBinary(arrayBuffer);
    return accountResponse;
  }

  public async requestAccountsAsync(
    accountIds: string[]
  ): Promise<core.AccountsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new core.AccountsRequest({
      accountIds: accountIds,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/accounts`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = core.AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }

  public async requestCreateAsync(
    session: Session
  ): Promise<core.AccountResponse> {
    const account = new core.AccountRequest({
      supabaseId: session.user.id,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/create`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: account.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountResponse = core.AccountResponse.fromBinary(arrayBuffer);
    this._activeAccountBehaviorSubject.next(accountResponse);

    return accountResponse;
  }

  public async requestExistsAsync(
    username: string
  ): Promise<core.AccountExistsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new core.AccountExistsRequest({
      username: username,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/exists`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountExistsResponse =
      core.AccountExistsResponse.fromBinary(arrayBuffer);
    return accountExistsResponse;
  }

  public async requestUpdateActiveAsync(props: {
    customerId?: string;
    profileUrl?: string;
    status?: 'Incomplete' | 'Complete';
    languageCode?: string;
    username?: string;
  }): Promise<core.AccountResponse> {
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }

    const account = await this.requestUpdateAsync(supabaseUser.id, props);
    this._activeAccountBehaviorSubject.next(account);
    return account;
  }

  public async requestUpdateAsync(
    supabaseId: string,
    props: {
      customerId?: string;
      profileUrl?: string;
      status?: 'Incomplete' | 'Complete';
      languageCode?: string;
      username?: string;
    }
  ): Promise<core.AccountResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const user = new core.AccountRequest({
      customerId: props.customerId,
      profileUrl: props.profileUrl,
      status: props.status,
      languageCode: props.languageCode,
      username: props.username,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/update/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: user.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountResponse = core.AccountResponse.fromBinary(arrayBuffer);
    return accountResponse;
  }

  public async requestActiveDeleteAsync(): Promise<void> {
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }

    await this.requestDeleteAsync(supabaseUser.id);
  }

  public async requestDeleteAsync(supabaseId: string): Promise<void> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/delete/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
    });

    if (response.status > 400) {
      throw new response.data();
    }
  }

  public async requestSearchAsync(props: {
    queryUsername: string;
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<core.AccountsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new core.AccountLikeRequest({
      queryUsername: props.queryUsername,
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/search`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = core.AccountsResponse.fromBinary(arrayBuffer);
    this._accountsBehaviorSubject.next(accountsResponse.accounts);
    return accountsResponse;
  }

  public async requestFollowersSearchAsync(props: {
    queryUsername: string;
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<core.AccountsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new core.AccountLikeRequest({
      queryUsername: props.queryUsername,
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/followers/search`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = core.AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }

  public async requestFollowingSearchAsync(props: {
    queryUsername: string;
    accountId: string;
    offset?: number;
    limit?: number;
  }): Promise<core.AccountsResponse> {
    const session = await SupabaseService.requestSessionAsync();
    const request = new core.AccountLikeRequest({
      queryUsername: props.queryUsername,
      accountId: props.accountId,
      offset: props.offset,
      limit: props.limit,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/following/search`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: request.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = core.AccountsResponse.fromBinary(arrayBuffer);
    return accountsResponse;
  }
}

export default new AccountService();
