/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './forgot-password.module.scss';
import WindowController from '../controllers/window.controller';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';
import { ApiError } from '@supabase/supabase-js';
import { Strings } from '../strings';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';

export interface ForgotPasswordProps {}

export default function ForgotPasswordComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<ApiError | null>(null);

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

  const { origin } = window.location;
  return (
    <div className={styles['root']}>
      <div className={styles['content']}>
        {transitions(
          (style, item) =>
            item && (
              <animated.div style={style}>
                <Auth.ForgottenPassword
                  strings={{
                    emailAddress: Strings.emailAddress,
                    yourEmailAddress: Strings.yourEmailAddress,
                    sendResetPasswordInstructions:
                      Strings.sendResetPasswordInstructions,
                    goBackToSignIn: Strings.goBackToSignIn,
                  }}
                  onResetPasswordSent={() => {
                    WindowController.updateShowPasswordResetAlert(true);
                    setError(null);
                  }}
                  onSigninRedirect={() => navigate(RoutePaths.Signin)}
                  emailErrorMessage={
                    error ? Strings.emailErrorMessage : undefined
                  }
                  onResetPasswordError={(error: ApiError) => setError(error)}
                  supabaseClient={AuthService.supabaseClient}
                  redirectTo={`${origin}${RoutePaths.ResetPassword}`}
                />
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}
