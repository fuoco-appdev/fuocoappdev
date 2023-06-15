/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { TermsOfServiceModel } from '../models';

class TermsOfServiceController extends Controller {
  private readonly _model: TermsOfServiceModel;

  constructor() {
    super();

    this._model = new TermsOfServiceModel();
  }

  public get model(): TermsOfServiceModel {
    return this._model;
  }

  public override initialize(renderCount: number): void {
    fetch('../assets/markdown/terms_of_service.md')
      .then((res) => res.text())
      .then((md) => {
        this._model.markdown = md;
      });
  }

  public override dispose(renderCount: number): void {}
}

export default new TermsOfServiceController();
