import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface AdminAccountState {
    emailAddress: string;
    updatedEmailAddress: string;
    language: string;
    updatedLanguage: string;
    isEmailAddressDisabled: boolean;
    isSaveDisabled: boolean;
}

export class AdminAccountModel extends Model {
    constructor() {
        super(createStore(
            {name: 'admin-account'},
            withProps<AdminAccountState>({
                emailAddress: '',
                updatedEmailAddress: '',
                language: '',
                updatedLanguage: '',
                isEmailAddressDisabled: true,
                isSaveDisabled: true,
            }),
        ));
    }

    public get emailAddress(): string {
        return this.store.getValue().emailAddress;
    }

    public set emailAddress(value: string) {
        if (this.emailAddress !== value) {
            this.store.update((state) => ({...state, emailAddress: value}));
        }
    }

    public get updatedEmailAddress(): string {
        return this.store.getValue().updatedEmailAddress;
    }

    public set updatedEmailAddress(value: string) {
        if (this.updatedEmailAddress !== value) {
            this.store.update((state) => ({...state, updatedEmailAddress: value}));
        }
    }

    public get language(): string {
        return this.store.getValue().language;
    }

    public set language(value: string) {
        if (this.language !== value) {
            this.store.update((state) => ({...state, language: value}));
        }
    }

    public get updatedLanguage(): string {
        return this.store.getValue().updatedLanguage;
    }

    public set updatedLanguage(value: string) {
        if (this.updatedLanguage !== value) {
            this.store.update((state) => ({...state, updatedLanguage: value}));
        }
    }

    public get isEmailAddressDisabled(): boolean {
        return this.store.getValue().isEmailAddressDisabled;
    }

    public set isEmailAddressDisabled(value: boolean) {
        if (this.isEmailAddressDisabled !== value) {
            this.store.update((state) => ({...state, isEmailAddressDisabled: value}));
        }
    }

    public get isSaveDisabled(): boolean {
        return this.store.getValue().isSaveDisabled;
    }

    public set isSaveDisabled(value: boolean) {
        if (this.isSaveDisabled !== value) {
            this.store.update((state) => ({...state, isSaveDisabled: value}));
        }
    }
}
