import { select } from "@ngneat/elf";
import { skipWhile, Subscription } from "rxjs";
import { Controller } from "../controller";
import { SigninModel } from "../models/signin.model";
import LoadingController from "./loading.controller";

class SigninController extends Controller {
    private readonly _model: SigninModel;
    private readonly _locationSubscription: Subscription;

    constructor() {
        super();

        this._model = new SigninModel();
        
        this.onLocationChanged = this.onLocationChanged.bind(this);

        this._locationSubscription = this._model.store.pipe(select((model => model.location)))
        .pipe(skipWhile((location: Location) => location === undefined))
        .subscribe(this.onLocationChanged);
    }

    public get model(): SigninModel {
        return this._model;
    }

    public override dispose(): void {
        this._locationSubscription.unsubscribe();
    }

    private onLocationChanged(location: Location): void {
        if (!location?.search.includes('#access_token=')) {
            LoadingController.updateIsLoading(false);
        }
    }
}

export default new SigninController();