/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './reset-password.module.scss';
import WindowController from '../controllers/window.controller';
import AuthService from '../services/auth.service';
import { ApiError } from '@supabase/supabase-js';
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
  const [error, setError] = useState<ApiError | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.hash);
    const accessToken = query.get('#access_token');
    if (accessToken !== null) {
      ResetPasswordController.updateAccessToken(accessToken);
    }
  }, [location]);

  const [props] = useObservable(ResetPasswordController.model.store);
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
        WindowController.updateShowPasswordUpdatedAlert(true);
        ResetPasswordController.updateAccessToken(undefined);
        setError(null);
        navigate(RoutePaths.User);
      }}
      onResetPasswordError={(error: ApiError) => setError(error)}
      supabaseClient={AuthService.supabaseClient}
      accessToken={props.accessToken}
    />
  );
  return props.accessToken ? (
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
  ) : (
    <div />
  );
}
