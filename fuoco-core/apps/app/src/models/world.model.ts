import { createStore, withProps } from '@ngneat/elf';
import { Location } from 'react-router-dom';
import { Model } from '../model';
import { App, User } from '../protobuf/core_pb';

export interface WorldState {
  isVisible: boolean;
  isError: boolean;
  apps: App[];
  users: User[];
  location?: Location;
  opacity?: number;
}

export class WorldModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'world' },
        withProps<WorldState>({
          location: undefined,
          isVisible: true,
          apps: [],
          users: [],
          isError: false,
          opacity: 1,
        })
      )
    );
  }

  public get isVisible(): boolean {
    return this.store.getValue().isVisible;
  }

  public set isVisible(isVisible: boolean) {
    if (this.isVisible !== isVisible) {
      this.store.update((state) => ({ ...state, isVisible: isVisible }));
    }
  }

  public get apps(): App[] {
    return this.store.getValue().apps;
  }

  public set apps(value: App[]) {
    if (this.apps.every((app, index) => !app.equals(value[index]))) {
      this.store.update((state) => ({ ...state, apps: value }));
    }
  }

  public get users(): User[] {
    return this.store.getValue().users;
  }

  public set users(value: User[]) {
    if (this.users.every((user, index) => !user.equals(value[index]))) {
      this.store.update((state) => ({ ...state, users: value }));
    }
  }

  public get isError(): boolean {
    return this.store.getValue().isError;
  }

  public set isError(value: boolean) {
    if (this.isError !== value) {
      this.store.update((state) => ({ ...state, isError: value }));
    }
  }

  public get location(): Location {
    return this.store.getValue().location;
  }

  public set location(location: Location) {
    if (this.location !== location) {
      this.store.update((state) => ({ ...state, location: location }));
    }
  }

  public get opacity(): number {
    return this.store.getValue().opacity;
  }

  public set opacity(value: number) {
    if (this.opacity !== value) {
      this.store.update((state) => ({ ...state, opacity: value }));
    }
  }
}
