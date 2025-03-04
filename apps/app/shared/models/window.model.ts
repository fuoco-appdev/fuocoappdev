import { HttpTypes } from '@medusajs/types';
import { type AuthChangeEvent } from '@supabase/supabase-js';
import { makeObservable, observable, runInAction } from 'mobx';
import { Model } from '../model';
import { AccountResponse } from '../protobuf/account_pb';
import { RoutePathsType } from '../route-paths-type';
import { type AccountData } from '../services/account-notification.service';
import { StoreOptions } from '../store-options';
import { type InventoryLocation } from './explore.model';

export interface LanguageInfo {
  name: string;
  nativeName: string;
  countryCode: string;
}

export class WindowModel extends Model {
  @observable
  public account!: AccountResponse | null;
  @observable
  public isAuthenticated: boolean | undefined;
  @observable
  public isAccountComplete!: boolean;
  @observable
  public activeRoute: RoutePathsType | undefined;
  @observable
  public activeTabsId: RoutePathsType | undefined;
  @observable
  public cartCount!: number;
  @observable
  public unseenNotificationsCount!: number;
  @observable
  public orderPlacedNotificationData: HttpTypes.StoreOrder | undefined;
  @observable
  public orderShippedNotificationData: HttpTypes.StoreOrder | undefined;
  @observable
  public orderReturnedNotificationData: HttpTypes.StoreOrder | undefined;
  @observable
  public orderCanceledNotificationData: HttpTypes.StoreOrder | undefined;
  @observable
  public accountFollowerAcceptedNotificationData: AccountData | undefined;
  @observable
  public accountFollowerFollowingNotificationData: AccountData | undefined;
  @observable
  public authState: AuthChangeEvent | undefined;
  @observable
  public isLoading!: boolean;
  @observable
  public showNavigateBack!: boolean;
  @observable
  public loadedLocationPath: string | undefined;
  @observable
  public prevTransitionKeyIndex!: number;
  @observable
  public transitionKeyIndex!: number;
  @observable
  public scaleKeyIndex!: number;
  @observable
  public queryInventoryLocation: InventoryLocation | undefined;
  @observable
  public priceLists!: HttpTypes.AdminPriceList[];
  @observable
  public isSideBarOpen!: boolean;
  @observable
  public languageCode!: string;
  @observable
  public languageInfo: { isoCode: string; info: LanguageInfo } | undefined;

  constructor(options?: StoreOptions) {
    super({
      ...options,
      ...{
        persistableProperties: {
          local: ['_isSideBarOpen', '_languageCode, _languageInfo'],
        },
      },
    });
    makeObservable(this);

    runInAction(() => {
      this.account = null;
      this.isAuthenticated = undefined;
      this.isAccountComplete = false;
      this.activeRoute = undefined;
      this.activeTabsId = undefined;
      this.cartCount = 0;
      this.unseenNotificationsCount = 0;
      this.orderPlacedNotificationData = undefined;
      this.orderShippedNotificationData = undefined;
      this.orderReturnedNotificationData = undefined;
      this.orderCanceledNotificationData = undefined;
      this.accountFollowerAcceptedNotificationData = undefined;
      this.accountFollowerFollowingNotificationData = undefined;
      this.authState = undefined;
      this.isLoading = false;
      this.showNavigateBack = false;
      this.loadedLocationPath = undefined;
      this.prevTransitionKeyIndex = 0;
      this.transitionKeyIndex = 0;
      this.scaleKeyIndex = 0;
      this.queryInventoryLocation = undefined;
      this.priceLists = [];
      this.isSideBarOpen = true;
      this.languageCode = 'en';
      this.languageInfo = undefined;
    });
  }

  public updateAccount(value: AccountResponse | null) {
    if (JSON.stringify(this.account) !== JSON.stringify(value)) {
      runInAction(() => (this.account = value));
    }
  }

  public updateIsAuthenticated(value: boolean | undefined) {
    if (this.isAuthenticated !== value) {
      runInAction(() => (this.isAuthenticated = value));
    }
  }

  public updateIsAccountComplete(value: boolean) {
    if (this.isAccountComplete !== value) {
      runInAction(() => (this.isAccountComplete = value));
    }
  }

  public updateActiveRoute(value: RoutePathsType | undefined) {
    if (this.activeRoute !== value) {
      runInAction(() => (this.activeRoute = value));
    }
  }

