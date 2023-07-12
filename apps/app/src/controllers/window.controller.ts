/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { WindowModel } from '../models/window.model';
import { RoutePaths } from '../route-paths';
import SupabaseService from '../services/supabase.service';
import { Location } from 'react-router-dom';
import * as core from '../protobuf/core_pb';
import { LanguageCode, ToastProps } from '@fuoco.appdev/core-ui';
import AccountService from '../services/account.service';
import CartController from './cart.controller';
import { Cart } from '@medusajs/medusa';
import { select } from '@ngneat/elf';
import SecretsService from '../services/secrets.service';
import BucketService from '../services/bucket.service';

class WindowController extends Controller {
  private readonly _model: WindowModel;
  private _scrollRef: HTMLDivElement | null;
  private _accountSubscription: Subscription | undefined;
  private _cartSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WindowModel();
    this._scrollRef = null;

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.onCartChanged = this.onCartChanged.bind(this);
    this.onActiveAccountChanged = this.onActiveAccountChanged.bind(this);

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

  public override initialize(renderCount: number): void {
    this._cartSubscription = CartController.model.store
      .pipe(select((model) => model.cart))
      .subscribe({ next: this.onCartChanged });

    this._accountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: this.onActiveAccountChanged,
      });
  }

  public override dispose(renderCount: number): void {
    this._accountSubscription?.unsubscribe();
    this._cartSubscription?.unsubscribe();
  }

  public async checkUserIsAuthenticatedAsync(): Promise<void> {
    try {
      this._model.isLoading = true;
      await SupabaseService.requestUserAsync();
      this._model.isLoading = false;
    } catch (error: any) {
      console.error(error);
      this._model.isLoading = false;
    }
  }

  public updateIsLoading(value: boolean): void {
    this._model.isLoading = value;
  }

  public updateAuthState(value: AuthChangeEvent): void {
    this._model.authState = value;
  }

  public addToast(toast: ToastProps | undefined): void {
    this._model.toast = toast;
  }

  public updateLanguage(language: LanguageCode): void {
    this._model.language = language;
  }

  public updateCurrentPosition(value: GeolocationPosition) {
    this._model.currentPosition = value;
  }

  public updateOnLocationChanged(location: Location): void {
    if (location.pathname === RoutePaths.Home) {
      this._model.activeRoute = RoutePaths.Home;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.Store) {
      this._model.activeRoute = RoutePaths.Store;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname.startsWith(`${RoutePaths.Store}/`)) {
      this._model.activeRoute = RoutePaths.StoreWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.Events) {
      this._model.activeRoute = RoutePaths.Events;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.Cart) {
      this._model.activeRoute = RoutePaths.Cart;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.Checkout) {
      this._model.activeRoute = RoutePaths.Checkout;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePaths.Signin) {
      this._model.activeRoute = RoutePaths.Signin;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.Signup) {
      this._model.activeRoute = RoutePaths.Signup;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.ForgotPassword) {
      this._model.activeRoute = RoutePaths.ForgotPassword;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.ResetPassword) {
      this._model.activeRoute = RoutePaths.ResetPassword;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.TermsOfService) {
      this._model.activeRoute = RoutePaths.TermsOfService;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.PrivacyPolicy) {
      this._model.activeRoute = RoutePaths.PrivacyPolicy;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePaths.Account) {
      this._model.activeRoute = RoutePaths.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname.startsWith(`${RoutePaths.OrderConfirmed}/`)) {
      this._model.activeRoute = RoutePaths.OrderConfirmedWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    }
  }

  private onCartChanged(
    value: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
  ): void {
    this._model.cartCount = value?.items.length ?? 0;
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null
  ): Promise<void> {
    if (event === 'SIGNED_IN') {
      if (!session) {
        return;
      }

      const account = await this.requestActiveAccountAsync(session);
      if (account) {
        await this.requestSecretsAsync(session);

        this._model.isAuthenticated = true;
      } else {
        this._model.isAuthenticated = false;
      }
    } else if (event === 'SIGNED_OUT') {
      AccountService.clearActiveAccount();
      this._model.isAuthenticated = false;
    } else {
      AccountService.clearActiveAccount();
      this._model.isAuthenticated = false;
    }

    this._model.authState = event;
    this._model.isLoading = false;
  }

  private onActiveAccountChanged(value: core.Account | null): void {
    this._model.account = value;
  }

  private async requestActiveAccountAsync(
    session: Session
  ): Promise<core.Account | null> {
    try {
      return await AccountService.requestActiveAsync(session);
    } catch (error: any) {
      if (error.status !== 404) {
        console.error(error);
        return null;
      }

      try {
        return await AccountService.requestCreateAsync(session);
      } catch (error: any) {
        this.addToast({
          key: `active-account-${Math.random()}`,
          message: error.name,
          description: error.message,
          type: 'error',
        });
        return null;
      }
    }
  }

  private async requestSecretsAsync(session: Session): Promise<void> {
    try {
      const secrets = await SecretsService.requestAllAsync(session);
      BucketService.initializeS3(
        secrets.s3AccessKeyId,
        secrets.s3SecretAccessKey
      );
    } catch (error: any) {
      this.addToast({
        key: `secrets-${Math.random()}`,
        message: error.name,
        description: error.message,
        type: 'error',
      });
    }
  }
}

export default new WindowController();
