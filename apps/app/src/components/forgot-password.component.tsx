/* eslint-disable @typescript-eslint/no-empty-interface */
import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import ForgotPasswordController from '../controllers/forgot-password.controller';
import { ForgotPasswordState } from '../models/forgot-password.model';
import { GuestComponent } from './guest.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const ForgotPasswordDesktopComponent = lazy(
  () => import('./desktop/forgot-password.desktop.component')
);
const ForgotPasswordTabletComponent = lazy(
  () => import('./tablet/forgot-password.tablet.component')
);
const ForgotPasswordMobileComponent = lazy(
  () => import('./mobile/forgot-password.mobile.component')
);

export interface ForgotPasswordResponsiveProps {
  forgotPasswordProps: ForgotPasswordState;
}

export default function ForgotPasswordComponent(): JSX.Element {
  const [forgotPasswordProps] = useObservable(
    ForgotPasswordController.model.store
  );
  const renderCountRef = React.useRef<number>(0);

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

  React.useEffect(() => {
    renderCountRef.current += 1;
    ForgotPasswordController.load(renderCountRef.current);

    return () => {
      ForgotPasswordController.disposeLoad(renderCountRef.current);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Forgot Password | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Forgot Password | Cruthology'} />
        <meta
          name="description"
          content={`Don't worry; we've got you covered. If you've forgotten your Cruthology password, we're here to help you regain access to your exclusive wine world.`}
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Forgot Password | Cruthology'} />
        <meta
          property="og:description"
          content={`Don't worry; we've got you covered. If you've forgotten your Cruthology password, we're here to help you regain access to your exclusive wine world.`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <GuestComponent>
          <ForgotPasswordDesktopComponent
            forgotPasswordProps={forgotPasswordProps}
          />
          <ForgotPasswordTabletComponent
            forgotPasswordProps={forgotPasswordProps}
          />
          <ForgotPasswordMobileComponent
            forgotPasswordProps={forgotPasswordProps}
          />
        </GuestComponent>
      </React.Suspense>
    </>
  );
}
