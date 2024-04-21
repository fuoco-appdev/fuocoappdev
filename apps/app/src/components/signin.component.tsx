/* eslint-disable @typescript-eslint/no-empty-interface */
import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import { AuthError } from '@supabase/supabase-js';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailConfirmationController from '../controllers/email-confirmation.controller';
import SigninController from '../controllers/signin.controller';
import WindowController from '../controllers/window.controller';
import { SigninState } from '../models/signin.model';
import { RoutePathsType } from '../route-paths';
import { GuestComponent } from './guest.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const SigninDesktopComponent = lazy(
  () => import('./desktop/signin.desktop.component')
);
const SigninTabletComponent = lazy(
  () => import('./tablet/signin.tablet.component')
);
const SigninMobileComponent = lazy(
  () => import('./mobile/signin.mobile.component')
);

export interface SigninResponsiveProps {
  signInProps: SigninState;
  setAuthError: (error: AuthError | null) => void;
  emailError: string;
  passwordError: string;
}

export interface SigninProps {}

export default function SigninComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  SigninController.model.location = location;
  const { t } = useTranslation();
  const [signInProps] = useObservable(SigninController.model.store);
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
      SigninController.resendEmailConfirmationAsync(
        signInProps.email ?? '',
        () => {
          WindowController.addToast({
            key: `signin-email-confirmation-sent-${Math.random()}`,
            message: t('emailConfirmation') ?? '',
            description: t('emailConfirmationDescription') ?? '',
            type: 'success',
          });
        }
      );
      EmailConfirmationController.updateEmail(signInProps.email);
      navigate(RoutePathsType.EmailConfirmation);
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
  }, [authError, signInProps.email]);

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

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Sign In | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Sign In | Cruthology'} />
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
        <meta property="og:title" content={'Sign In | Cruthology'} />
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
            signInProps={signInProps}
            setAuthError={setAuthError}
            emailError={emailError}
            passwordError={passwordError}
          />
          <SigninTabletComponent
            signInProps={signInProps}
            setAuthError={setAuthError}
            emailError={emailError}
            passwordError={passwordError}
          />
          <SigninMobileComponent
            signInProps={signInProps}
            setAuthError={setAuthError}
            emailError={emailError}
            passwordError={passwordError}
          />
        </GuestComponent>
      </React.Suspense>
    </>
  );
}
