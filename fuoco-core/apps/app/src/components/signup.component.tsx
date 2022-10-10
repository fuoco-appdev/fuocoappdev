/* eslint-disable @typescript-eslint/no-empty-interface */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {Auth} from '@fuoco.appdev/core-ui';
import SignupController from '../controllers/signup.controller';
import WindowController from '../controllers/window.controller';
import styles from './signup.module.scss';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import { useObservable } from '@ngneat/use-observable';
import { Strings } from '../localization';
import { ApiError } from '@supabase/supabase-js';

export interface SignupProps {}

function AuthComponent(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<ApiError | null>(null)
  const [emailConfirmationSent, setEmailConfirmationSent] = useState<boolean>(false)

  useEffect(() => {
    WindowController.updateShowConfirmEmailAlert(emailConfirmationSent);
  }, [emailConfirmationSent])

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
      strings={{
        signUpWith: Strings.signUpWith,
        orContinueWith: Strings.orContinueWith,
        emailAddress: Strings.emailAddress,
        password: Strings.password,
        agreeToThe: Strings.agreeToThe,
        termsOfService: Strings.termsOfService,
        privacyPolicy: Strings.privacyPolicy,
        signUp: Strings.signUp,
        dontHaveAnAccount: Strings.dontHaveAnAccount
      }}
      emailErrorMessage={error ? Strings.emailErrorMessage : undefined}
      passwordErrorMessage={error ? Strings.passwordErrorMessage : undefined}
      supabaseClient={AuthService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => navigate(RoutePaths.Signup)}
      onSignupError={(error: ApiError) => setError(error)}
      onEmailConfirmationSent={() => { setEmailConfirmationSent(true) }}
      redirectTo={RoutePaths.User}
    />
  );
}

export default function SignupComponent(): JSX.Element {
    const location = useLocation();
    const [props] = useObservable(SignupController.model.store);
    SignupController.model.location = location;

    return (
      <div className={styles["root"]}>
          <div className={styles["content"]}>
            <AuthComponent />
          </div>
      </div>
    );
}