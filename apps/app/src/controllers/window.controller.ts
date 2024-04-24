/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BannerProps, LanguageInfo, ToastProps } from "@fuoco.appdev/core-ui";
import { Cart, Customer, CustomerGroup, Order } from "@medusajs/medusa";
import { select } from "@ngneat/elf";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { Location as RouterLocation } from "react-router-dom";
import { Subscription, filter, firstValueFrom, take } from "rxjs";
import { Controller } from "../controller";
import { AccountState } from "../models/account.model";
import { ExploreState } from "../models/explore.model";
import { WindowModel } from "../models/window.model";
import { AccountResponse } from "../protobuf/account_pb";
import { RoutePathsType } from "../route-paths";
import AccountNotificationService from "../services/account-notification.service";
import AccountService from "../services/account.service";
import MedusaService from "../services/medusa.service";
import SupabaseService from "../services/supabase.service";
import AccountController from "./account.controller";
import CartController from "./cart.controller";
import ExploreController from "./explore.controller";
import NotificationsController from "./notifications.controller";

class WindowController extends Controller {
  private readonly _model: WindowModel;
  private _customerGroupSubscription: Subscription | undefined;
  private _scrollRef: HTMLDivElement | null;
  private _accountSubscription: Subscription | undefined;
  private _customerSubscription: Subscription | undefined;
  private _cartSubscription: Subscription | undefined;
  private _sessionSubscription: Subscription | undefined;
  private _notificationCreatedSubscription: Subscription | undefined;
  private _medusaAccessTokenSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WindowModel();
    this._scrollRef = null;

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.onCartChanged = this.onCartChanged.bind(this);
    this.onActiveAccountChangedAsync = this.onActiveAccountChangedAsync.bind(
      this,
    );
    this.onSessionChangedAsync = this.onSessionChangedAsync.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onCustomerGroupChangedAsync = this.onCustomerGroupChangedAsync.bind(
      this,
    );
    this.onNotificationCreated = this.onNotificationCreated.bind(this);
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
    this.initializeAsync(renderCount);

