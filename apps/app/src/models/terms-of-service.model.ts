import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';

export interface TermsOfServiceState {
    markdown: string;
}

export class TermsOfServiceModel extends Model {
    constructor() {
        super(createStore(
            {name: 'terms-of-service'},
            withProps<TermsOfServiceState>({
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