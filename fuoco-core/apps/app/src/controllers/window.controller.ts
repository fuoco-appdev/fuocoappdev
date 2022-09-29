import { select } from "@ngneat/elf";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { Subscription } from "rxjs";
import { Controller } from "../controller";
import { WindowModel } from "../models/window.model";
import { RoutePaths } from "../route-paths";
import AuthService from '../services/auth.service';

class WindowController extends Controller {
    private readonly _model: WindowModel;
    private _isAuthenticatedSubscription: Subscription | undefined;

    constructor() {
        super();

        this._model = new WindowModel();
        
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

        AuthService.supabaseClient.auth.onAuthStateChange(this.onAuthStateChanged)
    }

    public get model(): WindowModel {
        return this._model;
    }

    public initialize(): void {
        this._isAuthenticatedSubscription = this._model.store
            .pipe(select(store => store.isAuthenticated))
            .subscribe({
                next: (isAuthenticated: boolean) => {
                    if (!this._model.navigate) {
                        return;
                    }
                    console.log("unauthenticate");

                    if (isAuthenticated === true) {
                        this._model.navigate(RoutePaths.User);
                    }
                    else if (isAuthenticated === false) {
                        this._model.navigate(RoutePaths.Signin);
                    }
                }
        });
    }

    public dispose(): void {
        this._isAuthenticatedSubscription?.unsubscribe();
    }

    public updateIsSigninVisible(isVisible: boolean): void {
        this._model.isSigninVisible = isVisible;
    }

    public updateIsSignupVisible(isVisible: boolean): void {
        this._model.isSignupVisible = isVisible;
    }

    public updateIsSignoutVisible(isVisible: boolean): void {
        this._model.isSignoutVisible = isVisible;
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