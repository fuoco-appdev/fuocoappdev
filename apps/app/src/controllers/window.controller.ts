/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { WindowModel } from '../models/window.model';
import { RoutePaths } from '../route-paths';
import SupabaseService from '../services/supabase.service';
import { Location as RouterLocation } from 'react-router-dom';
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
  private _sessionSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WindowModel();
    this._scrollRef = null;

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.onCartChanged = this.onCartChanged.bind(this);
    this.onActiveAccountChanged = this.onActiveAccountChanged.bind(this);
    this.onSessionChangedAsync = this.onSessionChangedAsync.bind(this);

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

    this._sessionSubscription = SupabaseService.sessionObservable.subscribe({
      next: this.onSessionChangedAsync,
    });
  }

  public override dispose(renderCount: number): void {
    this._sessionSubscription?.unsubscribe();
    this._accountSubscription?.unsubscribe();
    this._cartSubscription?.unsubscribe();
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

  public updateCurrentPosition(value: GeolocationPosition): void {
    this._model.currentPosition = value;
  }

  public updateLoadedHash(value: string | undefined): void {
    this._model.loadedHash = value;
  }

  public updateOnLocationChanged(location: RouterLocation): void {
    this._model.prevTransitionKeyIndex = this._model.transitionKeyIndex;

    if (location.pathname === RoutePaths.Home) {
      this._model.activeRoute = RoutePaths.Home;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.Store) {
      this._model.activeRoute = RoutePaths.Store;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname.startsWith(`${RoutePaths.Store}/`)) {
      this._model.activeRoute = RoutePaths.StoreWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.Events) {
      this._model.activeRoute = RoutePaths.Events;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.Cart) {
      this._model.activeRoute = RoutePaths.Cart;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.Checkout) {
      this._model.activeRoute = RoutePaths.Checkout;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.Signin) {
      this._model.activeRoute = RoutePaths.Signin;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.Signup) {
      this._model.activeRoute = RoutePaths.Signup;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.ForgotPassword) {
      this._model.activeRoute = RoutePaths.ForgotPassword;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.ResetPassword) {
      this._model.activeRoute = RoutePaths.ResetPassword;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.TermsOfService) {
      this._model.activeRoute = RoutePaths.TermsOfService;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 1;
    } else if (location.pathname === RoutePaths.PrivacyPolicy) {
      this._model.activeRoute = RoutePaths.PrivacyPolicy;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 1;
    } else if (location.pathname === RoutePaths.Account) {
      this._model.activeRoute = RoutePaths.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.AccountOrderHistory) {
      this._model.activeRoute = RoutePaths.AccountOrderHistory;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.AccountAddresses) {
      this._model.activeRoute = RoutePaths.AccountAddresses;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.AccountEdit) {
      this._model.activeRoute = RoutePaths.AccountEdit;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
      this._model.transitionKeyIndex = 0;
    } else if (location.pathname === RoutePaths.AccountSettings) {
      this._model.activeRoute = RoutePaths.AccountSettings;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
      this._model.transitionKeyIndex = 1;
    } else if (location.pathname === RoutePaths.AccountSettingsAccount) {
      this._model.activeRoute = RoutePaths.AccountSettingsAccount;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
      this._model.transitionKeyIndex = 2;
    } else if (location.pathname.startsWith(`${RoutePaths.OrderConfirmed}/`)) {
      this._model.activeRoute = RoutePaths.OrderConfirmedWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
      this._model.transitionKeyIndex = 1;
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
      this._model.isLoading = true;
    }

    this._model.authState = event;
  }

  private async onSessionChangedAsync(value: Session | null): Promise<void> {
    if (!value) {
      AccountService.clearActiveAccount();
      this._model.isAuthenticated = false;
      this._model.isLoading = false;
      return;
    }

    const account = await this.requestActiveAccountAsync(value);
    if (account) {
      await this.requestSecretsAsync(value);

      this._model.isAuthenticated = true;
    } else {
      AccountService.clearActiveAccount();
      this._model.isAuthenticated = false;
    }

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
