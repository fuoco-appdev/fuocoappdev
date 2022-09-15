import React from 'react';
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import {Auth} from '@fuoco.appdev/core-ui';
import SigninController from '../controllers/signin.controller';
import styles from './signin.module.scss';
import { SigninState } from '../models/signin.model';
import { Subscription } from 'rxjs';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import LoadingController from '../controllers/loading.controller';

export interface SigninProps {}

function AuthComponent(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Auth
      providers={[
        'spotify',
        'discord',
        'facebook',
        'github',
        'google',
        'twitch',
        'twitter',
      ]}
      view={'sign_in'}
      socialColors={true}
      supabaseClient={AuthService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => navigate(RoutePaths.Signup)}
      onAuthenticating={() => LoadingController.updateIsLoading(true)}
      redirectTo={RoutePaths.User}
    />
  );
}

class SigninComponent extends React.Component<SigninProps, SigninState> {
  private _stateSubscription: Subscription | undefined;
  
  public constructor(props: SigninProps) {
    super(props);

    this.state = SigninController.model.store.getValue();
  }

  public override componentDidMount(): void {
    this._stateSubscription = SigninController.model.store.subscribe({
      next: () => this.setState(SigninController.model.store.getValue())
    });
}

public override componentWillUnmount(): void {
    this._stateSubscription?.unsubscribe();
}

  public override render(): React.ReactNode {
      return (
        <div className={styles["root"]}>
          <div className={styles["content"]}>
            <AuthComponent />
          </div>
        </div>
      );
  }
}

export default function ReactiveSigninComponent(): JSX.Element {
  const location = useLocation();
  SigninController.model.location = location;
  
  return (<SigninComponent />);
}