import { Async, StateStorage } from '@ngneat/elf-persist-state';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorage implements StateStorage {
  public getItem<T extends Record<string, any>>(
    key: string
  ): Async<T | null | undefined> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key).then((value) => {
        if (!value) {
          resolve(undefined);
          return;
        }

        resolve(JSON.parse(value));
      });
    });
  }

  public setItem(key: string, value: Record<string, any>): Async<any> {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value[key]).then(() => {
        resolve([key, value]);
      });
    });
  }

  public removeItem(key: string): Async<boolean | void> {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key).then(() => {
        resolve(true);
      });
    });
  }
}
