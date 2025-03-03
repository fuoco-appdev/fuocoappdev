/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { animated, config, useTransition } from 'react-spring';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/reset-password.module.scss';
import { useQuery } from '../../route-paths';
import { DIContext } from '../app.component';
import { ResetPasswordResponsiveProps } from '../reset-password.component';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';

function ResetPasswordDesktopComponent({
  passwordError,
  confirmPasswordError,
  setAuthError,
}: ResetPasswordResponsiveProps): JSX.Element {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const { ResetPasswordController } = React.useContext(DIContext);
  const { supabaseClient } = ResetPasswordController.model;

  useDesktopEffect(() => {
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
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['content'], styles['content-desktop']].join(' ')}
        >
          {transitions(
            (style, item) =>
              item && (
                <animated.div style={style}>
                  {supabaseClient && (
                    <Auth.ResetPassword
                      passwordErrorMessage={passwordError}
                      confirmPasswordErrorMessage={confirmPasswordError}
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
                        // WindowController.addToast({
                        //   key: `password-updated`,
                        //   message: t('passwordUpdated') ?? '',
                        //   description: t('passwordUpdatedDescription') ?? '',
                        //   type: 'success',
                        //   closable: true,
                        // });
                        setAuthError(null);
                        navigate({
                          pathname: RoutePathsType.Account,
                          search: query.toString(),
                        });
                      }}
                      onResetPasswordError={setAuthError}
                      supabaseClient={supabaseClient}
                    />
                  )}
                </animated.div>
              )
          )}
        </div>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(ResetPasswordDesktopComponent);
