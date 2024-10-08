/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { HelpModel } from '../models';

class HelpController extends Controller {
  private readonly _model: HelpModel;

  constructor() {
    super();

    this._model = new HelpModel();
  }

  public get model(): HelpModel {
    return this._model;
  }

  public override initialize(_renderCount: number): void {}

  public override load(renderCount: number): void {
    if (renderCount > 1) {
      return;
    }
    fetch('../assets/markdown/help.md')
      .then((res) => res.text())
      .then((md) => {
        this._model.markdown = md;
      });
  }

  public override disposeInitialization(_renderCount: number): void {}

  public override disposeLoad(_renderCount: number): void {}
}

export default new HelpController();
