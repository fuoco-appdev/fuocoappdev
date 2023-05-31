import { createStore, withProps } from '@ngneat/elf';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { Model } from '../model';
import { RoutePaths } from '../route-paths';
import * as core from '../protobuf/core_pb';
import { LanguageCode, ToastProps } from '@fuoco.appdev/core-ui';

export interface WindowState {
  user: object | null;
  customer: object | null;
  isAuthenticated: boolean | undefined;
  activeRoute: RoutePaths | undefined;
  cartCount: number;
  showConfirmEmailAlert: boolean;
  showPasswordResetAlert: boolean;
  authState: AuthChangeEvent | undefined;
  isLoading: boolean;
  toasts: ToastProps[];
  showNavigateBack: boolean;
  currentPosition: GeolocationPosition | undefined;
}

export interface WindowLocalState {
  language: LanguageCode;
}

export class WindowModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'window' },
        withProps<WindowState>({
          user: null,
          customer: null,
          isAuthenticated: undefined,
          activeRoute: undefined,
          cartCount: 0,
          showConfirmEmailAlert: false,
          showPasswordResetAlert: false,
          authState: undefined,
          isLoading: false,
          toasts: [],
          showNavigateBack: false,
          currentPosition: undefined,
        })
      ),
      undefined,
      createStore(
        { name: 'window-local' },
        withProps<WindowLocalState>({
          language: LanguageCode.EN,
        })
      )
    );
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

  public get activeRoute(): RoutePaths | undefined {
    return this.store.getValue().activeRoute;
  }

  public set activeRoute(value: RoutePaths | undefined) {
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

  public get showConfirmEmailAlert(): boolean {
    return this.store.getValue().showConfirmEmailAlert;
  }

  public set showConfirmEmailAlert(show: boolean) {
    if (this.showConfirmEmailAlert !== show) {
      this.store.update((state) => ({ ...state, showConfirmEmailAlert: show }));
    }
  }

  public get showPasswordResetAlert(): boolean {
    return this.store.getValue().showPasswordResetAlert;
  }

  public set showPasswordResetAlert(show: boolean) {
    if (this.showPasswordResetAlert !== show) {
      this.store.update((state) => ({
        ...state,
        showPasswordResetAlert: show,
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

  public get toasts(): ToastProps[] {
    return this.store.getValue().toasts;
  }

  public set toasts(value: ToastProps[]) {
    if (this.toasts !== value) {
      this.store.update((state) => ({
        ...state,
        toasts: value,
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

  public get language(): LanguageCode {
    return this.localStore?.getValue().language;
  }

  public set language(value: LanguageCode) {
    if (this.language !== value) {
      this.localStore?.update((state) => ({
        ...state,
        language: value,
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
}
