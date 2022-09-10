import { createStore, withProps } from "@ngneat/elf";
import { Location, NavigateFunction } from "react-router-dom";
import { Model } from "../model";

export interface WindowProps {
    isSigninVisible: boolean;
    isSignupVisible: boolean;
    location?: Location;
    navigate?: NavigateFunction;
}

export class WindowModel extends Model {
    constructor() {
        super(createStore(
            {name: 'window'},
            withProps<WindowProps>({
                isSigninVisible: false,
                isSignupVisible: false,
                location: undefined,
                navigate: undefined,
            }),
        ));
    }

    public get isSigninVisibile(): boolean {
        return this.store.getValue().isSigninVisible;
    }

    public set isSigninVisible(isVisible: boolean) {
        this.store.update((state) => ({...state, isSigninVisible: isVisible}));
    }

    public get isSignupVisible(): boolean {
        return this.store.getValue().isSigninVisible;
    }

    public set isSignupVisible(isVisible: boolean) {
        this.store.update((state) => ({...state, isSignupVisible: isVisible}));
    }

    public get location(): Location {
        return this.store.getValue().location;
    }

    public set location(location: Location) {
        this.store.update((state) => ({...state, location: location}));
    }

    public get navigate(): NavigateFunction {
        return this.store.getValue().navigate;
    }

    public set navigate(navigate: NavigateFunction) {
        this.store.update((state) => ({...state, navigate: navigate}));
    }
}