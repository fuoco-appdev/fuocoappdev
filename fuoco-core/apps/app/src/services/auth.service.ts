import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import ConfigService from './config.service';

class AuthService {
  private _supabaseClient!: SupabaseClient;
  private _user: User | null;
  private _session: Session | null;

  constructor() {
    this._supabaseClient = createClient(
      ConfigService.supabase.url,
      ConfigService.supabase.key
    );

    this._user = null;
    this._session = null;
  }

  public get user(): User | null {
    return this._user;
  }

  public get session(): Session | null {
    return this._session;
  }

  public get supabaseClient(): SupabaseClient {
    return this._supabaseClient;
  }

  public async requestUser(): Promise<User | null> {
    const { data, error } = await this.supabaseClient.auth.getUser();
    if (error) {
      return null;
    }

    if (this._user !== data.user) {
      this._user = data.user;
    }

    return data.user;
  }

  public async requestSession(): Promise<Session | null> {
    const { data, error } = await this.supabaseClient.auth.getSession();
    if (error) {
      throw error;
    }

    if (this._session !== data?.session) {
      this._session = data?.session;
    }

    return data?.session;
  }

  public async signoutAsync(): Promise<void> {
    const { error } = await this.supabaseClient.auth.signOut();
    if (error) {
      throw error;
    }

    this._session = null;
    this._user = null;
  }
}

export default new AuthService();
