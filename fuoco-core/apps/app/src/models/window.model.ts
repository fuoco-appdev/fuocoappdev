import { createStore, withProps } from "@ngneat/elf";
import { Location } from "react-router-dom";
import { Model } from "../model";

export interface WindowState {
    isSigninVisible: boolean;
    isSignupVisible: boolean;
    location: Location | undefined;
}

export class WindowModel extends Model {
    constructor() {
        super(createStore(
            {name: 'window'},
            withProps<WindowState>({
                isSigninVisible: false,
                isSignupVisible: false,
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

    public get location(): Location | undefined {
        return this.store.getValue().location;
    }

    public set location(location: Location | undefined) {
        if (this.location !== location) {
            this.store.update((state) => ({...state, location: location}));
        }
    }
}