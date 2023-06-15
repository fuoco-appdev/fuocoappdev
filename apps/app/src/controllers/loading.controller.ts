/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { LoadingModel } from '../models/loading.model';

class LoadingController extends Controller {
  private readonly _model: LoadingModel;

  constructor() {
    super();

    this._model = new LoadingModel();
  }

  public get model(): LoadingModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {}

  public override dispose(renderCount: number): void {}

  public updateIsLoading(isLoading: boolean): void {
    this._model.isLoading = isLoading;
  }
}

export default new LoadingController();
