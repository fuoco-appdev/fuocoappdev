/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SigninController from '../controllers/signin.controller';
import styles from './signin.module.scss';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import WorldController from '../controllers/world.controller';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';

function SigninDesktopComponent({ children }: any): JSX.Element {
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

function SigninMobileComponent({ children }: any): JSX.Element {
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

export interface SigninProps {}

export default function SigninComponent(): JSX.Element {
  const location = useLocation();
  SigninController.model.location = location;
  const navigate = useNavigate();
  const [error, setError] = useState<AuthError | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    WorldController.updateIsError(error !== null);
  }, [error]);

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
      view={'sign_in'}
      socialColors={true}
      strings={{
        signInWith: t('signInWith') ?? '',
        orContinueWith: t('orContinueWith') ?? '',
        emailAddress: t('emailAddress') ?? '',
        password: t('password') ?? '',
        rememberMe: t('rememberMe') ?? '',
        forgotYourPassword: t('forgotYourPassword') ?? '',
        signIn: t('signIn') ?? '',
        dontHaveAnAccount: t('dontHaveAnAccount') ?? '',
      }}
      emailErrorMessage={error ? t('emailErrorMessage') ?? '' : undefined}
      passwordErrorMessage={error ? t('passwordErrorMessage') ?? '' : undefined}
      supabaseClient={AuthService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => navigate(RoutePaths.Signup)}
      onSigninError={(error: AuthError) => setError(error)}
    />
  );
  return (
    <>
      <ResponsiveDesktop>
        <SigninDesktopComponent>{auth}</SigninDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <SigninMobileComponent>{auth}</SigninMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
