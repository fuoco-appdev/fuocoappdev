import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {Auth} from '@fuoco.appdev/core-ui';
import SignupController from '../controllers/signup.controller';
import styles from './signup.module.scss';
import { SignupState } from '../models/signup.model';
import { Subscription } from 'rxjs';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import LoadingController from '../controllers/loading.controller';

export interface SignupProps {}

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
      view={'sign_up'}
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

class SignupComponent extends React.Component<SignupProps, SignupState> {
  private _stateSubscription: Subscription | undefined;
  
  public constructor(props: SignupProps) {
    super(props);

    this.state = SignupController.model.store.getValue();
  }

  public override componentDidMount(): void {
    this._stateSubscription = SignupController.model.store.asObservable().subscribe({
      next: () => this.setState(SignupController.model.store.getValue())
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

export default function ReactiveSignupComponent(): JSX.Element {
    const location = useLocation();
    SignupController.model.location = location;

    return (<SignupComponent />);
}