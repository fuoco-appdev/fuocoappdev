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

  public override initialize(renderCount: number): void {}

  public override load(renderCount: number): void {}

  public override disposeInitialization(renderCount: number): void {}

  public override disposeLoad(renderCount: number): void {}
}

export default new NotificationsController();
