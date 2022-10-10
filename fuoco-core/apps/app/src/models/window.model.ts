import { createStore, withProps } from "@ngneat/elf";
import { NavigateFunction } from "react-router-dom";
import { Model } from "../model";

export interface WindowState {
    isSigninVisible: boolean;
    isSignupVisible: boolean;
    isAuthenticated: boolean | undefined;
    isLoading: boolean;
    navigate: NavigateFunction | undefined;
    showConfirmEmailAlert: boolean;
}

export class WindowModel extends Model {
    constructor() {
        super(createStore(
            {name: 'window'},
            withProps<WindowState>({
                isSigninVisible: false,
                isSignupVisible: false,
                isAuthenticated: undefined,
                isLoading: false,
                navigate: undefined,
                showConfirmEmailAlert: false
            }),
        ));
    }

    public get isSigninVisible(): boolean {
        return this.store.getValue().isSigninVisible;
    }

    public set isSigninVisible(isVisible: boolean) {
        if (this.isSigninVisible !== isVisible) {
            this.store.update((state) => ({...state, isSigninVisible: isVisible}));
        }
    }

    public get isSignupVisible(): boolean {
        return this.store.getValue().isSignupVisible;
    }

    public set isSignupVisible(isVisible: boolean) {
        if (this.isSignupVisible !== isVisible) {
            this.store.update((state) => ({...state, isSignupVisible: isVisible}));
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
}