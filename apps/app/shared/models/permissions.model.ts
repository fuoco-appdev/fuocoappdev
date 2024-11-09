import { makeObservable, observable } from 'mobx';
import { Model } from '../model';
import { StoreOptions } from '../store-options';

export class PermissionsModel extends Model {
  @observable
  public accessLocation: boolean;
  @observable
  public arePermissionsActive: boolean | undefined;
  @observable
  public currentPosition: GeolocationPosition | undefined;
  constructor(options?: StoreOptions) {
    super(options);

    makeObservable(this);

    this.accessLocation = false;
    this.arePermissionsActive = undefined;
    this.currentPosition = undefined;
  }

  public updateAccessLocation(value: boolean) {
    if (this.accessLocation !== value) {
      this.accessLocation = value;
    }
  }

  public updateArePermissionsActive(value: boolean) {
    if (this.arePermissionsActive !== value) {
      this.arePermissionsActive = value;
    }
  }

  public updateCurrentPosition(value: GeolocationPosition | undefined) {
    if (JSON.stringify(this.currentPosition) !== JSON.stringify(value)) {
      this.currentPosition = value;
    }
  }
}
