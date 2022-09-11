import { createStore, withProps } from "@ngneat/elf";
import { Location, NavigateFunction } from "react-router-dom";
import { Model } from "../model";

export interface SignupProps {
    location?: Location;
}

export class SignupModel extends Model {
    constructor() {
        super(createStore(
            {name: 'signup'},
            withProps<SignupProps>({
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