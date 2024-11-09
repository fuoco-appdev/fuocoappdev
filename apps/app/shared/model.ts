import { makeObservable, observable, runInAction } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';
import { SerializableProperty } from 'mobx-persist-store/lib/esm2017/serializableProperty';
import { StoreOptions } from './store-options';

export class Model {
  @observable
  private _suspense: boolean;
  constructor(options: StoreOptions = {}) {
    makeObservable(this);

    runInAction(() => (this._suspense = false));

    if (options.strategy?.default) {
      makePersistable(this, {
        name: this.constructor.name.toLocaleLowerCase(),
        properties: options.persistableProperties?.default as (
          | keyof this
          | SerializableProperty<this, keyof this>
        )[],
        storage: options.strategy.default,
      });
    }

    if (options.persistableProperties?.session) {
      makePersistable(this, {
        name: `${this.constructor.name.toLocaleLowerCase()}-session`,
        properties: options.persistableProperties?.session as (
          | keyof this
          | SerializableProperty<this, keyof this>
        )[],
        storage: options.strategy?.session
          ? options.strategy.session
          : window.sessionStorage,
      });
    }

    if (options.persistableProperties?.local) {
      makePersistable(this, {
        name: `${this.constructor.name.toLocaleLowerCase()}-local`,
        properties: options.persistableProperties?.local as (
          | keyof this
          | SerializableProperty<this, keyof this>
        )[],
        storage: options.strategy?.local
          ? options.strategy.local
          : window.localStorage,
      });
    }
  }

  public get suspense(): boolean {
    return this._suspense;
  }

  public set suspense(value: boolean) {
    if (this.suspense !== value) {
      runInAction(() => (this.suspense = value));
    }
  }

  public dispose(): void {
    stopPersisting(this);
  }
}
