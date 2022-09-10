import { createStore, withProps } from "@ngneat/elf";
import { Location, NavigateFunction } from "react-router-dom";
import { Model } from "../model";

export interface SigninProps {
    location?: Location;
    navigate?: NavigateFunction;
}

export class SigninModel extends Model {
    constructor() {
        super(createStore(
            {name: 'signin'},
            withProps<SigninProps>({
                location: undefined,
                navigate: undefined
            }),
        ));
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