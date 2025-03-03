/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { PermissionsModel } from '../models/permissions.model';
import { StoreOptions } from '../store-options';

export default class PermissionsController extends Controller {
  private readonly _model: PermissionsModel;

  constructor(
    private readonly _container: DIContainer<{}>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new PermissionsModel(this._storeOptions);
  }

  public get model(): PermissionsModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    if (renderCount <= 1) {
      this.checkPermissionsAsync();
    }
  }

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}

  public updateAccessLocation(value: boolean): void {
    this._model.accessLocation = value;
  }

  public updateCurrentPosition(value: GeolocationPosition | undefined): void {
    this._model.currentPosition = value;
    this._model.accessLocation = Boolean(value);
  }

  public async checkPermissionsAsync(): Promise<boolean> {
    this._model.arePermissionsActive = true;
    return true;
  }
}
