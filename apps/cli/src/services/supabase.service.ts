import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import ConfigService, { Config, SupabaseConfig } from "./config.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Subscription } from "@supabase/gotrue-js/dist/main";
import { Service } from "../service";

class SupabaseService extends Service {
  private _supabaseClient: SupabaseClient | undefined;
  private _sessionBehaviorSubject: BehaviorSubject<Session | null>;

  constructor() {
    super();
    this._sessionBehaviorSubject = new BehaviorSubject<Session | null>(null);
  }

  public get session(): Session | null {
    return this._sessionBehaviorSubject.getValue();
  }

  public get sessionObservable(): Observable<Session | null> {
    return this._sessionBehaviorSubject.asObservable();
  }

  public get supabaseClient(): SupabaseClient | undefined {
    return this._supabaseClient;
  }

  public override initialize(config: Config): void {
    super.initialize(config);

    this._supabaseClient = createClient(
      config.supabase.url,
      config.supabase.anon_key,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      },
    );
  }

  public subscribeToAuthStateChanged(
    callback?: (event: AuthChangeEvent, session: Session | null) => void,
  ): Subscription | undefined {
    const object = this._supabaseClient?.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        callback?.(event, session);
        this.onAuthStateChanged(event, session);
      },
    );
    return object?.data.subscription;
  }

  public async setSessionAsync(
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    this.supabaseClient?.realtime.setAuth(accessToken);
    await this.supabaseClient?.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
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
    session: Session | null,
  ): Promise<void> {
    if (
      event === "SIGNED_IN" ||
      event === "INITIAL_SESSION" ||
      event === "TOKEN_REFRESHED"
    ) {
      if (!session) {
        return;
      }

      this._sessionBehaviorSubject.next(session);
    }
  }
}

export default new SupabaseService();
