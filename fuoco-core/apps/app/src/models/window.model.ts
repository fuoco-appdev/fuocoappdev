import { createStore, withProps } from "@ngneat/elf";
import { NavigateFunction } from "react-router-dom";
import { Model } from "../model";
import { RoutePaths } from "../route-paths";

export interface WindowState {
    isSigninVisible: boolean;
    isSignupVisible: boolean;
    isSignoutVisible: boolean;
    isTabBarVisible: boolean;
    isAuthenticated: boolean | undefined;
    activeRoute: RoutePaths | undefined;
    isLoading: boolean;
    navigate: NavigateFunction | undefined;
    showConfirmEmailAlert: boolean;
    showPasswordResetAlert: boolean;
    showPasswordUpdatedAlert: boolean;
}

export class WindowModel extends Model {
    constructor() {
        super(createStore(
            {name: 'window'},
            withProps<WindowState>({
                isSigninVisible: false,
                isSignupVisible: false,
                isSignoutVisible: false,
                isTabBarVisible: false,
                isAuthenticated: undefined,
                activeRoute: undefined,
                isLoading: false,
                navigate: undefined,
                showConfirmEmailAlert: false,
                showPasswordResetAlert: false,
                showPasswordUpdatedAlert: false
            }),
        ));
    }

    public get isSigninVisible(): boolean {
        return this.store.getValue().isSigninVisible;
    }

    public set isSigninVisible(value: boolean) {
        if (this.isSigninVisible !== value) {
            this.store.update((state) => ({...state, isSigninVisible: value}));
        }
    }

    public get isSignupVisible(): boolean {
        return this.store.getValue().isSignupVisible;
    }

    public set isSignupVisible(value: boolean) {
        if (this.isSignupVisible !== value) {
            this.store.update((state) => ({...state, isSignupVisible: value}));
        }
    }

    public get isSignoutVisible(): boolean {
        return this.store.getValue().isSignoutVisible;
    }

    public set isSignoutVisible(value: boolean) {
        if (this.isSignoutVisible !== value) {
            this.store.update((state) => ({...state, isSignoutVisible: value}));
        }
    }

    public get isTabBarVisible(): boolean {
        return this.store.getValue().isTabBarVisible;
    }

    public set isTabBarVisible(value: boolean) {
        if (this.isTabBarVisible !== value) {
            this.store.update((state) => ({...state, isTabBarVisible: value}));
        }
    }

    public get isAuthenticated(): boolean | undefined {
        return this.store.getValue().isAuthenticated;
    }

    public set isAuthenticated(isAuthenticated: boolean | undefined) {
        if (this.isAuthenticated !== isAuthenticated) {
            this.store.update((state) => ({...state, isAuthenticated: isAuthenticated}));
        }
    }

    public get activeRoute(): RoutePaths | undefined {
        return this.store.getValue().activeRoute;
    }

    public set activeRoute(value: RoutePaths | undefined) {
        if (this.activeRoute !== value) {
            this.store.update((state) => ({...state, activeRoute: value}));
        }
    }

    public get isLoading(): boolean {
        return this.store.getValue().isLoading;
    }

    public set isLoading(isLoading: boolean) {
        if (this.isLoading !== isLoading) {
            this.store.update((state) => ({...state, isLoading: isLoading}));
        }
    }

    public get navigate(): NavigateFunction | undefined {
        return this.store.getValue().navigate;
    }

    public set navigate(navigate: NavigateFunction | undefined) {
        if (this.navigate !== navigate) {
            this.store.update((state) => ({...state, navigate: navigate}));
        }
    }

    public get showConfirmEmailAlert(): boolean {
        return this.store.getValue().showConfirmEmailAlert;
    }

    public set showConfirmEmailAlert(show: boolean) {
        if (this.showConfirmEmailAlert !== show) {
            this.store.update((state) => ({...state, showConfirmEmailAlert: show}));
        }
    }

    public get showPasswordResetAlert(): boolean {
        return this.store.getValue().showPasswordResetAlert;
    }

    public set showPasswordResetAlert(show: boolean) {
        if (this.showPasswordResetAlert !== show) {
            this.store.update((state) => ({...state, showPasswordResetAlert: show}));
        }
    }

    public get showPasswordUpdatedAlert(): boolean {
        return this.store.getValue().showPasswordUpdatedAlert;
    }

    public set showPasswordUpdatedAlert(show: boolean) {
        if (this.showPasswordUpdatedAlert !== show) {
            this.store.update((state) => ({...state, showPasswordUpdatedAlert: show}));
        }
    }
}