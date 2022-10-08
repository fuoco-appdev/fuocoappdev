import { createStore, withProps } from "@ngneat/elf";
import { Location } from "react-router-dom";
import { Model } from "../model";

export interface SignupState {
    emailConfirmationSent: boolean;
    location?: Location;
}

export class SignupModel extends Model {
    constructor() {
        super(createStore(
            {name: 'signup'},
            withProps<SignupState>({
                emailConfirmationSent: false,
                location: undefined,
            }),
        ));
    }

    public get emailConfirmationSent(): boolean {
        return this.store.getValue().emailConfirmationSent;
    }

    public set emailConfirmationSent(emailConfirmationSent: boolean) {
        if (this.emailConfirmationSent !== emailConfirmationSent) {
            this.store.update((state) => ({...state, emailConfirmationSent: emailConfirmationSent}));
        }
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