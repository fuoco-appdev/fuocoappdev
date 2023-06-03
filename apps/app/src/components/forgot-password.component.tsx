/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './forgot-password.module.scss';
import WindowController from '../controllers/window.controller';
import SupabaseService from '../services/supabase.service';
import { RoutePaths } from '../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';

function ForgotPasswordDesktopComponent({ children }: any): JSX.Element {
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

function ForgotPasswordMobileComponent({ children }: any): JSX.Element {
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

export interface ForgotPasswordProps {}

export default function ForgotPasswordComponent(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<AuthError | null>(null);
  const { t, i18n } = useTranslation();

  const { origin } = window.location;
  const forgotPassword = (
    <Auth.ForgottenPassword
      classNames={{
        input: {
          formLayout: {
            label: styles['auth-input-form-layout-label'],
          },
          input: styles['auth-input'],
          container: styles['auth-input-container'],
        },
        button: {
          button: styles['auth-button'],
        },
      }}
      rippleProps={{
        color: 'rgba(233, 33, 66, .35)',
      }}
      defaultIconColor={'#2A2A5F'}
      litIconColor={'#2A2A5F'}
      strings={{
        emailAddress: t('emailAddress') ?? '',
        yourEmailAddress: t('yourEmailAddress') ?? '',
        sendResetPasswordInstructions: t('sendResetPasswordInstructions') ?? '',
        goBackToSignIn: t('goBackToSignIn') ?? '',
      }}
      onResetPasswordSent={() => {
        WindowController.addToast({
          key: 'reset-password-sent',
          message: t('passwordReset') ?? '',
          description: t('passwordResetDescription') ?? '',
          type: 'loading',
        });
        setError(null);
      }}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      emailErrorMessage={error ? t('emailErrorMessage') ?? '' : undefined}
      onResetPasswordError={(error: AuthError) => setError(error)}
      supabaseClient={SupabaseService.supabaseClient}
      redirectTo={`${origin}${RoutePaths.ResetPassword}`}
    />
  );
  return (
    <>
      <ResponsiveDesktop>
        <ForgotPasswordDesktopComponent>
          {forgotPassword}
        </ForgotPasswordDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ForgotPasswordMobileComponent>
          {forgotPassword}
        </ForgotPasswordMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
