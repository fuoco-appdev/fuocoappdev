/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '../controller';
import { CartModel } from '../models/cart.model';

class CartController extends Controller {
  private readonly _model: CartModel;

  constructor() {
    super();

    this._model = new CartModel();
  }

  public get model(): CartModel {
    return this._model;
  }

  public initialize(): void {}

  public dispose(): void {}
}

export default new CartController();
