/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { NotificationsModel } from '../models/notifications.model';

class NotificationsController extends Controller {
  private readonly _model: NotificationsModel;

  constructor() {
    super();

    this._model = new NotificationsModel();
  }

  public get model(): NotificationsModel {
    return this._model;
  }

  public initialize(renderCount: number): void {}

  public dispose(renderCount: number): void {}
}

export default new NotificationsController();
