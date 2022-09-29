/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from "../controller";
import { LandingModel } from "../models/loading.model";

class LoadingController extends Controller {
    private readonly _model: LandingModel;

    constructor() {
        super();

        this._model = new LandingModel();
    }

    public get model(): LandingModel {
        return this._model;
    }

    public initialize(): void {}

    public dispose(): void {}

    public updateIsLoading(isLoading: boolean): void {
        this._model.isLoading = isLoading;
    }
}

export default new LoadingController();