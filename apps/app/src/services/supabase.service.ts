import {
  createClient,
  SupabaseClient,
  User,
  Session,
  AuthChangeEvent,
} from '@supabase/supabase-js';
import ConfigService from './config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from '@supabase/gotrue-js/dist/main';

class SupabaseService {
  private _supabaseClient: SupabaseClient | undefined;
  private _supabaseClientBehaviorSubject: BehaviorSubject<
    SupabaseClient | undefined
  >;
  private _userBehaviorSubject: BehaviorSubject<User | null>;
  private _sessionBehaviorSubject: BehaviorSubject<Session | null>;
  private _anonKey: string | undefined;

  constructor() {
    this._supabaseClientBehaviorSubject = new BehaviorSubject<
      SupabaseClient | undefined
    >(undefined);
    this._userBehaviorSubject = new BehaviorSubject<User | null>(null);
    this._sessionBehaviorSubject = new BehaviorSubject<Session | null>(null);
  }

  public get user(): User | null {
    return this._userBehaviorSubject.getValue();
  }

  public get session(): Session | null {
    return this._sessionBehaviorSubject.getValue();
  }

  public get supabaseClientObservable(): Observable<
    SupabaseClient | undefined
  > {
    return this._supabaseClientBehaviorSubject.asObservable();
  }

  public get userObservable(): Observable<User | null> {
    return this._userBehaviorSubject.asObservable();
  }

  public get sessionObservable(): Observable<Session | null> {
    return this._sessionBehaviorSubject.asObservable();
  }

  public get supabaseClient(): SupabaseClient | undefined {
    return this._supabaseClient;
  }

  public get anonKey(): string | undefined {
    return this._anonKey;
  }

  public async initializeSupabase(): Promise<void> {
    this._anonKey = process.env['SUPABASE_ANON_KEY'] ?? '';
    this._supabaseClient = createClient(
      ConfigService.supabase.url,
      this._anonKey
    );

    this._supabaseClientBehaviorSubject.next(this._supabaseClient);
  }

  public subscribeToAuthStateChanged(
    callback?: (event: AuthChangeEvent, session: Session | null) => void
  ): Subscription | undefined {
    const object = this._supabaseClient?.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        callback?.(event, session);
        this.onAuthStateChanged(event, session);
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
        this._userBehaviorSubject.next(userResponse?.data.user ?? null);
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

    if (this.session !== sessionResponse?.data?.session) {
      this._sessionBehaviorSubject.next(sessionResponse?.data?.session ?? null);
    }

    return sessionResponse?.data?.session ?? null;
  }

  public async signoutAsync(): Promise<void> {
    const response = await this.supabaseClient?.auth.signOut();
    if (response?.error) {
      throw response?.error;
    }
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

      this._sessionBehaviorSubject.next(session);
      if (
        this.user?.id !== session.user.id &&
        this.user?.updated_at !== session.user.updated_at
      ) {
        this._userBehaviorSubject.next(session.user);
      }
    }
  }
}

export default new SupabaseService();
