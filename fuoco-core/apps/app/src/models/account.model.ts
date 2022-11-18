import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';

export interface AccountState {
    company: string;
    updatedCompany: string;
    emailAddress: string;
    updatedEmailAddress: string;
    phoneNumber: string;
    updatedPhoneNumber: string;
    location: [number, number];
    updatedLocation: [number, number];
    language: string;
    updatedLanguage: string;
    isEmailAddressDisabled: boolean;
    isSaveDisabled: boolean;
}

export class AccountModel extends Model {
    constructor() {
        super(createStore(
            {name: 'account'},
            withProps<AccountState>({
                company: '',
                updatedCompany: '',
                emailAddress: '',
                updatedEmailAddress: '',
                phoneNumber: '',
                updatedPhoneNumber: '',
                location: [0, 0],
                updatedLocation: [0, 0],
                language: '',
                updatedLanguage: '',
                isEmailAddressDisabled: true,
                isSaveDisabled: true,
            }),
        ));
    }

    public get company(): string {
        return this.store.getValue().company;
    }

    public set company(value: string) {
        if (this.company !== value) {
            this.store.update((state) => ({...state, company: value}));
        }
    }

    public get updatedCompany(): string {
        return this.store.getValue().updatedCompany;
    }

    public set updatedCompany(value: string) {
        if (this.updatedCompany !== value) {
            this.store.update((state) => ({...state, updatedCompany: value}));
        }
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

    public get phoneNumber(): string {
        return this.store.getValue().phoneNumber;
    }

    public set phoneNumber(value: string) {
        if (this.phoneNumber !== value) {
            this.store.update((state) => ({...state, phoneNumber: value}));
        }
    }

    public get updatedPhoneNumber(): string {
        return this.store.getValue().updatedPhoneNumber;
    }

    public set updatedPhoneNumber(value: string) {
        if (this.updatedPhoneNumber !== value) {
            this.store.update((state) => ({...state, updatedPhoneNumber: value}));
        }
    }

    public get location(): [number, number] {
        return this.store.getValue().location;
    }

    public set location(value: [number, number]) {
        if (this.location !== value) {
            this.store.update((state) => ({...state, location: value}));
        }
    }

    public get updatedLocation(): [number, number] {
        return this.store.getValue().updatedLocation;
    }

    public set updatedLocation(value: [number, number]) {
        if (this.updatedLocation !== value) {
            this.store.update((state) => ({...state, updatedLocation: value}));
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
