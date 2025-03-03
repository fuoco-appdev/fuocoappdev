/* eslint-disable @typescript-eslint/no-empty-interface */
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { DIContext } from './app.component';
import { GuestComponent } from './guest.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const ForgotPasswordDesktopComponent = React.lazy(
  () => import('./desktop/forgot-password.desktop.component')
);
const ForgotPasswordMobileComponent = React.lazy(
  () => import('./mobile/forgot-password.mobile.component')
);

export interface ForgotPasswordResponsiveProps {}

function ForgotPasswordComponent(): JSX.Element {
  const { ForgotPasswordController } = React.useContext(DIContext);
  const { suspense } = ForgotPasswordController.model;
  const renderCountRef = React.useRef<number>(0);
  React.useEffect(() => {
    renderCountRef.current += 1;
    ForgotPasswordController.load(renderCountRef.current);

    return () => {
      ForgotPasswordController.disposeLoad(renderCountRef.current);
    };
  }, []);

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
        <title>Forgot Password | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Forgot Password | fuoco.appdev'} />
        <meta
          name="description"
          content={`Don't worry; we've got you covered. If you've forgotten your Cruthology password, we're here to help you regain access to your exclusive wine world.`}
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Forgot Password | fuoco.appdev'} />
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
          <ForgotPasswordDesktopComponent />
          <ForgotPasswordMobileComponent />
        </GuestComponent>
      </React.Suspense>
    </>
  );
}

export default observer(ForgotPasswordComponent);
