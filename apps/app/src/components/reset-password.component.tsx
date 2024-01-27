/* eslint-disable @typescript-eslint/no-empty-interface */
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './reset-password.module.scss';
import WindowController from '../controllers/window.controller';
import SupabaseService from '../services/supabase.service';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect, useRef } from 'react';
import { animated, config, useTransition } from 'react-spring';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
import ResetPasswordController from '../controllers/reset-password.controller';
import { useObservable } from '@ngneat/use-observable';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
  ResponsiveTablet,
} from './responsive.component';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import React from 'react';
import { ResetPasswordState } from '../models';
import { lazy } from '@loadable/component';

const ResetPasswordDesktopComponent = lazy(
  () => import('./desktop/reset-password.desktop.component')
);
const ResetPasswordTabletComponent = lazy(
  () => import('./tablet/reset-password.tablet.component')
);
const ResetPasswordMobileComponent = lazy(
  () => import('./mobile/reset-password.mobile.component')
);

export interface ResetPasswordProps {}

export interface ResetPasswordResponsiveProps {
  resetPasswordProps: ResetPasswordState;
  passwordError: string;
  confirmPasswordError: string;
  setAuthError: (error: AuthError | null) => void;
}

export default function ResetPasswordComponent(): JSX.Element {
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [resetPasswordProps] = useObservable(
    ResetPasswordController.model.store
  );
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    ResetPasswordController.load(renderCountRef.current);

    return () => {
      ResetPasswordController.disposeLoad(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    if (authError) {
      WindowController.addToast({
        key: `reset-password-${Math.random()}`,
        message: authError?.name,
        description: authError?.message,
        type: 'error',
      });
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [authError, resetPasswordProps.password]);

  const suspenceComponent = (
    <>
      <ResponsiveSuspenseDesktop>
        <div />
      </ResponsiveSuspenseDesktop>
      <ResponsiveSuspenseTablet>
        <div />
      </ResponsiveSuspenseTablet>
      <ResponsiveSuspenseMobile>
        <div />
      </ResponsiveSuspenseMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Reset Password | Cruthology'} />
        <meta
          name="description"
          content={
            'Reset your Cruthology password to continue your journey through the world of exceptional wines, gourmet experiences, and exclusive cultural events. Your palate is in for a treat!'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Reset Password | Cruthology'} />
        <meta
          property="og:description"
          content={
            'Reset your Cruthology password to continue your journey through the world of exceptional wines, gourmet experiences, and exclusive cultural events. Your palate is in for a treat!'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ResetPasswordDesktopComponent
          resetPasswordProps={resetPasswordProps}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
        />
        <ResetPasswordTabletComponent
          resetPasswordProps={resetPasswordProps}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
        />
        <ResetPasswordMobileComponent
          resetPasswordProps={resetPasswordProps}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
        />
      </React.Suspense>
    </>
  );
}