  public updateActiveTabsId(value: RoutePathsType | undefined) {
    if (this.activeTabsId !== value) {
      runInAction(() => (this.activeTabsId = value));
    }
  }

  public updateUnseenNotificationsCount(value: number) {
    if (this.unseenNotificationsCount !== value) {
      runInAction(() => (this.unseenNotificationsCount = value));
    }
  }

  public updateOrderPlacedNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ) {
    if (
      JSON.stringify(this.orderPlacedNotificationData) !== JSON.stringify(value)
    ) {
      runInAction(() => (this.orderPlacedNotificationData = value));
    }
  }

  public updateOrderShippedNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ) {
    if (
      JSON.stringify(this.orderShippedNotificationData) !==
      JSON.stringify(value)
    ) {
      runInAction(() => (this.orderShippedNotificationData = value));
    }
  }

  public updateOrderReturnedNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ) {
    if (
      JSON.stringify(this.orderReturnedNotificationData) !==
      JSON.stringify(value)
    ) {
      runInAction(() => (this.orderReturnedNotificationData = value));
    }
  }

  public updateOrderCanceledNotificationData(
    value: HttpTypes.StoreOrder | undefined
  ) {
    if (
      JSON.stringify(this.orderCanceledNotificationData) !==
      JSON.stringify(value)
    ) {
      runInAction(() => (this.orderCanceledNotificationData = value));
    }
  }

  public updateAccountFollowerAcceptedNotificationData(
    value: AccountData | undefined
  ) {
    if (
      JSON.stringify(this.accountFollowerAcceptedNotificationData) !==
      JSON.stringify(value)
    ) {
      runInAction(() => (this.accountFollowerAcceptedNotificationData = value));
    }
  }

  public updateAccountFollowerFollowingNotificationData(
    value: AccountData | undefined
  ) {
    if (
      JSON.stringify(this.accountFollowerFollowingNotificationData) !==
      JSON.stringify(value)
    ) {
      runInAction(
        () => (this.accountFollowerFollowingNotificationData = value)
      );
    }
  }

  public updateCartCount(value: number) {
    if (this.cartCount !== value) {
      runInAction(() => (this.cartCount = value));
    }
  }

  public updateAuthState(value: AuthChangeEvent | undefined) {
    if (this.authState !== value) {
      runInAction(() => (this.authState = value));
    }
  }

  public updateIsLoading(value: boolean) {
    if (this.isLoading !== value) {
      runInAction(() => (this.isLoading = value));
    }
  }

  public updateShowNavigateBack(value: boolean) {
    if (this.showNavigateBack !== value) {
      runInAction(() => (this.showNavigateBack = value));
    }
  }

  public updateLoadedLocationPath(value: string | undefined) {
    if (this.loadedLocationPath !== value) {
      runInAction(() => (this.loadedLocationPath = value));
    }
  }

  public updatePrevTransitionKeyIndex(value: number) {
    if (this.prevTransitionKeyIndex !== value) {
      runInAction(() => (this.prevTransitionKeyIndex = value));
    }
  }

  public updateTransitionKeyIndex(value: number) {
    if (this.transitionKeyIndex !== value) {
      runInAction(() => (this.transitionKeyIndex = value));
    }
  }

  public updateScaleKeyIndex(value: number) {
    if (this.scaleKeyIndex !== value) {
      runInAction(() => (this.scaleKeyIndex = value));
    }
  }

  public updateQueryInventoryLocation(value: InventoryLocation | undefined) {
    if (this.queryInventoryLocation !== value) {
      runInAction(() => (this.queryInventoryLocation = value));
    }
  }

  public updatePriceLists(value: HttpTypes.AdminPriceList[]) {
    if (JSON.stringify(this.priceLists) !== JSON.stringify(value)) {
      runInAction(() => (this.priceLists = value));
    }
  }

  public updateIsSideBarOpen(value: boolean) {
    if (this.isSideBarOpen !== value) {
      runInAction(() => (this.isSideBarOpen = value));
    }
  }

  public updateLanguageCode(value: string) {
    if (this.languageCode !== value) {
      runInAction(() => (this.languageCode = value));
    }
  }

  public updateLanguageInfo(
    value: { isoCode: string; info: LanguageInfo } | undefined
  ) {
    if (JSON.stringify(this.languageInfo) !== JSON.stringify(value)) {
      runInAction(() => (this.languageInfo = value));
    }
  }
}
