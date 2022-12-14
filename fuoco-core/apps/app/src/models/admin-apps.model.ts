import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';

export interface AdminAppsState {
  apps: core.App[];
}

export class AdminAppsModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'admin-apps' },
        withProps<AdminAppsState>({
          apps: [],
        })
      )
    );
  }

  public get apps(): core.App[] {
    return this.store.getValue().apps;
  }

  public set apps(value: core.App[]) {
    if (this.apps.every((app, index) => app.equals(value[index]))) {
      this.store.update((state) => ({ ...state, apps: value }));
    }
  }
}
