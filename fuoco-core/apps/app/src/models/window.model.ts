import { createStore, withProps } from "@ngneat/elf";
import { Location } from "react-router-dom";
import { Model } from "../model";

export interface WindowState {
    isSigninVisible: boolean;
    isSignupVisible: boolean;
    isSignoutVisible: boolean;
    isAuthenticated: boolean | undefined;
    location: Location | undefined;
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
                location: undefined,
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

    public get location(): Location | undefined {
        return this.store.getValue().location;
    }

    public set location(location: Location | undefined) {
        if (this.location !== location) {
            this.store.update((state) => ({...state, location: location}));
        }
    }
}