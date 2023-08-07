import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';
import WindowController from '../controllers/window.controller';
import { Session, User } from '@supabase/supabase-js';

class AccountService extends Service {
  private readonly _activeAccountBehaviorSubject: BehaviorSubject<core.Account | null>;
  private readonly _accountsBehaviorSubject: BehaviorSubject<core.Account[]>;

  constructor() {
    super();

    this._activeAccountBehaviorSubject =
      new BehaviorSubject<core.Account | null>(null);
    this._accountsBehaviorSubject = new BehaviorSubject<core.Account[]>([]);
  }

  public get activeAccountObservable(): Observable<core.Account | null> {
    return this._activeAccountBehaviorSubject.asObservable();
  }

  public get accountsObservable(): Observable<core.Account[]> {
    return this._accountsBehaviorSubject.asObservable();
  }

  public get activeAccount(): core.Account | null {
    return this._activeAccountBehaviorSubject.getValue();
  }

  public clearActiveAccount(): void {
    this._activeAccountBehaviorSubject.next(null);
  }

  public async requestActiveAsync(session: Session): Promise<core.Account> {
    const account = await this.requestAsync(session, session.user.id);
    this._activeAccountBehaviorSubject.next(account);
    return account;
  }

  public async requestAsync(
    session: Session,
    supabaseId: string
  ): Promise<core.Account> {
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

    const accountResponse = core.Account.fromBinary(arrayBuffer);
    return accountResponse;
  }

  public async requestAllAsync(): Promise<core.Accounts> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/all`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = core.Accounts.fromBinary(arrayBuffer);
    this._accountsBehaviorSubject.next(accountsResponse.accounts);
    return accountsResponse;
  }

  public async requestAllPublicAsync(): Promise<core.Accounts> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/public/all`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountsResponse = core.Accounts.fromBinary(arrayBuffer);
    this._accountsBehaviorSubject.next(accountsResponse.accounts);
    return accountsResponse;
  }

  public async requestCreateAsync(session: Session): Promise<core.Account> {
    const account = new core.Account({
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

    const accountResponse = core.Account.fromBinary(arrayBuffer);
    this._activeAccountBehaviorSubject.next(accountResponse);

    return accountResponse;
  }

  public async requestUpdateActiveAsync(props: {
    customerId?: string;
    profileUrl?: string;
    status?: 'Incomplete' | 'Complete';
    languageCode?: string;
  }): Promise<core.Account> {
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
    }
  ): Promise<core.Account> {
    const session = await SupabaseService.requestSessionAsync();
    const user = new core.Account({
      customerId: props.customerId,
      profileUrl: props.profileUrl,
      status: props.status,
      languageCode: props.languageCode,
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

    const accountResponse = core.Account.fromBinary(arrayBuffer);
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
}

export default new AccountService();
