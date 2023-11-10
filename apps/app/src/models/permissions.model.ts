import { createStore, withProps } from '@ngneat/elf';
import { Model } from '../model';
import * as core from '../protobuf/core_pb';

export interface PermissionsState {
  accessLocation: boolean;
  arePermissionsActive: boolean | undefined;
  currentPosition: GeolocationPosition | undefined;
}

export class PermissionsModel extends Model {
  constructor() {
    super(
      createStore(
        { name: 'permissions' },
        withProps<PermissionsState>({
          accessLocation: false,
          arePermissionsActive: undefined,
          currentPosition: undefined,
        })
      )
    );
  }

  public get accessLocation(): boolean {
    return this.store?.getValue().accessLocation;
  }

  public set accessLocation(value: boolean) {
    if (this.accessLocation !== value) {
      this.store?.update((state) => ({
        ...state,
        accessLocation: value,
      }));
    }
  }

  public get arePermissionsActive(): boolean {
    return this.store?.getValue().arePermissionsActive;
  }

  public set arePermissionsActive(value: boolean) {
    if (this.arePermissionsActive !== value) {
      this.store?.update((state) => ({
        ...state,
        arePermissionsActive: value,
      }));
    }
  }

  public get currentPosition(): GeolocationPosition | undefined {
    return this.localStore?.getValue().currentPosition;
  }

  public set currentPosition(value: GeolocationPosition | undefined) {
    if (JSON.stringify(this.currentPosition) !== JSON.stringify(value)) {
      this.store?.update((state) => ({
        ...state,
        currentPosition: value,
      }));
    }
  }
}
