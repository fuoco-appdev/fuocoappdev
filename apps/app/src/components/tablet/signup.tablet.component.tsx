/* eslint-disable @typescript-eslint/no-empty-interface */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SignupController from '../../controllers/signup.controller';
import WindowController from '../../controllers/window.controller';
import styles from '../signup.module.scss';
import SupabaseService from '../../services/supabase.service';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useObservable } from '@ngneat/use-observable';
import { useTranslation } from 'react-i18next';
import { AuthError } from '@supabase/supabase-js';
import { animated, config, useTransition } from 'react-spring';
import { SignupResponsiveProps } from '../signup.component';
import { ResponsiveTablet, useTabletEffect } from '../responsive.component';

export default function SignupTabletComponent({
  signupProps,
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
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  useTabletEffect(() => {
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
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['content'], styles['content-tablet']].join(' ')}
        >
          {transitions(
            (style, item) =>
              item && (
                <animated.div style={style}>
                  {signupProps.supabaseClient && (
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
                      defaultIconColor={'#2A2A5F'}
                      emailValue={signupProps?.email ?? ''}
                      passwordValue={signupProps?.password ?? ''}
                      confirmPasswordValue={
                        signupProps?.confirmationPassword ?? ''
                      }
                      litIconColor={'#2A2A5F'}
                      providers={['google']}
                      view={'sign_up'}
                      socialColors={false}
                      touchScreen={true}
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
                      supabaseClient={signupProps.supabaseClient}
                      socialLoadingComponent={
                        <img
                          src={'../assets/svg/ring-resize-dark.svg'}
                          style={{ height: 24 }}
                          className={[
                            styles['loading-ring'],
                            styles['loading-ring-tablet'],
                          ].join(' ')}
                        />
                      }
                      emailLoadingComponent={
                        <img
                          src={'../assets/svg/ring-resize-light.svg'}
                          style={{ height: 24 }}
                          className={[
                            styles['loading-ring'],
                            styles['loading-ring-tablet'],
                          ].join(' ')}
                        />
                      }
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
                        navigate(RoutePathsType.PrivacyPolicy)
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
    </ResponsiveTablet>
  );
}
