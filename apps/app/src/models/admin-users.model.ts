import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';

export interface AdminUsersState {
  requestedUsers: core.User[];
  acceptedUsers: core.User[];
  updateRequestedUsers: core.User[];
  updateAcceptedUsers: core.User[];
  selectedUser: core.User | null;
  showRequestedModal: boolean;
  showAcceptedModal: boolean;
  showUpdateRequestedModal: boolean;
  showUpdateAcceptedModal: boolean;
}

export class AdminUsersModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'admin-users' },
        withProps<AdminUsersState>({
          requestedUsers: [],
          acceptedUsers: [],
          updateRequestedUsers: [],
          updateAcceptedUsers: [],
          selectedUser: null,
          showRequestedModal: false,
          showAcceptedModal: false,
          showUpdateRequestedModal: false,
          showUpdateAcceptedModal: false,
        })
      )
    );
  }

  public get requestedUsers(): core.User[] {
    return this.store.getValue().requestedUsers;
  }

  public set requestedUsers(value: core.User[]) {
    if (this.requestedUsers !== value) {
      this.store.update((state) => ({ ...state, requestedUsers: value }));
    }
  }

  public get acceptedUsers(): core.User[] {
    return this.store.getValue().acceptedUsers;
  }

  public set acceptedUsers(value: core.User[]) {
    if (this.acceptedUsers !== value) {
      this.store.update((state) => ({ ...state, acceptedUsers: value }));
    }
  }

  public get updateRequestedUsers(): core.User[] {
    return this.store.getValue().updateRequestedUsers;
  }

  public set updateRequestedUsers(value: core.User[]) {
    if (this.updateRequestedUsers !== value) {
      this.store.update((state) => ({ ...state, updateRequestedUsers: value }));
    }
  }

  public get updateAcceptedUsers(): core.User[] {
    return this.store.getValue().updateAcceptedUsers;
  }

  public set updateAcceptedUsers(value: core.User[]) {
    if (this.updateAcceptedUsers !== value) {
      this.store.update((state) => ({ ...state, updateAcceptedUsers: value }));
    }
  }

  public get selectedUser(): core.User | null {
    return this.store.getValue().selectedUser;
  }

  public set selectedUser(value: core.User | null) {
    if (this.selectedUser !== value) {
      this.store.update((state) => ({ ...state, selectedUser: value }));
    }
  }

  public get showRequestedModal(): boolean {
    return this.store.getValue().showRequestedModal;
  }

  public set showRequestedModal(value: boolean) {
    if (this.showRequestedModal !== value) {
      this.store.update((state) => ({ ...state, showRequestedModal: value }));
    }
  }

  public get showAcceptedModal(): boolean {
    return this.store.getValue().showAcceptedModal;
  }

  public set showAcceptedModal(value: boolean) {
    if (this.showAcceptedModal !== value) {
      this.store.update((state) => ({ ...state, showAcceptedModal: value }));
    }
  }

  public get showUpdateRequestedModal(): boolean {
    return this.store.getValue().showUpdateRequestedModal;
  }

  public set showUpdateRequestedModal(value: boolean) {
    if (this.showUpdateRequestedModal !== value) {
      this.store.update((state) => ({
        ...state,
        showUpdateRequestedModal: value,
      }));
    }
  }

  public get showUpdateAcceptedModal(): boolean {
    return this.store.getValue().showUpdateAcceptedModal;
  }

  public set showUpdateAcceptedModal(value: boolean) {
    if (this.showUpdateAcceptedModal !== value) {
      this.store.update((state) => ({
        ...state,
        showUpdateAcceptedModal: value,
      }));
    }
  }
}
