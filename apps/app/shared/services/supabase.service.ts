import { Subscription } from '@supabase/gotrue-js/dist/main';
import {
  AuthChangeEvent,
  createClient,
  type Session,
  SupabaseClient,
  type User,
} from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Service } from '../service';
import { StoreOptions } from '../store-options';
import ConfigService from './config.service';

export default class SupabaseService extends Service {
  @observable
  public client: SupabaseClient | undefined;
  @observable
  public user!: User | null;
  @observable
  public session!: Session | null;

  constructor(
    private readonly _anonKey: string,
    private readonly _configService: ConfigService,
    private readonly _storeOptions: StoreOptions,
    private _supabaseClient: SupabaseClient
  ) {
    super(_configService, _anonKey, _storeOptions);
    makeObservable(this);

    runInAction(() => {
      this.client = undefined;
      this.user = null;
      this.session = null;
    });
  }

  public get supabaseClient(): SupabaseClient | undefined {
    return this._supabaseClient;
  }

  public get anonKey(): string | undefined {
    return this._anonKey;
  }

  public async initializeSupabase(): Promise<void> {
    if (!this._supabaseClient) {
      this._supabaseClient = createClient(
        this._configService.kong.url,
        this._anonKey
      );
    }

    runInAction(() => {
      this.client = this._supabaseClient;
    });
  }

  public override dispose(): void {}

  public override async requestHealthAsync(
    retries = 1,
    retryDelay = 1000
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this._configService.kong.url}`);
      return response.status <= 401;
    } catch (error: any) {
      if (retries > 0) {
        console.log(`Retry attempt with ${retries} retries left.`, error);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return this.requestHealthAsync(retries - 1, retryDelay);
      } else {
        console.error('Max retries reached. Error:', error);
        return false;
      }
    }
  }

  public subscribeToAuthStateChanged(
    callback?: (event: AuthChangeEvent, session: Session | null) => void
  ): Subscription | undefined {
    const object = this._supabaseClient?.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        this.onAuthStateChanged(event, session);
        callback?.(event, session);
      }
    );
    return object?.data.subscription;
  }

  public async setSessionAsync(
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    this.supabaseClient?.realtime.setAuth(accessToken);
    await this.supabaseClient?.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  public async requestUserAsync(): Promise<User | null> {
    try {
      const userResponse = await this.supabaseClient?.auth.getUser();
      if (userResponse?.error) {
        return null;
      }

      if (
        this.user?.id !== userResponse?.data.user.id &&
        this.user?.updated_at !== userResponse?.data.user.updated_at
      ) {
        runInAction(() => {
          this.user = userResponse?.data.user ?? null;
        });
      }

      return userResponse?.data.user ?? null;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async requestSessionAsync(): Promise<Session | null> {
    const sessionResponse = await this.supabaseClient?.auth.getSession();
    if (sessionResponse?.error) {
      throw sessionResponse?.error;
    }

    return sessionResponse?.data?.session ?? null;
  }

  public async signoutAsync(): Promise<void> {
    const response = await this.supabaseClient?.auth.signOut();
    if (response?.error) {
      throw response?.error;
    }

    runInAction(() => {
      this.session = null;
      this.user = null;
    });
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null
  ): Promise<void> {
    if (
      event === 'SIGNED_IN' ||
      event === 'INITIAL_SESSION' ||
      event === 'TOKEN_REFRESHED'
    ) {
      if (!session) {
        return;
      }

      runInAction(() => {
        this.session = session;
        this.user = session.user;
      });
    }
  }
}
