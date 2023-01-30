import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';

export interface AdminAppsState {
  apps: core.App[];
  users: core.User[];
  showDeleteModal: boolean;
  selectedAppId?: string;
}

export class AdminAppsModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'admin-apps' },
        withProps<AdminAppsState>({
          apps: [],
          users: [],
          showDeleteModal: false,
          selectedAppId: undefined,
        })
      )
    );
  }

  public get apps(): core.App[] {
    return this.store.getValue().apps;
  }

  public set apps(value: core.App[]) {
    if (this.apps.every((app, index) => !app.equals(value[index]))) {
      this.store.update((state) => ({ ...state, apps: value }));
    }
  }

  public get users(): core.User[] {
    return this.store.getValue().users;
  }

  public set users(value: core.User[]) {
    if (this.users.every((user, index) => !user.equals(value[index]))) {
      this.store.update((state) => ({ ...state, users: value }));
    }
  }

  public get showDeleteModal(): boolean {
    return this.store.getValue().showDeleteModal;
  }

  public set showDeleteModal(value: boolean) {
    if (this.showDeleteModal !== value) {
      this.store.update((state) => ({ ...state, showDeleteModal: value }));
    }
  }

  public get selectedAppId(): string | undefined {
    return this.store.getValue().selectedAppId;
  }

  public set selectedAppId(value: string | undefined) {
    if (this.selectedAppId !== value) {
      this.store.update((state) => ({ ...state, selectedAppId: value }));
    }
  }
}