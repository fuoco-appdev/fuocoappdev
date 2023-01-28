/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { ResetPasswordModel } from '../models/reset-password.model';
import { Strings } from '../strings';
import WindowController from './window.controller';

class ResetPasswordController extends Controller {
  private readonly _model: ResetPasswordModel;

  constructor() {
    super();

    this._model = new ResetPasswordModel();
  }

  public get model(): ResetPasswordModel {
    return this._model;
  }

  public initialize(): void {}

  public dispose(): void {}

  public updatePasswordUpdatedToast(): void {
    WindowController.updateToasts([
      {
        key: `${Math.random()}`,
        message: Strings.passwordUpdated,
        description: Strings.passwordUpdatedDescription,
        type: 'success',
        closable: true,
      },
    ]);
  }
}

export default new ResetPasswordController();
