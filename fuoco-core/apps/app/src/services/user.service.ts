/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-throw-literal */
import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import AuthService from './auth.service';
import axios, { AxiosError } from 'axios';
import { Strings } from '../localization';

class UserService extends Service {
  private readonly _activeUserBehaviorSubject: BehaviorSubject<core.User | null>;
  private readonly _usersBehaviorSubject: BehaviorSubject<core.User[]>;

  constructor() {
    super();

    this._activeUserBehaviorSubject = new BehaviorSubject<core.User | null>(
      null
    );
    this._usersBehaviorSubject = new BehaviorSubject<core.User[]>([]);
  }

  public get activeUserObservable(): Observable<core.User | null> {
    return this._activeUserBehaviorSubject.asObservable();
  }

  public get usersObservable(): Observable<core.User[]> {
    return this._usersBehaviorSubject.asObservable();
  }

  public get activeUser(): core.User | null {
    return this._activeUserBehaviorSubject.getValue();
  }

  public clearActiveUser(): void {
    this._activeUserBehaviorSubject.next(null);
  }

  public async requestActiveAsync(): Promise<core.User> {
    const supabaseUser = AuthService.supabaseClient.auth.user();
    if (!supabaseUser) {
      throw new Error('No authenticated user');
    }
    const user = await this.requestAsync(supabaseUser.id);
    this._activeUserBehaviorSubject.next(user);
    return user;
  }

  public async requestAsync(supabaseId: string): Promise<core.User> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    return userResponse;
  }

  public async requestAllAsync(): Promise<core.Users> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/all`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const usersResponse = core.Users.fromBinary(arrayBuffer);
    this._usersBehaviorSubject.next(usersResponse.users);
    return usersResponse;
  }

  public async requestCreateAsync(): Promise<core.User> {
    const supabaseUser = AuthService.supabaseClient.auth.user();
    if (!supabaseUser) {
      throw new Error('No authenticated user');
    }

    const user = new core.User({
      role: core.UserRole.USER,
      email: supabaseUser.email,
      requestStatus: core.UserRequestStatus.IDLE,
      language: Strings.getLanguage(),
    });

    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/create`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: user.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    this._activeUserBehaviorSubject.next(userResponse);

    return userResponse;
  }

  public async requestGettingStartedAsync(props: {
    company: string;
    phone_number: string;
    comment: string;
  }): Promise<core.User> {
    const gettingStartedRequest = new core.GettingStartedRequest(props);
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/getting-started`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: gettingStartedRequest.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    this._activeUserBehaviorSubject.next(userResponse);

    return userResponse;
  }

  public async requestUpdateActiveAsync(props: {
    company?: string;
    email?: string;
    phone_number?: string;
    location?: [number, number];
    language?: string;
    request_status?: core.UserRequestStatus;
  }): Promise<core.User> {
    const supabaseUser = AuthService.supabaseClient.auth.user();
    if (!supabaseUser) {
      throw new Error('No authenticated user');
    }
    const user = await this.requestUpdateAsync(supabaseUser.id, props);
    this._activeUserBehaviorSubject.next(user);
    return user;
  }

  public async requestUpdateAsync(
    supabaseId: string,
    props: {
      company?: string;
      email?: string;
      phone_number?: string;
      location?: [number, number];
      language?: string;
      request_status?: core.UserRequestStatus;
    }
  ): Promise<core.User> {
    const user = new core.User({
      company: props.company ? props.company : this.activeUser?.company,
      email: props.email ? props.email : this.activeUser?.email,
      phoneNumber: props.phone_number
        ? props.phone_number
        : this.activeUser?.phoneNumber,
      location: props.location
        ? new core.Location({
            longitude: String(props.location[0]),
            latitude: String(props.location[1]),
          })
        : this.activeUser?.location,
      language: props.language ? props.language : this.activeUser?.language,
      requestStatus: props.request_status
        ? props.request_status
        : this.activeUser?.requestStatus,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/update/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: user.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    return userResponse;
  }

  public async requestDeleteAsync(supabaseId: string): Promise<core.User> {
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/delete/${supabaseId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${
          AuthService.supabaseClient.auth.session()?.access_token
        }`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    return userResponse;
  }
}

export default new UserService();
