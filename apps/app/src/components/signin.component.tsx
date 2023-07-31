/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SigninController from '../controllers/signin.controller';
import styles from './signin.module.scss';
import SupabaseService from '../services/supabase.service';
import { RoutePaths } from '../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
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

  const auth = (
    <Auth
      classNames={{
        socialAuth: {
          socialButton: {
            button: {
              button: styles['social-button'],
            },
          },
          divider: {
            divider: styles['social-divider'],
            content: styles['social-divider-content'],
          },
        },
        emailAuth: {
          input: {
            formLayout: {
              label: styles['auth-input-form-layout-label'],
            },
            input: styles['auth-input'],
            container: styles['auth-input-container'],
          },
          checkbox: {
            checkbox: styles['auth-checkbox'],
            labelContainerLabel: styles['auth-checkbox-label-container-label'],
          },
          emailButton: {
            button: styles['auth-email-button'],
          },
        },
      }}
      rippleProps={{
        socialButton: {
          color: 'rgba(133, 38, 122, .35)',
        },
        submitButton: {
          color: 'rgba(233, 33, 66, .35)',
        },
      }}
      defaultIconColor={'#2A2A5F'}
      litIconColor={'#2A2A5F'}
      providers={['facebook', 'google', 'twitter']}
      view={'sign_in'}
      socialColors={false}
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
      supabaseClient={SupabaseService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => navigate(RoutePaths.Signup)}
      onSigninError={(error: AuthError) => setError(error)}
      redirectTo={RoutePaths.Account}
    />
  );
  return (
    <>
      <ResponsiveDesktop>
        <SigninDesktopComponent>
          <div className={styles['signin-container']}>{auth}</div>
        </SigninDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <SigninMobileComponent>{auth}</SigninMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
