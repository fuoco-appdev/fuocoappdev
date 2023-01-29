import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface PrivacyPolicyState {
    markdown: string;
}

export class PrivacyPolicyModel extends Model {
    constructor() {
        super(createStore(
            {name: 'privacy-policy'},
            withProps<PrivacyPolicyState>({
                markdown: '',
            }),
        ));
    }

    public get markdown(): string {
        return this.store.getValue().markdown;
    }

    public set markdown(value: string) {
        if (this.markdown !== value) {
            this.store.update((state) => ({...state, markdown: value}));
        }
    }
}