/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { HomeModel } from '../models/home.model';

class HomeController extends Controller {
  private readonly _model: HomeModel;

  constructor() {
    super();

    this._model = new HomeModel();
  }

  public get model(): HomeModel {
    return this._model;
  }

  public initialize(): void {}

  public dispose(): void {}
}

export default new HomeController();
