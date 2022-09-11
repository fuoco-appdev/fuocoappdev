import { createStore, withProps } from "@ngneat/elf";
import { Location } from "react-router-dom";
import { Model } from "../model";

export interface SignupState {
    location?: Location;
}

export class SignupModel extends Model {
    constructor() {
        super(createStore(
            {name: 'signup'},
            withProps<SignupState>({
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