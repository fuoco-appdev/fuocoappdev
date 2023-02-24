import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';
import WindowController from '../controllers/window.controller';

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

  public async requestActiveAsync(): Promise<core.Account> {
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No active user');
    }
    const account = await this.requestAsync(supabaseUser.id);
    this._activeAccountBehaviorSubject.next(account);
    return account;
  }

  public async requestAsync(supabaseId: string): Promise<core.Account> {
    const session = await SupabaseService.requestSessionAsync();
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

  public async requestCreateAsync(): Promise<core.Account> {
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No user');
    }
    const session = await SupabaseService.requestSessionAsync();
    const user = new core.Account({
      requestStatus: core.RequestStatus.IDLE,
      language: WindowController.model.language,
    });

    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/create`,
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
    this._activeAccountBehaviorSubject.next(accountResponse);

    return accountResponse;
  }

  public async requestGettingStartedAsync(props: {
    company: string;
    phoneNumber: string;
    comment: string;
  }): Promise<core.Account> {
    const session = await SupabaseService.requestSessionAsync();
    const gettingStartedRequest = new core.GettingStartedRequest(props);
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/account/getting-started`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: gettingStartedRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const accountResponse = core.Account.fromBinary(arrayBuffer);
    this._activeAccountBehaviorSubject.next(accountResponse);

    return accountResponse;
  }

  public async requestUpdateActiveAsync(props: {
    company?: string;
    phoneNumber?: string;
    location?: [number, number];
    language?: string;
    request_status?: core.RequestStatus;
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
      company?: string;
      phoneNumber?: string;
      location?: [number, number];
      language?: string;
      request_status?: core.RequestStatus;
    }
  ): Promise<core.Account> {
    const session = await SupabaseService.requestSessionAsync();
    const user = new core.Account({
      company: props.company ? props.company : this.activeAccount?.company,
      phoneNumber: props.phoneNumber
        ? props.phoneNumber
        : this.activeAccount?.phoneNumber,
      location: props.location
        ? new core.Location({
            longitude: String(props.location[0]),
            latitude: String(props.location[1]),
          })
        : this.activeAccount?.location,
      language: props.language ? props.language : this.activeAccount?.language,
      requestStatus: props.request_status
        ? props.request_status
        : this.activeAccount?.requestStatus,
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
