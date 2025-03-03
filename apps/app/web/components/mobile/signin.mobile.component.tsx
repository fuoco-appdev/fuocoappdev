/* eslint-disable jsx-a11y/alt-text */
import { Auth } from '@fuoco.appdev/web-components';
import { AuthError } from '@supabase/supabase-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { animated, config, useTransition } from 'react-spring';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/signin.module.scss';
import { useQuery } from '../../route-paths';
import { DIContext } from '../app.component';
import { ResponsiveMobile, useMobileEffect } from '../responsive.component';
import { SigninResponsiveProps } from '../signin.component';

function SigninMobileComponent({
  emailError,
  passwordError,
  setAuthError,
}: SigninResponsiveProps): JSX.Element {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const { SigninController } = React.useContext(DIContext);
  const { supabaseClient, email, password } = SigninController.model;

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
                  <div className={styles['signin-container']}>
                    {supabaseClient && (
                      <Auth
                        touchScreen={true}
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
                        providers={['google']}
                        view={'sign_in'}
                        socialColors={false}
                        strings={{
                          signInWith: t('signInWith') ?? '',
                          orContinueWith: t('orContinueWith') ?? '',
                          emailAddress: t('emailAddress') ?? '',
                          password: t('password') ?? '',
                          rememberMe: t('rememberMe') ?? '',
                          forgotYourPassword: t('forgotYourPassword') ?? '',
                          signIn: t('signIn') ?? '',
                          dontHaveAnAccount: t('dontHaveAnAccount') ?? '',
                        }}
                        emailErrorMessage={emailError}
                        passwordErrorMessage={passwordError}
                        supabaseClient={supabaseClient}
                        onEmailChanged={(e) =>
                          SigninController.updateEmail(e.target.value)
                        }
                        onPasswordChanged={(e) =>
                          SigninController.updatePassword(e.target.value)
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
                        onSignupRedirect={() =>
                          navigate({
                            pathname: RoutePathsType.Signup,
                            search: query.toString(),
                          })
                        }
                        onSigninError={(error: AuthError) =>
                          setAuthError(error)
                        }
                        socialLoadingComponent={
                          <img
                            src={'../assets/svg/ring-resize-dark.svg'}
                            style={{ height: 24 }}
                            className={[
                              styles['loading-ring'],
                              styles['loading-ring-mobile'],
                            ].join(' ')}
                          />
                        }
                        emailLoadingComponent={
                          <img
                            src={'../assets/svg/ring-resize-light.svg'}
                            style={{ height: 24 }}
                            className={[
                              styles['loading-ring'],
                              styles['loading-ring-mobile'],
                            ].join(' ')}
                          />
                        }
                        redirectTo={window.location.origin}
                      />
                    )}
                  </div>
                </animated.div>
              )
          )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}

export default observer(SigninMobileComponent);
