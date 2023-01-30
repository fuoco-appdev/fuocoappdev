/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from "../controller";
import { SignupModel } from "../models/signup.model";

class SignupController extends Controller {
    private readonly _model: SignupModel;

    constructor() {
        super();

        this._model = new SignupModel();
    }

    public get model(): SignupModel {
        return this._model;
    }

    public initialize(): void {}

    public dispose(): void {}

    public updateEmailConfirmationSent(emailConfirmationSent: boolean): void {
        this._model.emailConfirmationSent = emailConfirmationSent;
    }
}

export default new SignupController();