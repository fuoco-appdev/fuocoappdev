/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { WindowModel } from '../models/window.model';
import { RoutePaths } from '../route-paths';
import SupabaseService from '../services/supabase.service';
import { Location } from 'react-router-dom';
import * as core from '../protobuf/core_pb';
import { LanguageCode, ToastProps } from '@fuoco.appdev/core-ui';
import AccountService from '../services/account.service';

class WindowController extends Controller {
  private readonly _model: WindowModel;
  private _scrollRef: HTMLDivElement | null;
  private _userSubscription: Subscription | undefined;
  private _customerSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WindowModel();
    this._scrollRef = null;

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

    SupabaseService.supabaseClient.auth.onAuthStateChange(
      this.onAuthStateChanged
    );
  }

  public get model(): WindowModel {
    return this._model;
  }

  public get scrollRef(): HTMLDivElement | null {
    return this._scrollRef;
  }

  public set scrollRef(value: HTMLDivElement | null) {
    if (this._scrollRef !== value) {
      this._scrollRef = value;
    }
  }

  public initialize(): void {}

  public async checkUserIsAuthenticatedAsync(): Promise<void> {
    this._model.isLoading = true;
    const supabaseUser = await SupabaseService.requestUserAsync();
    if (!supabaseUser) {
      this._model.isLoading = false;
    }
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
    this._customerSubscription?.unsubscribe();
  }

  public updateIsLoading(value: boolean): void {
    this._model.isLoading = value;
  }

  public updateAuthState(value: AuthChangeEvent): void {
    this._model.authState = value;
  }

  public updateShowConfirmEmailAlert(show: boolean): void {
    this._model.showConfirmEmailAlert = show;
  }

  public updateShowPasswordResetAlert(show: boolean): void {
    this._model.showPasswordResetAlert = show;
  }

  public updateToasts(toasts: ToastProps[]): void {
    this._model.toasts = toasts;
  }

  public updateLanguage(language: LanguageCode): void {
    this._model.language = language;
  }

  public updateOnLocationChanged(location: Location): void {
    if (location.pathname === RoutePaths.Home) {
      this._model.activeRoute = RoutePaths.Home;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.Store) {
      this._model.activeRoute = RoutePaths.Store;
      this._model.showNavigateBack = false;
    } else if (location.pathname.startsWith(`${RoutePaths.Store}/`)) {
      this._model.activeRoute = RoutePaths.StoreWithId;
      this._model.showNavigateBack = true;
    } else if (location.pathname === RoutePaths.Events) {
      this._model.activeRoute = RoutePaths.Events;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.Cart) {
      this._model.activeRoute = RoutePaths.Cart;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.Signin) {
      this._model.activeRoute = RoutePaths.Signin;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.Signup) {
      this._model.activeRoute = RoutePaths.Signup;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.ForgotPassword) {
      this._model.activeRoute = RoutePaths.ForgotPassword;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.ResetPassword) {
      this._model.activeRoute = RoutePaths.ResetPassword;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.TermsOfService) {
      this._model.activeRoute = RoutePaths.TermsOfService;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.PrivacyPolicy) {
      this._model.activeRoute = RoutePaths.PrivacyPolicy;
      this._model.showNavigateBack = false;
    } else if (location.pathname === RoutePaths.Account) {
      this._model.activeRoute = RoutePaths.Account;
      this._model.showNavigateBack = false;
    }
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null
  ): Promise<void> {
    if (event === 'SIGNED_IN') {
      // Request admin, member or developer
      // const user = await this.requestActiveUserAsync();
      // if (!user) {
      //   // Request customer
      //   const customer = await this.requestActiveCustomerAsync();
      //   if (customer) {
      //     await this.requestActiveAccountAsync(customer.id);
      //   }
      // } else {
      //   await this.requestActiveAccountAsync(user.id);
      // }
    } else if (event === 'SIGNED_OUT') {
      AccountService.clearActiveAccount();
    } else {
      AccountService.clearActiveAccount();
    }

    this._model.authState = event;
    this._model.isLoading = false;
  }

  private async requestActiveAccountAsync(
    userId: string
  ): Promise<core.Account | null> {
    try {
      return await AccountService.requestActiveAsync();
    } catch (error: any) {
      if (error.status !== 404) {
        console.error(error);
        return null;
      }

      try {
        return await AccountService.requestCreateAsync(userId);
      } catch (error: any) {
        console.error(error);
        return null;
      }
    }
  }
}

export default new WindowController();
