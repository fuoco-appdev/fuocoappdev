import { StorageController } from 'mobx-persist-store';
import { SerializableProperty } from 'mobx-persist-store/lib/esm2017/serializableProperty';

export interface StoreStrategy {
  default?: StorageController;
  local?: StorageController;
  session?: StorageController;
}

export interface StorePersistableProperties {
  default?: (keyof any | SerializableProperty<any, keyof any>)[];
  local?: (keyof any | SerializableProperty<any, keyof any>)[];
  session?: (keyof any | SerializableProperty<any, keyof any>)[];
}

export interface StoreOptions {
  strategy?: StoreStrategy;
  persistableProperties?: StorePersistableProperties;
}
