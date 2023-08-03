/* eslint-disable @typescript-eslint/no-empty-interface */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SignupController from '../controllers/signup.controller';
import WindowController from '../controllers/window.controller';
import styles from './signup.module.scss';
import SupabaseService from '../services/supabase.service';
import { RoutePaths } from '../route-paths';
import { useObservable } from '@ngneat/use-observable';
import { useTranslation } from 'react-i18next';
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
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    if (authError?.status === 400) {
      setEmailError(t('userAlreadyRegistered') ?? '');
      setPasswordError(t('userAlreadyRegistered') ?? '');
    } else if (authError?.status === 429) {
      WindowController.addToast({
        key: `signup-too-many-requests-${Math.random()}`,
        message: t('authTooManyRequests') ?? '',
        description: t('authTooManyRequestsDescription') ?? '',
        type: 'error',
      });
    } else {
      WindowController.addToast({
        key: `signup-${Math.random()}`,
        message: authError?.name,
        description: authError?.message,
        type: 'error',
      });
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [authError]);

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
      providers={['facebook', 'google']}
      view={'sign_up'}
      socialColors={false}
      strings={{
        signUpWith: t('signUpWith') ?? '',
        orContinueWith: t('orContinueWith') ?? '',
        emailAddress: t('emailAddress') ?? '',
        password: t('password') ?? '',
        confirmPassword: t('confirmPassword') ?? '',
        agreeToThe: t('agreeToThe') ?? '',
        termsOfService: t('termsOfService') ?? '',
        privacyPolicy: t('privacyPolicy') ?? '',
        signUp: t('signUp') ?? '',
        doYouHaveAnAccount: t('doYouHaveAnAccount') ?? '',
      }}
      emailErrorMessage={emailError}
      passwordErrorMessage={passwordError}
      confirmPasswordErrorMessage={confirmPasswordError}
      supabaseClient={SupabaseService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => {
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        navigate(RoutePaths.Signup);
      }}
      onSignupError={(error: AuthError) => setAuthError(error)}
      onEmailConfirmationSent={() => {
        WindowController.addToast({
          key: 'signup-email-confirmation-sent',
          message: t('emailConfirmation') ?? '',
          description: t('emailConfirmationDescription') ?? '',
          type: 'loading',
        });
      }}
      redirectTo={window.location.origin}
    />
  );

  return (
    <>
      <ResponsiveDesktop>
        <SignupDesktopComponent>
          <div className={styles['signup-container']}>{auth}</div>
        </SignupDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <SignupMobileComponent>{auth}</SignupMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
