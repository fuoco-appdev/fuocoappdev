import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface ResetPasswordState {
    accessToken: string | undefined;
}

export class ResetPasswordModel extends Model {
    constructor() {
        super(createStore(
            {name: 'reset-password'},
            withProps<ResetPasswordState>({
                accessToken: undefined,
            }),
        ));
    }

    public get accessToken(): string | undefined {
        return this.store.getValue().accessToken;
    }

    public set accessToken(accessToken: string | undefined) {
        if (this.accessToken !== accessToken) {
            this.store.update((state) => ({...state, accessToken: accessToken}));
        }
    }
}