    this._notificationCreatedSubscription = AccountNotificationService
      .notificationCreatedObservable.subscribe({
        next: this.onNotificationCreated,
      });
  }

  public override load(_renderCount: number): void { }

  public override disposeInitialization(_renderCount: number): void {
    this._notificationCreatedSubscription?.unsubscribe();
    this._medusaAccessTokenSubscription?.unsubscribe();
    this._customerSubscription?.unsubscribe();
    this._customerGroupSubscription?.unsubscribe();
    this._sessionSubscription?.unsubscribe();
    this._accountSubscription?.unsubscribe();
    this._cartSubscription?.unsubscribe();
  }

  public override disposeLoad(_renderCount: number): void { }

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

  public updateOrderPlacedNotificationData(value: Order | undefined): void {
    this._model.orderPlacedNotificationData = value;
  }

  public updateOrderShippedNotificationData(value: Order | undefined): void {
    this._model.orderShippedNotificationData = value;
  }

  public updateOrderReturnedNotificationData(value: Order | undefined): void {
    this._model.orderReturnedNotificationData = value;
  }

  public updateOrderCanceledNotificationData(value: Order | undefined): void {
    this._model.orderCanceledNotificationData = value;
  }

  public updateNotificationsCount(value: number): void {
    this._model.unseenNotificationsCount = value;
  }

  public updateIsSideBarOpen(value: boolean): void {
    this._model.isSideBarOpen = value;
  }

  public async updateQueryInventoryLocationAsync(id: string | undefined) {
    if (!id) {
      this._model.queryInventoryLocation = undefined;
      return;
    }

    const inventoryLocations = await firstValueFrom(
      ExploreController.model.store.pipe(
        select((model: ExploreState) => model.inventoryLocations),
        filter((value) => value !== undefined),
        take(1),
      ),
    );
    const inventoryLocation = inventoryLocations.find(
      (location) => location.id == id,
    );
    if (inventoryLocation) {
      this._model.queryInventoryLocation = inventoryLocation;
    }
  }

  public updateOnLocationChanged(location: RouterLocation): void {
    this._model.prevTransitionKeyIndex = this._model.transitionKeyIndex;

    if (location.pathname === RoutePathsType.Explore) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Explore;
      this._model.activeTabsId = RoutePathsType.Explore;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Store) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Store;
      this._model.activeTabsId = RoutePathsType.Store;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname.startsWith(`${RoutePathsType.Store}/`)) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 1;
      this._model.activeRoute = RoutePathsType.StoreWithId;
      this._model.activeTabsId = RoutePathsType.Store;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Events) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Events;
      this._model.activeTabsId = RoutePathsType.Events;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Cart) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Cart;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Checkout) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Checkout;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Signin) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Signin;
      this._model.activeTabsId = RoutePathsType.Signin;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Signup) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Signup;
      this._model.activeTabsId = RoutePathsType.Signup;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.EmailConfirmation) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.EmailConfirmation;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.ForgotPassword) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.ForgotPassword;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.ResetPassword) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.ResetPassword;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.TermsOfService) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.TermsOfService;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.PrivacyPolicy) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.PrivacyPolicy;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Help) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Help;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountHelp) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountHelp;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (location.pathname === RoutePathsType.Notifications) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Notifications;
      this._model.activeTabsId = RoutePathsType.Notifications;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.Account) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.Account;
      this._model.activeTabsId = RoutePathsType.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountOrderHistory) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountOrderHistory;
      this._model.activeTabsId = RoutePathsType.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountAddresses) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountAddresses;
      this._model.activeTabsId = RoutePathsType.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountLikes) {
      this._model.transitionKeyIndex = 0;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountLikes;
      this._model.activeTabsId = RoutePathsType.Account;
      this._model.showNavigateBack = false;
      this._model.hideCartButton = false;
    } else if (location.pathname === RoutePathsType.AccountAddFriends) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountAddFriends;
      this._model.activeTabsId = RoutePathsType.Account;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (this.isLocationAccountWithId(location.pathname)) {
      this._model.transitionKeyIndex = 2;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountWithId;
      this._model.activeTabsId = undefined;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (
      this.isLocationAccountWithId(
        location.pathname,
        RoutePathsType.AccountWithIdLikes,
      )
    ) {
      this._model.transitionKeyIndex = 2;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountWithIdLikes;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (this.isLocationAccountStatusWithId(location.pathname)) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountStatusWithId;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (
      this.isLocationAccountStatusWithId(
        location.pathname,
        RoutePathsType.AccountStatusWithIdFollowers,
      )
    ) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountStatusWithIdFollowers;
      this._model.showNavigateBack = true;
      this._model.hideCartButton = true;
    } else if (
      this.isLocationAccountStatusWithId(
        location.pathname,
        RoutePathsType.AccountStatusWithIdFollowing,
      )
    ) {
      this._model.transitionKeyIndex = 1;
      this._model.scaleKeyIndex = 0;
      this._model.activeRoute = RoutePathsType.AccountStatusWithIdFollowing;
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

  public isLocationAccountWithId(
    pathname: string,
    childPath?: RoutePathsType,
  ): boolean {
    const splittedPath = pathname.split("/").filter((value) => value !== "");
    if (splittedPath.length < 2) {
      return false;
    }

    const childPathFormatted = childPath?.split("/").slice(-1) ?? [];
    if (
      splittedPath[0] === RoutePathsType.Account.replace("/", "") &&
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        .test(
          splittedPath[1],
        )
    ) {
      if (childPath && splittedPath[2] !== childPathFormatted?.[0]) {
        return false;
      }

      return true;
    }

    return false;
  }

  public isLocationAccountStatusWithId(
    pathname: string,
    childPath?: RoutePathsType,
  ): boolean {
    const splittedPath = pathname.split("/").filter((value) => value !== "");
    if (splittedPath.length < 3) {
      return false;
    }

    const childPathFormatted = childPath?.split("/").slice(-1) ?? [];
    if (
      `${splittedPath[0]}/${splittedPath[1]}` ===
      RoutePathsType.AccountStatus.replace("/", "") &&
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        .test(
          splittedPath[2],
        )
    ) {
      if (childPath && splittedPath[3] !== childPathFormatted?.[0]) {
        return false;
      }

      return true;
    }

    return false;
  }

  private async initializeAsync(_renderCount: number): Promise<void> {
    this._cartSubscription?.unsubscribe();
    this._cartSubscription = CartController.model.store
      .pipe(select((model) => model.cart))
      .subscribe({ next: this.onCartChanged });

    this._accountSubscription?.unsubscribe();
    this._accountSubscription = AccountService.activeAccountObservable
      .subscribe({
        next: this.onActiveAccountChangedAsync,
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
      this.onAuthStateChanged,
    );
  }

  private onNotificationCreated(value: Record<string, any>): void {
    if (Object.keys(value).length <= 0) {
      return;
    }

    const payload = value["payload"];
    const resourceType = payload["resource_type"];
    const eventName = payload["event_name"];
    const data = payload["data"];
    if (resourceType === "order") {
      if (eventName === "order.placed") {
        this.onOrderPlaced(data);
      } else if (eventName === "order.shipped") {
        this.onOrderShipped(data);
      } else if (eventName === "order.returned") {
        this.onOrderReturned(data);
      } else if (eventName === "order.canceled") {
        this.onOrderCanceled(data);
      }
    }

    this._model.unseenNotificationsCount =
      this._model.unseenNotificationsCount + 1;
    NotificationsController.addAccountNotification(value);
  }

  private onOrderPlaced(data: Record<string, any>): void {
    const order = data as Order;
    this._model.orderPlacedNotificationData = order;
  }

  private onOrderShipped(data: Record<string, any>): void {
    const order = data as Order;
    this._model.orderShippedNotificationData = order;
  }

  private onOrderReturned(data: Record<string, any>): void {
    const order = data as Order;
    this._model.orderReturnedNotificationData = order;
  }

  private onOrderCanceled(data: Record<string, any>): void {
    const order = data as Order;
    this._model.orderCanceledNotificationData = order;
  }

  private onCartChanged(
    value: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined,
  ): void {
    this._model.cartCount = value?.items.length ?? 0;
  }

  private onAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null,
  ): void {
    if (event === "SIGNED_IN") {
      this._model.isLoading = true;
      this._model.isAuthenticated = true;
    } else if (event === "SIGNED_OUT") {
      this._model.priceLists = [];
      this._model.account = null;
      this._model.isAuthenticated = false;
    } else if (event === "INITIAL_SESSION" && !session) {
      this._model.isAuthenticated = false;
    } else if (event === "INITIAL_SESSION" && session) {
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
      this._model.isAuthenticated = true;
    } else {
      AccountService.clearActiveAccount();
      this._model.isAuthenticated = undefined;
    }

    this._model.isLoading = false;
  }

  private async onActiveAccountChangedAsync(
    value: AccountResponse | null,
  ): Promise<void> {
    if (this._model.account?.id === value?.id) {
      return;
    }

    this._model.account = value;

    if (!value) {
      return;
    }

    await this.requestNotificationUnseenCount(value.id);
  }

  private async requestActiveAccountAsync(
    session: Session,
  ): Promise<AccountResponse | null> {
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

  private async requestNotificationUnseenCount(
    accountId: string,
  ): Promise<void> {
    try {
      const response = await AccountNotificationService.requestUnseenCountAsync(
        accountId,
      );
      this._model.unseenNotificationsCount = response.count ?? 0;
    } catch (error: any) {
      console.error(error);
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
    customerGroup: CustomerGroup | undefined,
  ): Promise<void> {
    if (!customerGroup) {
      this._model.priceLists = [];
      return;
    }

    this._model.priceLists = await MedusaService.requestGetPriceListsAsync({
      status: ["active"],
      customerGroups: [customerGroup?.id ?? ""],
    });
  }
}

export default new WindowController();
