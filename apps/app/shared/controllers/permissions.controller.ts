/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from "../controller";
import { PermissionsModel } from "../models/permissions.model";

class PermissionsController extends Controller {
  private readonly _model: PermissionsModel;

  constructor() {
    super();

    this._model = new PermissionsModel();
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

  public override disposeInitialization(_renderCount: number): void {}

  public override disposeLoad(_renderCount: number): void {}

  public updateAccessLocation(value: boolean): void {
    this._model.accessLocation = value;
  }

  public updateCurrentPosition(value: GeolocationPosition | undefined): void {
    this._model.currentPosition = value;
    this._model.accessLocation = Boolean(value);
  }

  public async checkPermissionsAsync(): Promise<boolean> {
    try {
      if (!this._model.currentPosition) {
        const position = await this.getCurrentPositionAsync();
        this.updateCurrentPosition(position);
      }
    } catch (error: any) {
      this.updateCurrentPosition(undefined);
      this._model.arePermissionsActive = false;
      console.error(error);
      return false;
    }

    this._model.arePermissionsActive = true;
    return true;
  }

  private async getCurrentPositionAsync(): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
      );
    });
  }
}

export default new PermissionsController();
