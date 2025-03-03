/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LanguageInfo } from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { Subscription as SupabaseSubscription } from '@supabase/gotrue-js/dist/main';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { IValueDidChange, Lambda, observe, when } from 'mobx';
import { Location as RouterLocation } from 'react-router-dom';
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { WindowModel } from '../models/window.model';
import { AccountResponse } from '../protobuf/account_pb';
import { RoutePathsType } from '../route-paths-type';
import AccountNotificationService, {
  AccountData,
} from '../services/account-notification.service';
import AccountService from '../services/account.service';
import MedusaService from '../services/medusa.service';
import SupabaseService from '../services/supabase.service';
import { StoreOptions } from '../store-options';
import AccountController from './account.controller';
import CartController from './cart.controller';
import ExploreController from './explore.controller';
import NotificationsController from './notifications.controller';

export default class WindowController extends Controller {
  private readonly _model: WindowModel;
  private _supabaseSubscription: SupabaseSubscription | undefined;
  private _customerGroupDisposer: Lambda | undefined;
  private _scrollRef: HTMLDivElement | null;
  private _accountDisposer: Lambda | undefined;
  private _customerDisposer: Lambda | undefined;
  private _cartDisposer: Lambda | undefined;
  private _sessionDisposer: Lambda | undefined;
  private _notificationCreatedDisposer: Lambda | undefined;
  private _medusaAccessTokenDisposer: Lambda | undefined;

  constructor(
    private readonly _container: DIContainer<{
      AccountController: AccountController;
      MedusaService: MedusaService;
      CartController: CartController;
      ExploreController: ExploreController;
      SupabaseService: SupabaseService;
      AccountService: AccountService;
      AccountNotificationService: AccountNotificationService;
      NotificationsController: NotificationsController;
    }>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new WindowModel(this._storeOptions);

    this._scrollRef = null;

    this.onCartChanged = this.onCartChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onCustomerGroupChangedAsync =
      this.onCustomerGroupChangedAsync.bind(this);
    this.onNotificationCreated = this.onNotificationCreated.bind(this);
    this.onSessionChangedAsync = this.onSessionChangedAsync.bind(this);
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
    const supabaseService = this._container.get('SupabaseService');
    const cartController = this._container.get('CartController');
    const accountService = this._container.get('AccountService');
    const accountController = this._container.get('AccountController');
    const accountNotificationService = this._container.get(
      'AccountNotificationService'
    );

    this._sessionDisposer = observe(
      supabaseService,
      'session',
      this.onSessionChangedAsync
    );

    // this._cartDisposer = observe(
    //   cartController.model,
    //   'cart',
    //   this.onCartChanged
    // );

    // this._customerDisposer = observe(
    //   accountController.model,
    //   'customer',
    //   this.onCustomerChanged
    // );

    // this._notificationCreatedDisposer = observe(
    //   accountNotificationService,
    //   'notificationCreated',
    //   this.onNotificationCreated
    // );
  }

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    this._notificationCreatedDisposer?.();
    this._medusaAccessTokenDisposer?.();
    this._customerDisposer?.();
    this._customerGroupDisposer?.();
    this._sessionDisposer?.();
    this._accountDisposer?.();
    this._cartDisposer?.();
    this._supabaseSubscription?.unsubscribe();
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public updateIsLoading(value: boolean): void {
    this._model.updateIsLoading(value);
  }

  public updateAuthState(value: AuthChangeEvent): void {
    this._model.updateAuthState(value);
  }

  public updateLanguageCode(code: string): void {
    this._model.updateLanguageCode(code);
  }

  public updateLanguageInfo(code: string, info: LanguageInfo): void {
    this._model.updateLanguageInfo({ isoCode: code, info: info });
    this._model.updateLanguageCode(code);
  }

  public updateLoadedLocationPath(value: string | undefined): void {
    this._model.updateLoadedLocationPath(value);
  }

  public updateShowNavigateBack(value: boolean): void {
    this._model.updateShowNavigateBack(value);
  }

