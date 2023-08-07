/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './reset-password.module.scss';
import WindowController from '../controllers/window.controller';
import SupabaseService from '../services/supabase.service';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import ResetPasswordController from '../controllers/reset-password.controller';
import { useObservable } from '@ngneat/use-observable';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';

function ResetPasswordDesktopComponent({ children }: any): JSX.Element {
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

function ResetPasswordMobileComponent({ children }: any): JSX.Element {
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

export interface ResetPasswordProps {}

export default function ResetPasswordComponent(): JSX.Element {
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const resetPassword = SupabaseService.supabaseClient && (
    <Auth.ResetPassword
      passwordErrorMessage={error ? error.message : undefined}
      strings={{
        emailAddress: t('emailAddress') ?? '',
        yourEmailAddress: t('yourEmailAddress') ?? '',
        sendResetPasswordInstructions: t('sendResetPasswordInstructions') ?? '',
        goBackToSignIn: t('goBackToSignIn') ?? '',
      }}
      onPasswordUpdated={() => {
        WindowController.addToast({
          key: `password-updated`,
          message: t('passwordUpdated') ?? '',
          description: t('passwordUpdatedDescription') ?? '',
          type: 'success',
          closable: true,
        });
        setError(null);
        navigate(RoutePaths.Account);
      }}
      onResetPasswordError={(error: AuthError) => setError(error)}
      supabaseClient={SupabaseService.supabaseClient}
    />
  );
  return (
    <>
      <ResponsiveDesktop>
        <ResetPasswordDesktopComponent>
          {resetPassword}
        </ResetPasswordDesktopComponent>
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ResetPasswordMobileComponent>
          {resetPassword}
        </ResetPasswordMobileComponent>
      </ResponsiveMobile>
    </>
  );
}
