import { Async, StateStorage } from '@ngneat/elf-persist-state';

export default class SessionStorage implements StateStorage {
  private readonly _data: Map<string, any>;

  constructor() {
    this._data = new Map<string, any>();
  }

  public getItem<T extends Record<string, any>>(
    key: string
  ): Async<T | null | undefined> {
    return Promise.resolve(this._data.get(key));
  }

  public setItem(key: string, value: Record<string, any>): Async<any> {
    this._data.set(key, value);
    return Promise.resolve([key, value]);
  }

  public removeItem(key: string): Async<boolean | void> {
    return Promise.resolve(this._data.delete(key));
  }
}
