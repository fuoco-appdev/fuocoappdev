import { createStore, withProps } from '@ngneat/elf';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { Model } from '../model';
import { RoutePathsType } from '../route-paths';
import * as core from '../protobuf/core_pb';
import { ToastProps, LanguageInfo } from '@fuoco.appdev/core-ui';
import { InventoryLocation } from './home.model';

export interface WindowState {
  account: core.Account | null;
  isAuthenticated: boolean | undefined;
  activeRoute: RoutePathsType | undefined;
  cartCount: number;
  authState: AuthChangeEvent | undefined;
  isLoading: boolean;
  toast: ToastProps | undefined;
  showNavigateBack: boolean;
  hideCartButton: boolean;
  currentPosition: GeolocationPosition | undefined;
  loadedLocationPath: string | undefined;
  prevTransitionKeyIndex: number;
  transitionKeyIndex: number;
  queryInventoryLocation: InventoryLocation | undefined;
}

export interface WindowLocalState {
  languageCode: string;
  languageInfo: { isoCode: string; info: LanguageInfo } | undefined;
}

export class WindowModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'window' },
        withProps<WindowState>({
          account: null,
          isAuthenticated: undefined,
          activeRoute: undefined,
          cartCount: 0,
          authState: undefined,
          isLoading: false,
          toast: undefined,
          showNavigateBack: false,
          hideCartButton: false,
          currentPosition: undefined,
          loadedLocationPath: undefined,
          prevTransitionKeyIndex: 0,
          transitionKeyIndex: 0,
          queryInventoryLocation: undefined,
        })
      ),
      undefined,
      createStore(
        { name: 'window-local' },
        withProps<WindowLocalState>({
          languageCode: 'en',
          languageInfo: undefined,
        })
      )
    );
  }

  public get account(): core.Account | null {
    return this.store.getValue().account;
  }

  public set account(value: core.Account | null) {
    if (JSON.stringify(this.account) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, account: value }));
    }
  }

  public get user(): object | null {
    return this.store.getValue().user;
  }

  public set user(value: object | null) {
    if (JSON.stringify(this.user) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, user: value }));
    }
  }

  public get customer(): object | null {
    return this.store.getValue().customer;
  }

  public set customer(value: object | null) {
    if (JSON.stringify(this.customer) !== JSON.stringify(value)) {
      this.store.update((state) => ({ ...state, customer: value }));
    }
  }

  public get isAuthenticated(): boolean | undefined {
    return this.store.getValue().isAuthenticated;
  }

  public set isAuthenticated(isAuthenticated: boolean | undefined) {
    if (this.isAuthenticated !== isAuthenticated) {
      this.store.update((state) => ({
        ...state,
        isAuthenticated: isAuthenticated,
      }));
    }
  }

  public get activeRoute(): RoutePathsType | undefined {
    return this.store.getValue().activeRoute;
  }

  public set activeRoute(value: RoutePathsType | undefined) {
    if (this.activeRoute !== value) {
      this.store.update((state) => ({ ...state, activeRoute: value }));
    }
  }

  public get cartCount(): number {
    return this.store.getValue().cartCount;
  }

  public set cartCount(value: number) {
    if (this.cartCount !== value) {
      this.store.update((state) => ({
        ...state,
        cartCount: value,
      }));
    }
  }

  public get authState(): AuthChangeEvent | undefined {
    return this.store.getValue().authState;
  }

  public set authState(value: AuthChangeEvent | undefined) {
    if (this.authState !== value) {
      this.store.update((state) => ({
        ...state,
        authState: value,
      }));
    }
  }

  public get isLoading(): boolean {
    return this.store.getValue().isLoading;
  }

  public set isLoading(value: boolean) {
    if (this.isLoading !== value) {
      this.store.update((state) => ({
        ...state,
        isLoading: value,
      }));
    }
  }

  public get toast(): ToastProps | undefined {
    return this.store.getValue().toast;
  }

  public set toast(value: ToastProps | undefined) {
    if (this.toast !== value) {
      this.store.update((state) => ({
        ...state,
        toast: value,
      }));
    }
  }

  public get showNavigateBack(): boolean {
    return this.store.getValue().showNavigateBack;
  }

  public set showNavigateBack(value: boolean) {
    if (this.showNavigateBack !== value) {
      this.store.update((state) => ({
        ...state,
        showNavigateBack: value,
      }));
    }
  }

  public get hideCartButton(): boolean {
    return this.store.getValue().hideCartButton;
  }

  public set hideCartButton(value: boolean) {
    if (this.hideCartButton !== value) {
      this.store.update((state) => ({
        ...state,
        hideCartButton: value,
      }));
    }
  }

  public get loadedLocationPath(): string | undefined {
    return this.store?.getValue().loadedLocationPath;
  }

  public set loadedLocationPath(value: string | undefined) {
    if (this.loadedLocationPath !== value) {
      this.store?.update((state) => ({
        ...state,
        loadedLocationPath: value,
      }));
    }
  }

  public get languageCode(): string {
    return this.localStore?.getValue().languageCode;
  }

  public set languageCode(value: string) {
    if (this.languageCode !== value) {
      this.localStore?.update((state) => ({
        ...state,
        languageCode: value,
      }));
    }
  }

  public get languageInfo():
    | { isoCode: string; info: LanguageInfo }
    | undefined {
    return this.localStore?.getValue().languageInfo;
  }

  public set languageInfo(
    value: { isoCode: string; info: LanguageInfo } | undefined
  ) {
    if (JSON.stringify(this.languageInfo) !== JSON.stringify(value)) {
      this.localStore?.update((state) => ({
        ...state,
        languageInfo: value,
      }));
    }
  }

  public get currentPosition(): GeolocationPosition {
    return this.localStore?.getValue().currentPosition;
  }

  public set currentPosition(value: GeolocationPosition) {
    if (JSON.stringify(this.currentPosition) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        currentPosition: value,
      }));
    }
  }

  public get prevTransitionKeyIndex(): number {
    return this.store?.getValue().prevTransitionKeyIndex;
  }

  public set prevTransitionKeyIndex(value: number) {
    if (this.prevTransitionKeyIndex !== value) {
      this.store?.update((state) => ({
        ...state,
        prevTransitionKeyIndex: value,
      }));
    }
  }

  public get transitionKeyIndex(): number {
    return this.store?.getValue().transitionKeyIndex;
  }

  public set transitionKeyIndex(value: number) {
    if (this.transitionKeyIndex !== value) {
      this.store?.update((state) => ({
        ...state,
        transitionKeyIndex: value,
      }));
    }
  }

  public get queryInventoryLocation(): InventoryLocation | undefined {
    return this.store?.getValue().queryInventoryLocation;
  }

  public set queryInventoryLocation(value: InventoryLocation | undefined) {
    if (this.queryInventoryLocation !== value) {
      this.store?.update((state) => ({
        ...state,
        queryInventoryLocation: value,
      }));
    }
  }
}
