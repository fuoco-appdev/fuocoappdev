import { createStore, Store, withProps } from '@ngneat/elf';
import {
  localStorageStrategy,
  persistState,
  sessionStorageStrategy,
} from '@ngneat/elf-persist-state';

export interface DebugState {
  suspense: boolean;
}

export class Model {
  private readonly _store: Store;
  private readonly _sessionStore: Store | undefined;
  private readonly _localStore: Store | undefined;
  private readonly _debugStore: Store;

  constructor(store: Store, sessionStore?: Store, localStore?: Store) {
    this._store = store;
    this._sessionStore = sessionStore;
    this._localStore = localStore;
    this._debugStore = createStore(
      { name: `${store.name}-debug` },
      withProps<DebugState>({
        suspense: false,
      })
    );

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

  public get debugStore(): Store {
    return this._debugStore;
  }

  public get suspense(): boolean {
    return this.debugStore.getValue().suspense;
  }

  public set suspense(value: boolean) {
    if (this.suspense !== value) {
      this.debugStore.update((state) => ({ ...state, suspense: value }));
    }
  }
}
