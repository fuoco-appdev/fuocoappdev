import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import styles from '../forgot-password.module.scss';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { useObservable } from '@ngneat/use-observable';
import ForgotPasswordController from '../../controllers/forgot-password.controller';
import WindowController from '../../controllers/window.controller';
import { useDesktopEffect, useMobileEffect } from '../responsive.component';
import { useTranslation } from 'react-i18next';
import { AuthError } from '@supabase/supabase-js';
import { RoutePathsType } from '../../route-paths';

export function ForgotPasswordMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(ForgotPasswordController.model.store);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const { t, i18n } = useTranslation();

  useMobileEffect(() => {
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
            item && (
              <animated.div style={style}>
                {props.supabaseClient && (
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
                      sendResetPasswordInstructions:
                        t('sendResetPasswordInstructions') ?? '',
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
                    onSigninRedirect={() => navigate(RoutePathsType.Signin)}
                    emailErrorMessage={
                      error ? t('emailErrorMessage') ?? '' : undefined
                    }
                    onResetPasswordError={(error: AuthError) => setError(error)}
                    supabaseClient={props.supabaseClient}
                    redirectTo={`${window.location.origin}${RoutePathsType.ResetPassword}`}
                  />
                )}
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}
