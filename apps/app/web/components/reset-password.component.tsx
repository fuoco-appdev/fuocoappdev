/* eslint-disable @typescript-eslint/no-empty-interface */
import { AuthError } from '@supabase/supabase-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { DIContext } from './app.component';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from './responsive.component';

const ResetPasswordDesktopComponent = React.lazy(
  () => import('./desktop/reset-password.desktop.component')
);
const ResetPasswordMobileComponent = React.lazy(
  () => import('./mobile/reset-password.mobile.component')
);

export interface ResetPasswordProps {}

export interface ResetPasswordResponsiveProps {
  passwordError: string;
  confirmPasswordError: string;
  setAuthError: (error: AuthError | null) => void;
}

function ResetPasswordComponent(): JSX.Element {
  const { ResetPasswordController } = React.useContext(DIContext);
  const { password, suspense } = ResetPasswordController.model;
  const [authError, setAuthError] = React.useState<AuthError | null>(null);
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<string>('');
  const renderCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    ResetPasswordController.load(renderCountRef.current);

    return () => {
      ResetPasswordController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (authError) {
      // WindowController.addToast({
      //   key: `reset-password-${Math.random()}`,
      //   message: authError?.name,
      //   description: authError?.message,
      //   type: 'error',
      // });
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [authError, password]);

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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Reset Password | fuoco.appdev'} />
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
        <meta property="og:title" content={'Reset Password | fuoco.appdev'} />
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
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
        />
        <ResetPasswordMobileComponent
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          setAuthError={setAuthError}
        />
      </React.Suspense>
    </>
  );
}

export default observer(ResetPasswordComponent);
