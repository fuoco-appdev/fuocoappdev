import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import ConfigService from './config.service';

class SupabaseService {
  private readonly _supabaseClient!: SupabaseClient;
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

  public clear(): void {
    this._session = null;
    this._user = null;
  }

  public async requestUserAsync(): Promise<User | null> {
    try {
      const { data, error } = await this.supabaseClient.auth.getUser();
      if (error) {
        return null;
      }

      if (this._user !== data.user) {
        this._user = data.user;
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

    this.clear();
  }
}

export default new SupabaseService();
