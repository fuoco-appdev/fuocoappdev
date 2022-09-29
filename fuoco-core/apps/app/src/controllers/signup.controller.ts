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
}

export default new SignupController();