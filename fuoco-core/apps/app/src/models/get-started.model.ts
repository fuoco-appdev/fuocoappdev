import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface GetStartedState {
    companyName: string;
    phoneNumber: string;
    comment: string;
}

export class GetStartedModel extends Model {
    constructor() {
        super(createStore(
            {name: 'get-started'},
            withProps<GetStartedState>({
                companyName: '',
                phoneNumber: '',
                comment: ''
            }),
        ));
    }

    public get companyName(): string {
        return this.store.getValue().companyName;
    }

    public set companyName(companyName: string) {
        if (this.companyName !== companyName) {
            this.store.update((state) => ({...state, companyName: companyName}));
        }
    }

    public get phoneNumber(): string {
        return this.store.getValue().phoneNumber;
    }

    public set phoneNumber(phoneNumber: string) {
        if (this.phoneNumber !== phoneNumber) {
            this.store.update((state) => ({...state, phoneNumber: phoneNumber}));
        }
    }

    public get comment(): string {
        return this.store.getValue().comment;
    }

    public set comment(comment: string) {
        if (this.comment !== comment) {
            this.store.update((state) => ({...state, comment: comment}));
        }
    }
}
