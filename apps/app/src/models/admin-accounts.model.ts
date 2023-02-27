import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';

export interface AdminAccountsState {
  requestedAccounts: core.Account[];
  acceptedAccounts: core.Account[];
  updateRequestedAccounts: core.Account[];
  updateAcceptedAccounts: core.Account[];
  selectedAccount: core.Account | null;
  showRequestedModal: boolean;
  showAcceptedModal: boolean;
  showUpdateRequestedModal: boolean;
  showUpdateAcceptedModal: boolean;
}

export class AdminAccountsModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'admin-accounts' },
        withProps<AdminAccountsState>({
          requestedAccounts: [],
          acceptedAccounts: [],
          updateRequestedAccounts: [],
          updateAcceptedAccounts: [],
          selectedAccount: null,
          showRequestedModal: false,
          showAcceptedModal: false,
          showUpdateRequestedModal: false,
          showUpdateAcceptedModal: false,
        })
      )
    );
  }

  public get requestedAccounts(): core.Account[] {
    return this.store.getValue().requestedAccounts;
  }

  public set requestedAccounts(value: core.Account[]) {
    if (this.requestedAccounts !== value) {
      this.store.update((state) => ({ ...state, requestedAccounts: value }));
    }
  }

  public get acceptedAccounts(): core.Account[] {
    return this.store.getValue().acceptedAccounts;
  }

  public set acceptedAccounts(value: core.Account[]) {
    if (this.acceptedAccounts !== value) {
      this.store.update((state) => ({ ...state, acceptedAccounts: value }));
    }
  }

  public get updateRequestedAccounts(): core.Account[] {
    return this.store.getValue().updateRequestedAccounts;
  }

  public set updateRequestedAccounts(value: core.Account[]) {
    if (this.updateRequestedAccounts !== value) {
      this.store.update((state) => ({
        ...state,
        updateRequestedAccounts: value,
      }));
    }
  }

  public get updateAcceptedAccounts(): core.Account[] {
    return this.store.getValue().updateAcceptedAccounts;
  }

  public set updateAcceptedAccounts(value: core.Account[]) {
    if (this.updateAcceptedAccounts !== value) {
      this.store.update((state) => ({
        ...state,
        updateAcceptedAccounts: value,
      }));
    }
  }

  public get selectedAccount(): core.Account | null {
    return this.store.getValue().selectedAccount;
  }

  public set selectedAccount(value: core.Account | null) {
    if (this.selectedAccount !== value) {
      this.store.update((state) => ({ ...state, selectedAccount: value }));
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
