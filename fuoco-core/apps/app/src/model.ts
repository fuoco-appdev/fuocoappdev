import {Store} from '@ngneat/elf';
import {Disposable} from './disposable';

export abstract class Model implements Disposable {
    private readonly _store: Store;

    constructor(store: Store) {
        this._store = store;
    }

    public get store(): Store {
        return this._store;
    }

    public dispose(): void {}
}