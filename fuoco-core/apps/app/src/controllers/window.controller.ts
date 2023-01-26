/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { Controller } from '../controller';
import { WindowModel } from '../models/window.model';
import { RoutePaths } from '../route-paths';
import AuthService from '../services/auth.service';
import WorldController from './world.controller';
import { Location } from 'react-router-dom';
import UserService from '../services/user.service';
import * as core from '../protobuf/core_pb';
import SecretsService from '../services/secrets.service';

class WindowController extends Controller {
  private readonly _model: WindowModel;
  private _scrollRef: HTMLDivElement | null;
  private _userSubscription: Subscription | undefined;

  constructor() {
    super();

    this._model = new WindowModel();
    this._scrollRef = null;

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);

    AuthService.supabaseClient.auth.onAuthStateChange(this.onAuthStateChanged);
  }

  public get model(): WindowModel {
    return this._model;
  }

  public get scrollRef(): HTMLDivElement | null {
    return this._scrollRef;
  }

  public set scrollRef(value: HTMLDivElement | null) {
    if (this._scrollRef !== value) {
      this._scrollRef = value;
    }
  }

  public initialize(): void {
    this._userSubscription = UserService.activeUserObservable.subscribe({
      next: (user: core.User | null) => {
        this._model.isAuthenticated = user ? true : false;
        this._model.user = user;
      },
    });
  }

  public async checkUserIsAuthenticatedAsync(): Promise<void> {
    this._model.isLoading = true;
    const user = await AuthService.requestUserAsync();
    if (!user) {
      this._model.isLoading = false;
    }
  }

  public dispose(): void {
    this._userSubscription?.unsubscribe();
  }

  public updateIsLoading(value: boolean): void {
    this._model.isLoading = value;
  }

  public updateAuthState(value: AuthChangeEvent): void {
    this._model.authState = value;
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
    switch (location.pathname) {
      case RoutePaths.Landing:
        this._model.isSigninVisible = true;
        this._model.isSignupVisible = false;
        this._model.isSignoutVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.Landing;
        break;
      case RoutePaths.Signin:
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = true;
        this._model.isSignoutVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.Signin;
        break;
      case RoutePaths.Signup:
        this._model.isSigninVisible = true;
        this._model.isSignupVisible = false;
        this._model.isSignoutVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.Signup;
        break;
      case RoutePaths.ForgotPassword:
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = true;
        this._model.isSignoutVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.ForgotPassword;
        break;
      case RoutePaths.ResetPassword:
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = UserService.activeUser === null;
        this._model.isSignoutVisible = UserService.activeUser !== null;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.ResetPassword;
        break;
      case RoutePaths.TermsOfService:
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = true;
        this._model.isSignoutVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.TermsOfService;
        break;
      case RoutePaths.PrivacyPolicy:
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = true;
        this._model.isSignoutVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.PrivacyPolicy;
        break;
      case RoutePaths.User:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.User;
        break;
      case RoutePaths.GetStarted:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.GetStarted;
        break;
      case RoutePaths.Account:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.Account;
        break;
      case RoutePaths.Apps:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.Apps;
        break;
      case RoutePaths.Billing:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.Billing;
        break;
      case RoutePaths.Admin:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.Admin;
        break;
      case RoutePaths.AdminAccount:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.AdminAccount;
        break;
      case RoutePaths.AdminUsers:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.AdminUsers;
        break;
      case RoutePaths.AdminApps:
        this._model.isSignoutVisible = true;
        this._model.isSigninVisible = false;
        this._model.isSignupVisible = false;
        this._model.isTabBarVisible = true;
        this._model.activeRoute = RoutePaths.AdminApps;
        break;
      default:
        this._model.isSigninVisible = UserService.activeUser === null;
        this._model.isSignupVisible = false;
        this._model.isSignoutVisible = UserService.activeUser !== null;
        this._model.isTabBarVisible = false;
        this._model.activeRoute = RoutePaths.Default;
        break;
    }
  }

  private async onAuthStateChanged(
    event: AuthChangeEvent,
    session: Session | null
  ): Promise<void> {
    if (session) {
      await SecretsService.requestAllAsync();
    }

    if (event === 'SIGNED_IN') {
      WorldController.updateIsError(false);
      try {
        await UserService.requestActiveAsync();
      } catch (error: any) {
        if (error.status !== 404) {
          console.error(error);
          return;
        }

        try {
          await UserService.requestCreateAsync();
        } catch (error: any) {
          console.error(error);
        }
      }
    } else if (event === 'SIGNED_OUT') {
      UserService.clearActiveUser();
      SecretsService.clearSecrets();
    } else if (event === 'USER_DELETED') {
      UserService.clearActiveUser();
      SecretsService.clearSecrets();
    }

    this._model.authState = event;
    this._model.isLoading = false;
  }
}

export default new WindowController();
