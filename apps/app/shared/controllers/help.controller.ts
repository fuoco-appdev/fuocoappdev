/* eslint-disable @typescript-eslint/no-empty-function */
import { DIContainer } from 'rsdi';
import { Controller } from '../controller';
import { HelpModel } from '../models';
import { StoreOptions } from '../store-options';

export default class HelpController extends Controller {
  private readonly _model: HelpModel;

  constructor(
    private readonly _container: DIContainer<{}>,
    private readonly _storeOptions: StoreOptions
  ) {
    super();

    this._model = new HelpModel(this._storeOptions);
  }

  public get model(): HelpModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {}

  public override load(renderCount: number): void {
    fetch('../assets/markdown/help.md')
      .then((res) => res.text())
      .then((md) => {
        this._model.markdown = md;
      });
  }

  public override disposeInitialization(_renderCount: number): void {
    this._model.dispose();
  }

  public override disposeLoad(_renderCount: number): void {}
}
