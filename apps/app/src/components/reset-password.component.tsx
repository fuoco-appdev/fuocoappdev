/* eslint-disable @typescript-eslint/no-empty-interface */
import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import { AuthError } from '@supabase/supabase-js';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import ResetPasswordController from '../controllers/reset-password.controller';
import WindowController from '../controllers/window.controller';
import { ResetPasswordState } from '../models';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from './responsive.component';

const ResetPasswordDesktopComponent = lazy(
  () => import('./desktop/reset-password.desktop.component')
);
const ResetPasswordTabletComponent = lazy(
  () => import('./tablet/reset-password.tablet.component')
);
const ResetPasswordMobileComponent = lazy(
  () => import('./mobile/reset-password.mobile.component')
);

export interface ResetPasswordProps { }

export interface ResetPasswordResponsiveProps {
  resetPasswordProps: ResetPasswordState;
  passwordError: string;
  confirmPasswordError: string;
  setAuthError: (error: AuthError | null) => void;
}

export default function ResetPasswordComponent(): JSX.Element {
  const [authError, setAuthError] = React.useState<AuthError | null>(null);
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<string>('');
  const [resetPasswordProps] = useObservable(
    ResetPasswordController.model.store
  );
  const renderCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    ResetPasswordController.load(renderCountRef.current);

    return () => {
      ResetPasswordController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
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
