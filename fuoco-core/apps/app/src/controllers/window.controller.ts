import { select } from "@ngneat/elf";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { skipWhile, Subscription, tap } from "rxjs";
import { Controller } from "../controller";
import { WindowModel } from "../models/window.model";
import { RoutePaths } from "../route-paths";
import AuthService from '../services/auth.service';

class WindowController extends Controller {
    private readonly _model: WindowModel;
    private readonly _locationSubscription: Subscription;

    constructor() {
        super();

        this._model = new WindowModel();
        
        this.onLocationChanged = this.onLocationChanged.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        AuthService.supabaseClient.auth.onAuthStateChange(this.onAuthStateChanged)

        this._locationSubscription = this._model.store
        .pipe(select((model => model.location)))
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
                this._model.isSignoutVisible = false;
                break;
            case RoutePaths.Landing:
                this._model.isSigninVisible = true;
                this._model.isSignupVisible = false;
                this._model.isSignoutVisible = false;
                break;
            case RoutePaths.Signin:
                this._model.isSigninVisible = false;
                this._model.isSignupVisible = true;
                this._model.isSignoutVisible = false;
                break;
            case RoutePaths.Signup:
                this._model.isSigninVisible = true;
                this._model.isSignupVisible = false;
                this._model.isSignoutVisible = false;
                break;
            default:
                break;
        }

        if (location.pathname.includes(RoutePaths.Account)) {
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isSignoutVisible = true;
        }
    }

    private onAuthStateChanged(event: AuthChangeEvent, session: Session | null): void {
        if (event === 'SIGNED_IN') {
            this._model.isAuthenticated = true;
        }
        else if(event === 'SIGNED_OUT') {
            this._model.isAuthenticated = false;
        }
        else if(event === 'USER_DELETED') {
            this._model.isAuthenticated = false;
        }
    }
}

export default new WindowController();