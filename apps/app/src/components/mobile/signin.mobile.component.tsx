import { useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SigninController from '../../controllers/signin.controller';
import styles from '../signin.module.scss';
import SupabaseService from '../../services/supabase.service';
import { RoutePaths } from '../../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { SigninResponsiveProps } from '../signin.component';

export function SigninMobileComponent({
  emailError,
  passwordError,
  setAuthError,
}: SigninResponsiveProps): JSX.Element {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [props] = useObservable(SigninController.model.store);

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
            item && (
              <animated.div style={style}>
                <div className={styles['signin-container']}>
                  {props.supabaseClient && (
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
                      emailValue={props.email ?? ''}
                      passwordValue={props.password ?? ''}
                      defaultIconColor={'#2A2A5F'}
                      litIconColor={'#2A2A5F'}
                      providers={['facebook', 'google']}
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
                      supabaseClient={props.supabaseClient}
                      onEmailChanged={(e) =>
                        SigninController.updateEmail(e.target.value)
                      }
                      onPasswordChanged={(e) =>
                        SigninController.updatePassword(e.target.value)
                      }
                      onForgotPasswordRedirect={() =>
                        navigate(RoutePaths.ForgotPassword)
                      }
                      onTermsOfServiceRedirect={() =>
                        navigate(RoutePaths.TermsOfService)
                      }
                      onPrivacyPolicyRedirect={() =>
                        navigate(RoutePaths.PrivacyPolicy)
                      }
                      onSigninRedirect={() => navigate(RoutePaths.Signin)}
                      onSignupRedirect={() => navigate(RoutePaths.Signup)}
                      onSigninError={(error: AuthError) => setAuthError(error)}
                      redirectTo={window.location.origin}
                    />
                  )}
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}
