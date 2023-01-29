/* eslint-disable @typescript-eslint/no-empty-interface */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth, AuthErrorType } from '@fuoco.appdev/core-ui';
import SignupController from '../controllers/signup.controller';
import WindowController from '../controllers/window.controller';
import WorldController from '../controllers/world.controller';
import styles from './signup.module.scss';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import { useObservable } from '@ngneat/use-observable';
import { Strings } from '../strings';
import { AuthError } from '@supabase/supabase-js';
import { animated, config, useTransition } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function SignupDesktopComponent({ children }: any): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    return () => {
      setShow(false);
    };
  }, []);

  const transitions = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
        {transitions(
          (style, item) =>
            item && <animated.div style={style}>{children}</animated.div>
        )}
      </div>
    </div>
  );
}

function SignupMobileComponent({ children }: any): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    return () => {
      setShow(false);
    };
  }, []);

  const transitions = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        {transitions(
          (style, item) =>
            item && <animated.div style={style}>{children}</animated.div>
        )}
      </div>
    </div>
  );
}

export interface SignupProps {}

export default function SignupComponent(): JSX.Element {
  const location = useLocation();
  SignupController.model.location = location;
  const navigate = useNavigate();
  const [errorType, setErrorType] = useState<AuthErrorType | null>(null);

  useEffect(() => {
    WorldController.updateIsError(errorType !== null);
  }, [errorType]);

  const auth = (
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
        dontHaveAnAccount: Strings.dontHaveAnAccount,
      }}
      emailErrorMessage={
        errorType === AuthErrorType.BadAuthentication
          ? Strings.emailErrorMessage
          : undefined
      }
      passwordErrorMessage={
        errorType === AuthErrorType.BadAuthentication
          ? Strings.passwordErrorMessage
          : undefined
      }
      confirmPasswordErrorMessage={
        errorType === AuthErrorType.ConfirmPasswordNoMatch
          ? Strings.confirmPasswordErrorMessage
          : undefined
      }
      supabaseClient={AuthService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => navigate(RoutePaths.Signup)}
      onSignupError={(error: AuthError, type: AuthErrorType) =>
        setErrorType(type)
      }
      onEmailConfirmationSent={() => {
        WindowController.updateShowConfirmEmailAlert(true);
        WorldController.updateIsError(false);
      }}
    />
  );

  return (
    <>
      <ResponsiveDesktop>
        <SignupDesktopComponent>{auth}</SignupDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <SignupMobileComponent>{auth}</SignupMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
