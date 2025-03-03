/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/web-components';
import { AuthError } from '@supabase/supabase-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { animated, config, useTransition } from 'react-spring';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/signup.module.scss';
import { useQuery } from '../../route-paths';
import { DIContext } from '../app.component';
import { ResponsiveDesktop, useDesktopEffect } from '../responsive.component';
import { SignupResponsiveProps } from '../signup.component';

function SignupDesktopComponent({
  emailError,
  passwordError,
  confirmPasswordError,
  setAuthError,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError,
  onEmailConfirmationSent,
}: SignupResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const [show, setShow] = React.useState(false);
  const { t } = useTranslation();
  const { SignupController } = React.useContext(DIContext);
  const { supabaseClient, email, password, confirmationPassword } =
    SignupController.model;

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
                    <Auth
                      classNames={{
                        socialAuth: {
                          socialButton: {
                            button: {
                              button: styles['social-button'],
                            },
                          },
                          divider: {
                            divider: styles['social-divider'],
                            content: styles['social-divider-content'],
                          },
                        },
                        emailAuth: {
                          input: {
                            formLayout: {
                              label: styles['auth-input-form-layout-label'],
                            },
                            input: styles['auth-input'],
                            container: styles['auth-input-container'],
                          },
                          checkbox: {
                            checkbox: styles['auth-checkbox'],
                            labelContainerLabel:
                              styles['auth-checkbox-label-container-label'],
                          },
                          emailButton: {
                            button: styles['auth-email-button'],
                          },
                        },
                      }}
                      rippleProps={{
                        socialButton: {
                          color: 'rgba(133, 38, 122, .35)',
                        },
                        submitButton: {
                          color: 'rgba(233, 33, 66, .35)',
                        },
                      }}
                      emailValue={email ?? ''}
                      passwordValue={password ?? ''}
                      confirmPasswordValue={confirmationPassword ?? ''}
                      providers={['google']}
                      view={'sign_up'}
                      socialColors={false}
                      socialLoadingComponent={
                        <img
                          src={'../assets/svg/ring-resize-dark.svg'}
                          style={{ height: 24 }}
                          className={[
                            styles['loading-ring'],
                            styles['loading-ring-desktop'],
                          ].join(' ')}
                        />
                      }
                      emailLoadingComponent={
                        <img
                          src={'../assets/svg/ring-resize-light.svg'}
                          style={{ height: 24 }}
                          className={[
                            styles['loading-ring'],
                            styles['loading-ring-desktop'],
                          ].join(' ')}
                        />
                      }
                      strings={{
                        signUpWith: t('signUpWith') ?? '',
                        orContinueWith: t('orContinueWith') ?? '',
                        emailAddress: t('emailAddress') ?? '',
                        password: t('password') ?? '',
                        confirmPassword: t('confirmPassword') ?? '',
                        agreeToThe: t('agreeToThe') ?? '',
                        termsOfService: t('termsOfService') ?? '',
                        privacyPolicy: t('privacyPolicy') ?? '',
                        signUp: t('signUp') ?? '',
                        doYouHaveAnAccount: t('doYouHaveAnAccount') ?? '',
                      }}
                      emailErrorMessage={emailError}
                      passwordErrorMessage={passwordError}
                      confirmPasswordErrorMessage={confirmPasswordError}
                      supabaseClient={supabaseClient}
                      onEmailChanged={(e) =>
                        SignupController.updateEmail(e.target.value)
                      }
                      onPasswordChanged={(e) =>
                        SignupController.updatePassword(e.target.value)
                      }
                      onConfirmPasswordChanged={(e) =>
                        SignupController.updateConfirmationPassword(
                          e.target.value
                        )
                      }
                      onForgotPasswordRedirect={() =>
                        navigate({
                          pathname: RoutePathsType.ForgotPassword,
                          search: query.toString(),
                        })
                      }
                      onTermsOfServiceRedirect={() =>
                        navigate({
                          pathname: RoutePathsType.TermsOfService,
                          search: query.toString(),
                        })
                      }
                      onPrivacyPolicyRedirect={() =>
                        navigate({
                          pathname: RoutePathsType.PrivacyPolicy,
                          search: query.toString(),
                        })
                      }
                      onSigninRedirect={() =>
                        navigate({
                          pathname: RoutePathsType.Signin,
                          search: query.toString(),
                        })
                      }
                      onSignupRedirect={() => {
                        setEmailError('');
                        setPasswordError('');
                        setConfirmPasswordError('');
                        navigate({
                          pathname: RoutePathsType.Signup,
                          search: query.toString(),
                        });
                      }}
                      onSignupError={(error: AuthError) => setAuthError(error)}
                      onEmailConfirmationSent={onEmailConfirmationSent}
                      redirectTo={window.location.origin}
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

export default observer(SignupDesktopComponent);
