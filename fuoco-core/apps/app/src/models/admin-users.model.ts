import { createStore, withProps } from '@ngneat/elf';
import {Model} from '../model';
import {core} from "../protobuf/core";

export interface AdminUsersState {
    requestedUsers: core.User[];
    acceptedUsers: core.User[];
    updateRequestedUsers: core.User[];
}

export class AdminUsersModel extends Model {
    constructor() {
        super(createStore(
            {name: 'admin-users'},
            withProps<AdminUsersState>({
                requestedUsers: [],
                acceptedUsers: [],
                updateRequestedUsers: [],
            }),
        ));
    }

    public get requestedUsers(): core.User[] {
        return this.store.getValue().requestedUsers;
    }

    public set requestedUsers(value: core.User[]) {
        if (this.requestedUsers.length !== value.length) {
            this.store.update((state) => ({...state, requestedUsers: value}));
        }
    }

    public get acceptedUsers(): core.User[] {
        return this.store.getValue().acceptedUsers;
    }

    public set acceptedUsers(value: core.User[]) {
        if (this.acceptedUsers.length !== value.length) {
            this.store.update((state) => ({...state, acceptedUsers: value}));
        }
    }

    public get updateRequestedUsers(): core.User[] {
        return this.store.getValue().updateRequestedUsers;
    }

    public set updateRequestedUsers(value: core.User[]) {
        if (this.updateRequestedUsers.length !== value.length) {
            this.store.update((state) => ({...state, updateRequestedUsers: value}));
        }
    }
}
