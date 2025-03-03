/* eslint-disable @typescript-eslint/no-empty-function */
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { LandingModel } from '../models/landing.model';
import { StoreOptions } from '../store-options';

export default class LandingController extends Controller {
  private readonly _model: LandingModel;

  constructor(
    private readonly _container: DIContainer,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new LandingModel(this._storeOptions);
  }

  public get model(): LandingModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {}

  public override load(_renderCount: number): void {}

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}
}
