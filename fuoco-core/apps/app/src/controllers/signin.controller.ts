/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from "../controller";
import { SigninModel } from "../models/signin.model";

class SigninController extends Controller {
    private readonly _model: SigninModel;

    constructor() {
        super();

        this._model = new SigninModel();
    }

    public get model(): SigninModel {
        return this._model;
    }

    public initialize(): void {}

    public dispose(): void {}
}

export default new SigninController();