  public updateOrderPlacedNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ): void {
    this._model.updateOrderPlacedNotificationData(value);
  }

  public updateOrderShippedNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ): void {
    this._model.updateOrderShippedNotificationData(value);
  }

  public updateOrderReturnedNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ): void {
    this._model.updateOrderReturnedNotificationData(value);
  }

  public updateOrderCanceledNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ): void {
    this._model.updateOrderCanceledNotificationData(value);
  }

  public updateAccountFollowerAcceptedNotificationData(
    value: AccountData | undefined
  ): void {
    this._model.updateAccountFollowerAcceptedNotificationData(value);
  }

  public updateAccountFollowerFollowingNotificationData(
    value: AccountData | undefined
  ): void {
    this._model.updateAccountFollowerFollowingNotificationData(value);
  }

  public updateNotificationsCount(value: number): void {
    this._model.updateUnseenNotificationsCount(value);
  }

  public updateIsSideBarOpen(value: boolean): void {
    this._model.updateIsSideBarOpen(value);
  }

  public async updateQueryInventoryLocationAsync(
    id: string | undefined,
    query: URLSearchParams
  ) {
    if (!id) {
      query.delete('sales_location');
      this._model.updateQueryInventoryLocation(undefined);
      return;
    }

    query.set('sales_location', id);
    const exploreController = this._container.get('ExploreController');
    await when(() => exploreController.model.inventoryLocations !== undefined);
    const inventoryLocations = exploreController.model.inventoryLocations;
    const inventoryLocation = inventoryLocations.find(
      (location) => location.id == id
    );
    if (inventoryLocation) {
      this._model.updateQueryInventoryLocation(inventoryLocation);
    }
  }

  public updateOnLocationChanged(
    location: RouterLocation,
    query: URLSearchParams
  ): void {
    this._model.updatePrevTransitionKeyIndex(this._model.transitionKeyIndex);

    if (location.pathname === RoutePathsType.Home) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Home);
      this._model.updateActiveTabsId(RoutePathsType.Home);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.Store) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Store);
      this._model.updateActiveTabsId(RoutePathsType.Store);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname.startsWith(`${RoutePathsType.Store}/`)) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(1);
      this._model.updateActiveRoute(RoutePathsType.StoreWithId);
      this._model.updateActiveTabsId(RoutePathsType.Store);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Events) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Events);
      this._model.updateActiveTabsId(RoutePathsType.Events);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.Cart) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Cart);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Chats) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Chats);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname.startsWith(`${RoutePathsType.Chats}/`)) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.ChatsWithId);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Checkout) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Checkout);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Signin) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Signin);
      this._model.updateActiveTabsId(RoutePathsType.Signin);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.Signup) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Signup);
      this._model.updateActiveTabsId(RoutePathsType.Signup);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.EmailConfirmation) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.EmailConfirmation);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.ForgotPassword) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.ForgotPassword);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.ResetPassword) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.ResetPassword);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.TermsOfService) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.TermsOfService);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.PrivacyPolicy) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.PrivacyPolicy);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Help) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Help);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.AccountHelp) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountHelp);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Notifications) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Notifications);
      this._model.updateActiveTabsId(RoutePathsType.Notifications);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.Account) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Account);
      this._model.updateActiveTabsId(RoutePathsType.Account);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.AccountOrderHistory) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountOrderHistory);
      this._model.updateActiveTabsId(RoutePathsType.Account);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.AccountAddresses) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountAddresses);
      this._model.updateActiveTabsId(RoutePathsType.Account);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.AccountLikes) {
      this._model.updateTransitionKeyIndex(0);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountLikes);
      this._model.updateActiveTabsId(RoutePathsType.Account);
      this._model.updateShowNavigateBack(false);
    } else if (location.pathname === RoutePathsType.AccountAddFriends) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountAddFriends);
      this._model.updateActiveTabsId(RoutePathsType.Account);
      this._model.updateShowNavigateBack(true);
    } else if (this.isLocationAccountWithId(location.pathname)) {
      this._model.updateTransitionKeyIndex(2);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountWithId);
      this._model.updateActiveTabsId(undefined);
      this._model.updateShowNavigateBack(true);
    } else if (
      this.isLocationAccountWithId(
        location.pathname,
        RoutePathsType.AccountWithIdLikes
      )
    ) {
      this._model.updateTransitionKeyIndex(2);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountWithIdLikes);
      this._model.updateShowNavigateBack(true);
    } else if (this.isLocationAccountStatusWithId(location.pathname)) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.AccountStatusWithId);
      this._model.updateShowNavigateBack(true);
    } else if (
      this.isLocationAccountStatusWithId(
        location.pathname,
        RoutePathsType.AccountStatusWithIdFollowers
      )
    ) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(
        RoutePathsType.AccountStatusWithIdFollowers
      );
      this._model.updateShowNavigateBack(true);
    } else if (
      this.isLocationAccountStatusWithId(
        location.pathname,
        RoutePathsType.AccountStatusWithIdFollowing
      )
    ) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(
        RoutePathsType.AccountStatusWithIdFollowing
      );
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.Settings) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.Settings);
      this._model.updateShowNavigateBack(true);
    } else if (location.pathname === RoutePathsType.SettingsAccount) {
      this._model.updateTransitionKeyIndex(2);
      this._model.updateScaleKeyIndex(0);
      this._model.updateActiveRoute(RoutePathsType.SettingsAccount);
      this._model.updateShowNavigateBack(true);
    } else if (
      location.pathname.startsWith(`${RoutePathsType.OrderConfirmed}/`)
    ) {
      this._model.updateTransitionKeyIndex(1);
      this._model.updateActiveRoute(RoutePathsType.OrderConfirmedWithId);
      this._model.updateShowNavigateBack(true);
    } else {
      this._model.updateShowNavigateBack(false);
    }
  }

  public isLocationAccountWithId(
    pathname: string,
    childPath?: RoutePathsType
  ): boolean {
    const splittedPath = pathname.split('/').filter((value) => value !== '');
    if (splittedPath.length < 2) {
      return false;
    }

    const childPathFormatted = childPath?.split('/').slice(-1) ?? [];
    if (
      splittedPath[0] === RoutePathsType.Account.replace('/', '') &&
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        splittedPath[1]
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
    childPath?: RoutePathsType
  ): boolean {
    const splittedPath = pathname.split('/').filter((value) => value !== '');
    if (splittedPath.length < 3) {
      return false;
    }

    const childPathFormatted = childPath?.split('/').slice(-1) ?? [];
    if (
      `${splittedPath[0]}/${splittedPath[1]}` ===
        RoutePathsType.AccountStatus.replace('/', '') &&
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        splittedPath[2]
      )
    ) {
      if (childPath && splittedPath[3] !== childPathFormatted?.[0]) {
        return false;
      }

      return true;
    }

    return false;
  }

  public async onSessionChangedAsync(
    value: IValueDidChange<Session | null>
  ): Promise<void> {
    const session = value.newValue;
    const accountService = this._container.get('AccountService');
    if (!session) {
      accountService.clearActiveAccount();
      this._model.updateIsAuthenticated(undefined);
      this._model.updateIsLoading(false);
      return;
    }

    this._model.updateIsAccountComplete(true);
    const account = await this.requestActiveAccountAsync(session);
    this._model.updateAccount(account);
    this._model.updateIsAccountComplete(account?.status === 'Complete');

    if (account) {
      this._model.updateIsAuthenticated(true);
    } else {
      accountService.clearActiveAccount();
      this._model.updateIsAuthenticated(undefined);
    }

    this._model.updateIsLoading(false);
  }

  public handleAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null
  ): void {
    if (event === 'SIGNED_IN') {
      this._model.updateIsLoading(true);
      this._model.updateIsAuthenticated(true);
    } else if (event === 'SIGNED_OUT') {
      this._model.priceLists = [];
      this._model.updateAccount(null);
      this._model.updateIsAuthenticated(false);
    } else if (event === 'INITIAL_SESSION' && !session) {
      this._model.updateIsAuthenticated(false);
    } else if (event === 'INITIAL_SESSION' && session) {
      this._model.updateIsAuthenticated(true);
    }

    this._model.updateAuthState(event);
  }

  private async initializeAsync(_renderCount: number): Promise<void> {}

  private onNotificationCreated(value: Record<string, any>): void {
    if (Object.keys(value).length <= 0) {
      return;
    }

    const newData = value['new'];
    const payload = newData['payload'];
    const resourceType = newData['resource_type'];
    const eventName = newData['event_name'];
    const data = newData['data'];
    if (resourceType === 'order') {
      if (eventName === 'order.placed') {
        this.onOrderPlaced(data);
      } else if (eventName === 'order.shipped') {
        this.onOrderShipped(data);
      } else if (eventName === 'order.returned') {
        this.onOrderReturned(data);
      } else if (eventName === 'order.canceled') {
        this.onOrderCanceled(data);
      }
    } else if (resourceType === 'account') {
      if (eventName === 'account.accepted') {
        this.onAccountFollowerAccepted(data);
      } else if (eventName === 'account.following') {
        this.onAccountFollowerFollowing(data);
      }
    }

    const notificationsController = this._container.get(
      'NotificationsController'
    );
    this._model.updateUnseenNotificationsCount(
      this._model.unseenNotificationsCount + 1
    );
    notificationsController.addAccountNotification(value);
  }

  private onOrderPlaced(data: Record<string, any>): void {
    const order = data as HttpTypes.StoreOrder;
    this._model.updateOrderPlacedNotificationData(order);
  }

  private onOrderShipped(data: Record<string, any>): void {
    const order = data as HttpTypes.StoreOrder;
    this._model.updateOrderShippedNotificationData(order);
  }

  private onOrderReturned(data: Record<string, any>): void {
    const order = data as HttpTypes.StoreOrder;
    this._model.updateOrderReturnedNotificationData(order);
  }

  private onOrderCanceled(data: Record<string, any>): void {
    const order = data as HttpTypes.StoreOrder;
    this._model.updateOrderCanceledNotificationData(order);
  }

  private onAccountFollowerAccepted(data: Record<string, any>): void {
    const account = data as AccountData;
    this._model.updateAccountFollowerAcceptedNotificationData(account);
  }

  private onAccountFollowerFollowing(data: Record<string, any>): void {
    const account = data as AccountData;
    this._model.updateAccountFollowerFollowingNotificationData(account);
  }

  private onCartChanged(
    value: IValueDidChange<HttpTypes.StoreCart | undefined>
  ): void {
    this._model.updateCartCount(value.newValue?.items?.length ?? 0);
  }

  private async requestActiveAccountAsync(
    session: Session
  ): Promise<AccountResponse | null> {
    const accountService = this._container.get('AccountService');
    try {
      return await accountService.requestActiveAsync(session);
    } catch (error: any) {
      if (error.status !== 404) {
        console.error(error);
        return null;
      }

      try {
        return await accountService.requestCreateAsync(session);
      } catch (error: any) {
        console.error(error);
        return null;
      }
    }
  }

  private async requestNotificationUnseenCount(
    accountId: string
  ): Promise<void> {
    const accountNotificationService = this._container.get(
      'AccountNotificationService'
    );
    try {
      const response = await accountNotificationService.requestUnseenCountAsync(
        accountId
      );
      this._model.updateUnseenNotificationsCount(response.count ?? 0);
    } catch (error: any) {
      console.error(error);
    }
  }

  private onCustomerChanged(
    value: IValueDidChange<HttpTypes.StoreCustomer | undefined>
  ): void {
    const medusaService = this._container.get('MedusaService');
    const accountController = this._container.get('AccountController');
    const customer = value.newValue;
    if (!customer || !medusaService.accessToken) {
      return;
    }

    this._customerGroupDisposer?.();
    this._customerGroupDisposer = observe(
      accountController.model,
      'customerGroup',
      this.onCustomerGroupChangedAsync
    );
  }

  private async onCustomerGroupChangedAsync(
    value: IValueDidChange<HttpTypes.AdminCustomerGroup | undefined>
  ): Promise<void> {
    const customerGroup = value.newValue;
    if (!customerGroup) {
      this._model.updatePriceLists([]);
      return;
    }

    const medusaService = this._container.get('MedusaService');
    this._model.updatePriceLists(
      await medusaService.requestGetPriceListsAsync({
        status: ['active'],
        customerGroups: [customerGroup?.id ?? ''],
      })
    );
  }
}
