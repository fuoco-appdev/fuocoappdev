/* eslint-disable @typescript-eslint/no-empty-interface */
import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import { AuthError } from '@supabase/supabase-js';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailConfirmationController from '../controllers/email-confirmation.controller';
import SignupController from '../controllers/signup.controller';
import WindowController from '../controllers/window.controller';
import { SignupState } from '../models';
import { RoutePathsType } from '../route-paths';
import { GuestComponent } from './guest.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const SignupDesktopComponent = lazy(
  () => import('./desktop/signup.desktop.component')
);
const SignupTabletComponent = lazy(
  () => import('./tablet/signup.tablet.component')
);
const SignupMobileComponent = lazy(
  () => import('./mobile/signup.mobile.component')
);

export interface SignupProps {}

export interface SignupResponsiveProps {
  signupProps: SignupState;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  setAuthError: (value: AuthError | null) => void;
  setEmailError: (value: string) => void;
  setPasswordError: (value: string) => void;
  setConfirmPasswordError: (value: string) => void;
  onEmailConfirmationSent: () => void;
}

export default function SignupComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  SignupController.model.location = location;
  const [signupProps] = useObservable(SignupController.model.store);
  const [authError, setAuthError] = React.useState<AuthError | null>(null);
  const [emailError, setEmailError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<string>('');
  const renderCountRef = React.useRef<number>(0);
  const { t } = useTranslation();

  const onEmailConfirmationSent = () => {
    WindowController.addToast({
      key: 'signup-email-confirmation-sent',
      message: t('emailConfirmation') ?? '',
      description: t('emailConfirmationDescription') ?? '',
      type: 'success',
    });
    EmailConfirmationController.updateEmail(signupProps.email);
    navigate(RoutePathsType.EmailConfirmation);
  };

  React.useEffect(() => {
    SignupController.load(renderCountRef.current);

    return () => {
      SignupController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
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
      console.error(authError);
    } else {
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [authError]);

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
        <title>Sign Up | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Sign Up | Cruthology'} />
        <meta
          name="description"
          content={`Join Cruthology, the epitome of wine sophistication and exclusivity. As a member, you'll unlock a world of fine wines, gourmet experiences, and cultural enrichment. Sign up now to embark on an extraordinary wine journey.`}
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Sign Up | Cruthology'} />
        <meta
          property="og:description"
          content={`Join Cruthology, the epitome of wine sophistication and exclusivity. As a member, you'll unlock a world of fine wines, gourmet experiences, and cultural enrichment. Sign up now to embark on an extraordinary wine journey.`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <GuestComponent>
          <SignupDesktopComponent
            signupProps={signupProps}
            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            setAuthError={setAuthError}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
            onEmailConfirmationSent={onEmailConfirmationSent}
          />
          <SignupTabletComponent
            signupProps={signupProps}
            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            setAuthError={setAuthError}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
            onEmailConfirmationSent={onEmailConfirmationSent}
          />
          <SignupMobileComponent
            signupProps={signupProps}
            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            setAuthError={setAuthError}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
            onEmailConfirmationSent={onEmailConfirmationSent}
          />
        </GuestComponent>
      </React.Suspense>
    </>
  );
}
