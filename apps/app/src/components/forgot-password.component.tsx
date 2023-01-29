/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './forgot-password.module.scss';
import WindowController from '../controllers/window.controller';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { Strings } from '../strings';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

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

  const { origin } = window.location;
  const forgotPassword = (
    <Auth.ForgottenPassword
      strings={{
        emailAddress: Strings.emailAddress,
        yourEmailAddress: Strings.yourEmailAddress,
        sendResetPasswordInstructions: Strings.sendResetPasswordInstructions,
        goBackToSignIn: Strings.goBackToSignIn,
      }}
      onResetPasswordSent={() => {
        WindowController.updateShowPasswordResetAlert(true);
        setError(null);
      }}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      emailErrorMessage={error ? Strings.emailErrorMessage : undefined}
      onResetPasswordError={(error: AuthError) => setError(error)}
      supabaseClient={AuthService.supabaseClient}
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
