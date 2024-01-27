import { Store } from '@ngneat/elf';
import {
  localStorageStrategy,
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';
import { Disposable } from './disposable';

export abstract class Model {
  private readonly _store: Store;
  private readonly _sessionStore: Store | undefined;
  private readonly _localStore: Store | undefined;

  constructor(store: Store, sessionStore?: Store, localStore?: Store) {
    this._store = store;
    this._sessionStore = sessionStore;
    this._localStore = localStore;

    if (sessionStore) {
      persistState(sessionStore, {
        key: sessionStore.name,
        storage: sessionStorageStrategy,
      });
    }

    if (localStore) {
      persistState(localStore, {
        key: localStore.name,
        storage: localStorageStrategy,
      });
    }
  }

  public get store(): Store {
    return this._store;
  }

  public get sessionStore(): Store | undefined {
    return this._sessionStore;
  }

  public get localStore(): Store | undefined {
    return this._localStore;
  }
}
