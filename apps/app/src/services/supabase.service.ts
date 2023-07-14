import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import ConfigService from './config.service';
import { BehaviorSubject, Observable } from 'rxjs';

class SupabaseService {
  private readonly _supabaseClient!: SupabaseClient;
  private _userBehaviorSubject: BehaviorSubject<User | null>;
  private _sessionBehaviorSubject: BehaviorSubject<Session | null>;

  constructor() {
    this._supabaseClient = createClient(
      ConfigService.supabase.url,
      ConfigService.supabase.key
    );

    this._userBehaviorSubject = new BehaviorSubject<User | null>(null);
    this._sessionBehaviorSubject = new BehaviorSubject<Session | null>(null);
  }

  public get user(): User | null {
    return this._userBehaviorSubject.getValue();
  }

  public get session(): Session | null {
    return this._sessionBehaviorSubject.getValue();
  }

  public get userObservable(): Observable<User | null> {
    return this._userBehaviorSubject.asObservable();
  }

  public get sessionObservable(): Observable<Session | null> {
    return this._sessionBehaviorSubject.asObservable();
  }

  public get supabaseClient(): SupabaseClient {
    return this._supabaseClient;
  }

  public clear(): void {
    this._sessionBehaviorSubject.next(null);
    this._userBehaviorSubject.next(null);
  }

  public async requestUserAsync(): Promise<User | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.getUser();
      if (error) {
        return null;
      }

      if (JSON.stringify(this.user) !== JSON.stringify(data.user)) {
        this._userBehaviorSubject.next(data.user);
      }

      return data.user;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  public async requestSessionAsync(): Promise<Session | null> {
    const { data, error } = await this.supabaseClient.auth.getSession();
    if (error) {
      throw error;
    }

    if (this.session !== data?.session) {
      this._sessionBehaviorSubject.next(data?.session);
    }

    return data?.session;
  }

  public async signoutAsync(): Promise<void> {
    const { error } = await this.supabaseClient.auth.signOut();
    if (error) {
      throw error;
    }

    this.clear();
  }
}

export default new SupabaseService();
