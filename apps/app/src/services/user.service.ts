/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-throw-literal */
import { Service } from '../service';
import * as core from '../protobuf/core_pb';
import { BehaviorSubject, Observable } from 'rxjs';
import SupabaseService from './supabase.service';
import axios, { AxiosError } from 'axios';

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
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      throw new Error('No active user');
    }
    const user = await this.requestAsync(supabaseUser.email ?? '');
    this._activeUserBehaviorSubject.next(user);
    return user;
  }

  public async requestAsync(email: string): Promise<core.User> {
    const session = await SupabaseService.requestSessionAsync();
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/${email}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: '',
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    return userResponse;
  }

  public async requestUpdateActiveAsync(props: {
    email?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<core.User> {
    if (!this.activeUser) {
      throw new Error('No user');
    }

    const user = await this.requestUpdateAsync(this.activeUser.id, props);
    this._activeUserBehaviorSubject.next(user);
    return user;
  }

  public async requestUpdateAsync(
    userId: string,
    props: {
      email?: string;
      firstName?: string;
      lastName?: string;
    }
  ): Promise<core.User> {
    const session = await SupabaseService.requestSessionAsync();
    const user = new core.User({
      email: props.email ? props.email : this.activeUser?.email,
      firstName: props.firstName ? props.firstName : this.activeUser?.firstName,
      lastName: props.lastName ? props.lastName : this.activeUser?.lastName,
    });
    const response = await axios({
      method: 'post',
      url: `${this.endpointUrl}/user/update/${userId}`,
      headers: {
        ...this.headers,
        'Session-Token': `${session?.access_token}`,
      },
      data: user.toBinary(),
      responseType: 'arraybuffer',
    });

    const arrayBuffer = new Uint8Array(response.data);
    this.assertResponse(arrayBuffer);

    const userResponse = core.User.fromBinary(arrayBuffer);
    return userResponse;
  }
}

export default new UserService();
