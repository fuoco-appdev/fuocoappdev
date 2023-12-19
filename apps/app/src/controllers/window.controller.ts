/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { WindowModel } from '../models/window.model';
import { RoutePathsType } from '../route-paths';
import SupabaseService from '../services/supabase.service';
import { Location as RouterLocation } from 'react-router-dom';
import * as core from '../protobuf/core_pb';
import { ToastProps, LanguageInfo, BannerProps } from '@fuoco.appdev/core-ui';
import AccountService from '../services/account.service';
import CartController from './cart.controller';
import { Cart, CustomerGroup, Customer } from '@medusajs/medusa';
import { select } from '@ngneat/elf';
import SecretsService from '../services/secrets.service';
import BucketService from '../services/bucket.service';
import HomeController from './home.controller';
import { HomeState, InventoryLocation } from 'src/models/home.model';
import AccountController from './account.controller';
import { AccountState } from '../models/account.model';
import MedusaService from '../services/medusa.service';

class WindowController extends Controller {
  private readonly _model: WindowModel;
  private _inventoryLocationsSubscription: Subscription | undefined;
  private _customerGroupSubscription: Subscription | undefined;
  private _scrollRef: HTMLDivElement | null;
  private _accountSubscription: Subscription | undefined;
  private _customerSubscription: Subscription | undefined;
  private _cartSubscription: Subscription | undefined;
  private _sessionSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WindowModel();
    this._scrollRef = null;

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.onCartChanged = this.onCartChanged.bind(this);
    this.onActiveAccountChanged = this.onActiveAccountChanged.bind(this);
    this.onSessionChangedAsync = this.onSessionChangedAsync.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onCustomerGroupChangedAsync =
      this.onCustomerGroupChangedAsync.bind(this);
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
    this._medusaAccessTokenSubscription =
      MedusaService.accessTokenObservable.subscribe({
        next: (value: string | undefined) => {
          if (!value) {
            this.resetMedusaModel();
            this.initializeAsync(renderCount);
          }
        },
      });
  }

  public override dispose(renderCount: number): void {
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
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

  public addBanner(banner: BannerProps | undefined): void {
    this._model.banner = banner;
  }

  public updateLanguageCode(code: string): void {
    this._model.languageCode = code;
  }

  public updateLanguageInfo(code: string, info: LanguageInfo): void {
    this._model.languageInfo = { isoCode: code, info: info };
    this._model.languageCode = code;
  }

  public updateLoadedLocationPath(value: string | undefined): void {
    this._model.loadedLocationPath = value;
  }

  public updateShowNavigateBack(value: boolean): void {
    this._model.showNavigateBack = value;
  }

  public updateQueryInventoryLocation(id: string | undefined) {
    if (!id) {
      this._model.queryInventoryLocation = undefined;
      return;
    }

    this._inventoryLocationsSubscription?.unsubscribe();
    this._inventoryLocationsSubscription = HomeController.model.store
      .pipe(select((model: HomeState) => model.inventoryLocations))
      .subscribe({
        next: (value: InventoryLocation[]) => {
          const inventoryLocation = value.find((location) => location.id == id);
          if (inventoryLocation) {
            this._model.queryInventoryLocation = inventoryLocation;
            this._inventoryLocationsSubscription?.unsubscribe();
          }
        },
      });
  }

  public updateOnLocationChanged(location: RouterLocation): void {
    this._model.prevTransitionKeyIndex = this._model.transitionKeyIndex;

    if (location.pathname === RoutePathsType.Home) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Home;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Store) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Store;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname.startsWith(`${RoutePathsType.Store}/`)) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 1;
      this._model.activeRoute = RoutePathsType.StoreWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Events) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Events;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Cart) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Cart;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Checkout) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Checkout;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Signin) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Signin;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Signup) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Signup;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.ForgotPassword) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.ForgotPassword;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.ResetPassword) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.ResetPassword;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.TermsOfService) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.TermsOfService;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.PrivacyPolicy) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.PrivacyPolicy;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Help) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Help;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountHelp) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountHelp;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Account) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountOrderHistory) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountOrderHistory;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountAddresses) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountAddresses;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountLikes) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountLikes;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountAddFriends) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountAddFriends;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.AccountSettings) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountSettings;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.AccountSettingsAccount) {
      this._model.transitionKeyIndex = 2;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountSettingsAccount;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (
      location.pathname.startsWith(`${RoutePathsType.OrderConfirmed}/`)
    ) {
      this._model.transitionKeyIndex = 1;
      this._model.activeRoute = RoutePathsType.OrderConfirmedWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else {
      this._model.showNavigateBack = false;
    }
  }

  private resetMedusaModel(): void {
    this._model.cartCount = 0;
    this._model.toast = undefined;
    this._model.banner = undefined;
    this._model.queryInventoryLocation = undefined;
    this._model.priceLists = [];
  }

  private async initializeAsync(renderCount: number): Promise<void> {
    this._cartSubscription?.unsubscribe();
    this._cartSubscription = CartController.model.store
      .pipe(select((model) => model.cart))
      .subscribe({ next: this.onCartChanged });

    this._accountSubscription?.unsubscribe();
    this._accountSubscription =
      AccountService.activeAccountObservable.subscribe({
        next: this.onActiveAccountChanged,
      });

    this._sessionSubscription?.unsubscribe();
    this._sessionSubscription = SupabaseService.sessionObservable.subscribe({
      next: this.onSessionChangedAsync,
    });

    this._customerSubscription?.unsubscribe();
    this._customerSubscription = AccountController.model.store
      .pipe(select((model) => model.customer))
      .subscribe({
        next: this.onCustomerChanged,
      });

    SupabaseService.supabaseClient?.auth.onAuthStateChange(
      this.onAuthStateChanged
    );
  }

  private onCartChanged(
    value: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
  ): void {
    this._model.cartCount = value?.items.length ?? 0;
  }

  private onAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null
  ): void {
    if (event === 'SIGNED_IN') {
      this._model.isLoading = true;
      this._model.isAuthenticated = true;
    } else if (event === 'SIGNED_OUT') {
      this._model.priceLists = [];
      this._model.account = null;
      this._model.isAuthenticated = false;
    } else if (event === 'INITIAL_SESSION' && !session) {
      this._model.isAuthenticated = false;
    } else if (event === 'INITIAL_SESSION' && session) {
      this._model.isAuthenticated = true;
    }

    this._model.authState = event;
  }

  private async onSessionChangedAsync(value: Session | null): Promise<void> {
    if (!value) {
      AccountService.clearActiveAccount();
      this._model.isAuthenticated = undefined;
      this._model.isLoading = false;
      return;
    }

    const account = await this.requestActiveAccountAsync(value);
    if (account) {
      await this.requestPrivateSecretsAsync(value);

      this._model.isAuthenticated = true;
    } else {
      AccountService.clearActiveAccount();
      SecretsService.clearPrivateSecrets();
      this._model.isAuthenticated = undefined;
    }

    this._model.isLoading = false;
  }

  private onActiveAccountChanged(value: core.AccountResponse | null): void {
    this._model.account = value;
  }

  private async requestActiveAccountAsync(
    session: Session
  ): Promise<core.AccountResponse | null> {
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
        console.error(error);
        return null;
      }
    }
  }

  private async requestPrivateSecretsAsync(session: Session): Promise<void> {
    try {
      const secrets = await SecretsService.requestPrivateAsync(session);
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

  private onCustomerChanged(customer: Customer | undefined): void {
    if (!customer || !MedusaService.accessToken) {
      return;
    }

    this._customerGroupSubscription?.unsubscribe();
    this._customerGroupSubscription = AccountController.model.store
      .pipe(select((model: AccountState) => model.customerGroup))
      .subscribe({
        next: this.onCustomerGroupChangedAsync,
      });
  }

  private async onCustomerGroupChangedAsync(
    customerGroup: CustomerGroup | undefined
  ): Promise<void> {
    if (!customerGroup) {
      this._model.priceLists = [];
      return;
    }

    this._model.priceLists = await MedusaService.requestGetPriceListsAsync({
      status: ['active'],
      customerGroups: [customerGroup?.id ?? ''],
    });
  }
}

export default new WindowController();
