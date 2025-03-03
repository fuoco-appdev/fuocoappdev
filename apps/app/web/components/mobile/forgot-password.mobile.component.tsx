import { Auth } from '@fuoco.appdev/web-components';
import { AuthError } from '@supabase/supabase-js';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { animated, config, useTransition } from 'react-spring';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/forgot-password.module.scss';
import { useQuery } from '../../route-paths';
import { DIContext } from '../app.component';
import { ForgotPasswordResponsiveProps } from '../forgot-password.component';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
export default function ForgotPasswordMobileComponent({}: ForgotPasswordResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { ForgotPasswordController } = React.useContext(DIContext);
  const { supabaseClient } = ForgotPasswordController.model;
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState<AuthError | null>(null);
  const { t } = useTranslation();

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
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['content'], styles['content-mobile']].join(' ')}
        >
          {transitions(
            (style, item) =>
              item && (
                <animated.div style={style}>
                  {supabaseClient && (
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
                      strings={{
                        emailAddress: t('emailAddress') ?? '',
                        yourEmailAddress: t('yourEmailAddress') ?? '',
                        sendResetPasswordInstructions:
                          t('sendResetPasswordInstructions') ?? '',
                        goBackToSignIn: t('goBackToSignIn') ?? '',
                      }}
                      onResetPasswordSent={() => {
                        // WindowController.addToast({
                        //   key: 'reset-password-sent',
                        //   message: t('passwordReset') ?? '',
                        //   description: t('passwordResetDescription') ?? '',
                        //   type: 'loading',
                        // });
                        setError(null);
                      }}
                      onSigninRedirect={() =>
                        navigate({
                          pathname: RoutePathsType.Signin,
                          search: query.toString(),
                        })
                      }
                      emailErrorMessage={
                        error ? t('emailErrorMessage') ?? '' : undefined
                      }
                      onResetPasswordError={(error: AuthError) =>
                        setError(error)
                      }
                      supabaseClient={supabaseClient}
                      redirectTo={`${window.location.origin}${RoutePathsType.ResetPassword}`}
                    />
                  )}
                </animated.div>
              )
          )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}
