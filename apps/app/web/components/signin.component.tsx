/* eslint-disable @typescript-eslint/no-empty-interface */
import { AuthError } from '@supabase/supabase-js';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { DIContext } from './app.component';
import { GuestComponent } from './guest.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const SigninDesktopComponent = React.lazy(
  () => import('./desktop/signin.desktop.component')
);
const SigninMobileComponent = React.lazy(
  () => import('./mobile/signin.mobile.component')
);

export interface SigninResponsiveProps {
  setAuthError: (error: AuthError | null) => void;
  emailError: string;
  passwordError: string;
}

export interface SigninProps {}

function SigninComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const { SigninController, EmailConfirmationController } =
    React.useContext(DIContext);
  const { email, suspense } = SigninController.model;
  SigninController.model.location = location;
  const { t } = useTranslation();
  const [authError, setAuthError] = React.useState<AuthError | null>(null);
  const [emailError, setEmailError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const renderCountRef = React.useRef<number>(0);

  React.useEffect(() => {
    SigninController.load(renderCountRef.current);

    return () => {
      SigninController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (authError?.message === 'Invalid login credentials') {
      setEmailError(t('invalidLoginCredentials') ?? '');
      setPasswordError(t('invalidLoginCredentials') ?? '');
    } else if (authError?.message === 'Email not confirmed') {
      setEmailError(t('emailNotConfirmed') ?? '');
      setPasswordError('');
      SigninController.resendEmailConfirmationAsync(email ?? '', () => {
        // WindowController.addToast({
        //   key: `signin-email-confirmation-sent-${Math.random()}`,
        //   message: t('emailConfirmation') ?? '',
        //   description: t('emailConfirmationDescription') ?? '',
        //   type: 'success',
        // });
      });
      EmailConfirmationController.updateEmail(email);
      navigate(RoutePathsType.EmailConfirmation);
    } else {
      if (authError) {
        // WindowController.addToast({
        //   key: `signin-${Math.random()}`,
        //   message: authError?.name,
        //   description: authError?.message,
        //   type: 'error',
        // });
      }

      setEmailError('');
      setPasswordError('');
    }
  }, [authError, email]);

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <div />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Sign In | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Sign In | fuoco.appdev'} />
        <meta
          name="description"
          content={
            'Sign in to your Cruthology account to continue your journey through the world of exceptional wines, gourmet experiences, and exclusive cultural events. Your palate is in for a treat!'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Sign In | fuoco.appdev'} />
        <meta
          property="og:description"
          content={
            'Sign in to your Cruthology account to continue your journey through the world of exceptional wines, gourmet experiences, and exclusive cultural events. Your palate is in for a treat!'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <GuestComponent>
          <SigninDesktopComponent
            setAuthError={setAuthError}
            emailError={emailError}
            passwordError={passwordError}
          />
          <SigninMobileComponent
            setAuthError={setAuthError}
            emailError={emailError}
            passwordError={passwordError}
          />
        </GuestComponent>
      </React.Suspense>
    </>
  );
}

export default observer(SigninComponent);
