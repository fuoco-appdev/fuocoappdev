/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SigninController from '../controllers/signin.controller';
import WindowController from '../controllers/window.controller';
import styles from './signin.module.scss';
import SupabaseService from '../services/supabase.service';
import { RoutePaths } from '../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { SigninDesktopComponent } from './desktop/signin.desktop.component';
import { SigninMobileComponent } from './mobile/signin.mobile.component';
import { Helmet } from 'react-helmet-async';

export interface SigninResponsiveProps {
  setAuthError: (error: AuthError | null) => void;
  emailError: string;
  passwordError: string;
}

export interface SigninProps {}

export default function SigninComponent(): JSX.Element {
  const location = useLocation();
  SigninController.model.location = location;
  const { t } = useTranslation();
  const [props] = useObservable(SigninController.model.store);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    if (authError?.message === 'Invalid login credentials') {
      setEmailError(t('invalidLoginCredentials') ?? '');
      setPasswordError(t('invalidLoginCredentials') ?? '');
    } else if (authError?.message === 'Email not confirmed') {
      setEmailError(t('emailNotConfirmed') ?? '');
      setPasswordError('');
      SigninController.resendEmailConfirmationAsync(props.email ?? '', () => {
        WindowController.addToast({
          key: `signin-email-confirmation-sent-${Math.random()}`,
          message: t('emailConfirmation') ?? '',
          description: t('emailConfirmationDescription') ?? '',
          type: 'loading',
        });
      });
    } else {
      if (authError) {
        WindowController.addToast({
          key: `signin-${Math.random()}`,
          message: authError?.name,
          description: authError?.message,
          type: 'error',
        });
      }

      setEmailError('');
      setPasswordError('');
    }
  }, [authError, props.email]);
  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <ResponsiveDesktop>
        <SigninDesktopComponent
          setAuthError={setAuthError}
          emailError={emailError}
          passwordError={passwordError}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <SigninMobileComponent
          setAuthError={setAuthError}
          emailError={emailError}
          passwordError={passwordError}
        />
      </ResponsiveMobile>
    </>
  );
}
