import { select } from "@ngneat/elf";
import { skipWhile, Subscription } from "rxjs";
import { Controller } from "../controller";
import { WindowModel } from "../models/window.model";
import { RoutePaths } from "../route-paths";

class WindowController extends Controller {
    private readonly _model: WindowModel;
    private readonly _locationSubscription: Subscription;

    constructor() {
        super();

        this._model = new WindowModel();
        
        this.onLocationChanged = this.onLocationChanged.bind(this);

        this._locationSubscription = this._model.store.pipe(select((model => model.location)))
        .pipe(skipWhile((location: Location) => location === undefined))
        .subscribe(this.onLocationChanged);
    }

    public get model(): WindowModel {
        return this._model;
    }

    public override dispose(): void {
        this._locationSubscription.unsubscribe();
    }

    private onLocationChanged(location: Location): void {
        switch(location.pathname) {
            case RoutePaths.Default:
                this._model.isSigninVisible = true;
                this._model.isSignupVisible = false;
                break;
            case RoutePaths.Landing:
                this._model.isSigninVisible = true;
                this._model.isSignupVisible = false;
                break;
            case RoutePaths.Signin:
                this._model.isSigninVisible = false;
                this._model.isSignupVisible = true;
                break;
            default:
                break;
        }
    }
}

export default new WindowController();