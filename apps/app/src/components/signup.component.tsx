/* eslint-disable @typescript-eslint/no-empty-interface */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import SignupController from '../controllers/signup.controller';
import WindowController from '../controllers/window.controller';
import styles from './signup.module.scss';
import SupabaseService from '../services/supabase.service';
import { RoutePaths } from '../route-paths';
import { useObservable } from '@ngneat/use-observable';
import { useTranslation } from 'react-i18next';
import { AuthError } from '@supabase/supabase-js';
import { animated, config, useTransition } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { SignupDesktopComponent } from './desktop/signup.desktop.component';
import { SignupMobileComponent } from './mobile/signup.mobile.component';
import { Helmet } from 'react-helmet-async';

export interface SignupProps {}

export interface SignupResponsiveProps {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  setAuthError: (value: AuthError | null) => void;
  setEmailError: (value: string) => void;
  setPasswordError: (value: string) => void;
  setConfirmPasswordError: (value: string) => void;
}

export default function SignupComponent(): JSX.Element {
  const location = useLocation();
  SignupController.model.location = location;
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    if (authError?.status === 400) {
      setEmailError(t('userAlreadyRegistered') ?? '');
      setPasswordError(t('userAlreadyRegistered') ?? '');
    } else if (authError?.status === 429) {
      WindowController.addToast({
        key: `signup-too-many-requests-${Math.random()}`,
        message: t('authTooManyRequests') ?? '',
        description: t('authTooManyRequestsDescription') ?? '',
        type: 'error',
      });
    } else if (authError?.status && authError?.status > 400) {
      WindowController.addToast({
        key: `signup-${Math.random()}`,
        message: authError?.name,
        description: authError?.message,
        type: 'error',
      });
    } else {
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [authError]);

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
        <SignupDesktopComponent
          emailError={emailError}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
          setEmailError={setEmailError}
          setPasswordError={setPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <SignupMobileComponent
          emailError={emailError}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
          setEmailError={setEmailError}
          setPasswordError={setPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
        />
      </ResponsiveMobile>
    </>
  );
}
