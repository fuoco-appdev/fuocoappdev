import { createStore, withProps } from "@ngneat/elf";
import { Location } from "react-router-dom";
import { Model } from "../model";

export interface SigninState {
    location?: Location;
}

export class SigninModel extends Model {
    constructor() {
        super(createStore(
            {name: 'signin'},
            withProps<SigninState>({
                location: undefined,
            }),
        ));
    }

    public get location(): Location {
        return this.store.getValue().location;
    }

    public set location(location: Location) {
        if (this.location !== location) {
            this.store.update((state) => ({...state, location: location}));
        }
    }
}