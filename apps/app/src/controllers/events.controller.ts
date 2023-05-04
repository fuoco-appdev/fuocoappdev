/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { EventsModel } from '../models/events.model';

class EventsController extends Controller {
  private readonly _model: EventsModel;

  constructor() {
    super();

    this._model = new EventsModel();
  }

  public get model(): EventsModel {
    return this._model;
  }

  public initialize(): void {}

  public dispose(): void {}
}

export default new EventsController();
