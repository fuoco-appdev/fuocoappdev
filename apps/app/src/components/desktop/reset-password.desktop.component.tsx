/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/core-ui';
import styles from '../reset-password.module.scss';
import WindowController from '../../controllers/window.controller';
import SupabaseService from '../../services/supabase.service';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../route-paths';
import ResetPasswordController from '../../controllers/reset-password.controller';
import { useObservable } from '@ngneat/use-observable';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
  useDesktopEffect,
} from '../responsive.component';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { ResetPasswordResponsiveProps } from '../reset-password.component';

export default function ResetPasswordDesktopComponent({
  resetPasswordProps,
  passwordError,
  confirmPasswordError,
  setAuthError,
}: ResetPasswordResponsiveProps): JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
                  {resetPasswordProps.supabaseClient && (
                    <Auth.ResetPassword
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
                        navigate(RoutePathsType.Account);
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
    </ResponsiveDesktop>
  );
}
