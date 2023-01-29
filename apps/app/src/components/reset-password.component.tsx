/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './reset-password.module.scss';
import WindowController from '../controllers/window.controller';
import AuthService from '../services/auth.service';
import { AuthError } from '@supabase/supabase-js';
import { Strings } from '../strings';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import ResetPasswordController from '../controllers/reset-password.controller';
import { useObservable } from '@ngneat/use-observable';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

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
  const resetPassword = (
    <Auth.ResetPassword
      passwordErrorMessage={error ? error.message : undefined}
      strings={{
        emailAddress: Strings.emailAddress,
        yourEmailAddress: Strings.yourEmailAddress,
        sendResetPasswordInstructions: Strings.sendResetPasswordInstructions,
        goBackToSignIn: Strings.goBackToSignIn,
      }}
      onPasswordUpdated={() => {
        WindowController.updateShowPasswordResetAlert(false);
        ResetPasswordController.updatePasswordUpdatedToast();
        setError(null);
        navigate(RoutePaths.User);
      }}
      onResetPasswordError={(error: AuthError) => setError(error)}
      supabaseClient={AuthService.supabaseClient}
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
