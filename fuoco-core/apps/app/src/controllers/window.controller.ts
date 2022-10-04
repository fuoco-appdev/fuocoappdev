/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { Subscription } from "rxjs";
import { Controller } from "../controller";
import { WindowModel } from "../models/window.model";
import { RoutePaths } from "../route-paths";
import AuthService from '../services/auth.service';
import { Location } from "react-router-dom";
import UserService from "../services/user.service";
import {core} from "../protobuf/core";

class WindowController extends Controller {
    private readonly _model: WindowModel;
    private _userSubscription: Subscription | undefined;

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
        this._userSubscription = UserService.activeUserObservable
            .subscribe({
                next: (user: core.User | null) => {
                    this._model.isAuthenticated = user ? true : false;
                }
            })
    }

    public dispose(): void {
        this._userSubscription?.unsubscribe();
    }

    public updateIsSigninVisible(isVisible: boolean): void {
        this._model.isSigninVisible = isVisible;
    }

    public updateIsSignupVisible(isVisible: boolean): void {
        this._model.isSignupVisible = isVisible;
    }

    public updateOnLocationChanged(location: Location): void {
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
          case RoutePaths.Signup:
            this._model.isSigninVisible = true;
            this._model.isSignupVisible = false;
            break;
          default:
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            break;
        }
      }

    private async onAuthStateChanged(event: AuthChangeEvent, session: Session | null): Promise<void> {
        if (event === 'SIGNED_IN') {
            if (UserService.activeUser) {
                return;
            }

            this._model.isLoading = true;

            try {
                await UserService.requestActiveUserAsync();
            }
            catch(error: any) {
                if (error.status !== 404) {
                    console.error(error);
                    return;
                }

                try {
                    await UserService.requestCreateUserAsync();
                }
                catch (error: any) {
                    console.error(error);
                }
            }
            
            this._model.isLoading = false;
        }
        else if(event === 'SIGNED_OUT') {
            UserService.clearActiveUser();
        }
        else if(event === 'USER_DELETED') {
            UserService.clearActiveUser();
        }
    }
}

export default new WindowController();