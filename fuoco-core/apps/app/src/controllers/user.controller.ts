/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from "../controller";
import { UserModel } from "../models/user.model";

class UserController extends Controller {
    private readonly _model: UserModel;

    constructor() {
        super();

        this._model = new UserModel();
    }

    public get model(): UserModel {
        return this._model;
    }

    public initialize(): void {
 
    }

    public dispose(): void {

    }
}

export default new UserController();