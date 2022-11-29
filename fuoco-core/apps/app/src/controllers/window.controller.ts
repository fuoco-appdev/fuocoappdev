/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { Subscription } from "rxjs";
import { Controller } from "../controller";
import { WindowModel } from "../models/window.model";
import { RoutePaths } from "../route-paths";
import AuthService from '../services/auth.service';
import WorldController from './world.controller';
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
            });
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

    public updateShowConfirmEmailAlert(show: boolean): void {
        this._model.showConfirmEmailAlert = show;
    }

    public updateShowPasswordResetAlert(show: boolean): void {
        this._model.showPasswordResetAlert = show;
    }

    public updateShowPasswordUpdatedAlert(show: boolean): void {
        this._model.showPasswordUpdatedAlert = show;
    }

    public updateOnLocationChanged(location: Location): void {
        switch(location.pathname) {
          case RoutePaths.Landing:
            this._model.isSigninVisible = true;
            this._model.isSignupVisible = false;
            this._model.isSignoutVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.Landing;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.Signin:
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = true;
            this._model.isSignoutVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.Signin;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.Signup:
            this._model.isSigninVisible = true;
            this._model.isSignupVisible = false;
            this._model.isSignoutVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.Signup;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.ForgotPassword:
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = true;
            this._model.isSignoutVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.ForgotPassword;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.ResetPassword:
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = UserService.activeUser === null;
            this._model.isSignoutVisible = UserService.activeUser !== null;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.ResetPassword;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.TermsOfService:
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = true;
            this._model.isSignoutVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.TermsOfService;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.PrivacyPolicy:
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = true;
            this._model.isSignoutVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.PrivacyPolicy;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.User:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.User;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.GetStarted:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.GetStarted;
            WorldController.updateIsVisible(true);
            break;
          case RoutePaths.Account:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.Account;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.Apps:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.Apps;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.Billing:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.Billing;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.Admin:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.Admin;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.AdminAccount:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.AdminAccount;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.AdminUsers:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.AdminUsers;
            WorldController.updateIsVisible(false);
            break;
          case RoutePaths.AdminApps:
            this._model.isSignoutVisible = true;
            this._model.isSigninVisible = false;
            this._model.isSignupVisible = false;
            this._model.isTabBarVisible = true;
            this._model.activeRoute = RoutePaths.AdminApps;
            WorldController.updateIsVisible(false);
            break;
          default:
            this._model.isSigninVisible = UserService.activeUser === null;
            this._model.isSignupVisible = false;
            this._model.isSignoutVisible = UserService.activeUser !== null;
            this._model.isTabBarVisible = false;
            this._model.activeRoute = RoutePaths.Default;
            WorldController.updateIsVisible(true);
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