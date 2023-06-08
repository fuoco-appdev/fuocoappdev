import { Controller } from '../controller';
import { CheckoutModel } from '../models/checkout.model';

class CheckoutController extends Controller {
  private readonly _model: CheckoutModel;

  constructor() {
    super();

    this._model = new CheckoutModel();
  }

  public get model(): CheckoutModel {
    return this._model;
  }

  public initialize(renderCount: number): void {}

  public dispose(renderCount: number): void {}
}

export default new CheckoutController();
