import { createStore, withProps } from "@ngneat/elf";
import { NavigateFunction } from "react-router-dom";
import { Model } from "../model";

export interface WindowState {
    isSigninVisible: boolean;
    isSignupVisible: boolean;
    isSignoutVisible: boolean;
    isAuthenticated: boolean | undefined;
    navigate: NavigateFunction | undefined;
}

export class WindowModel extends Model {
    constructor() {
        super(createStore(
            {name: 'window'},
            withProps<WindowState>({
                isSigninVisible: false,
                isSignupVisible: false,
                isSignoutVisible: false,
                isAuthenticated: undefined,
                navigate: undefined
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

    public get isSignoutVisible(): boolean {
        return this.store.getValue().isSignoutVisible;
    }

    public set isSignoutVisible(isVisible: boolean) {
        if (this.isSignoutVisible !== isVisible) {
            this.store.update((state) => ({...state, isSignoutVisible: isVisible}));
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

    public get navigate(): NavigateFunction | undefined {
        return this.store.getValue().navigate;
    }

    public set navigate(navigate: NavigateFunction | undefined) {
        if (this.navigate !== navigate) {
            this.store.update((state) => ({...state, navigate: navigate}));
        }
    }
}