/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/core-ui';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { animated, config, useTransition } from 'react-spring';
import WindowController from '../../../controllers/window.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { ResetPasswordResponsiveProps } from '../reset-password.component';
import styles from '../reset-password.module.scss';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
;

export default function ResetPasswordMobileComponent({
  resetPasswordProps,
  passwordError,
  confirmPasswordError,
  setAuthError,
}: ResetPasswordResponsiveProps): JSX.Element {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const query = useQuery();
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
                  {resetPasswordProps.supabaseClient && (
                    <Auth.ResetPassword
                      touchScreen={true}
                      passwordErrorMessage={passwordError}
                      confirmPasswordErrorMessage={confirmPasswordError}
                      defaultIconColor={'#2A2A5F'}
                      litIconColor={'#2A2A5F'}
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
                      strings={{
                        emailAddress: t('emailAddress') ?? '',
                        yourEmailAddress: t('yourEmailAddress') ?? '',
                        sendResetPasswordInstructions:
                          t('sendResetPasswordInstructions') ?? '',
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
                        setAuthError(null);
                        navigate({
                          pathname: RoutePathsType.Account,
                          search: query.toString(),
                        });
                      }}
                      onResetPasswordError={setAuthError}
                      supabaseClient={resetPasswordProps.supabaseClient}
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
