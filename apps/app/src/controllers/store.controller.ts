/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { StoreModel } from '../models/store.model';

class StoreController extends Controller {
  private readonly _model: StoreModel;

  constructor() {
    super();

    this._model = new StoreModel();
  }

  public get model(): StoreModel {
    return this._model;
  }

  public initialize(): void {}

  public dispose(): void {}
}

export default new StoreController();
