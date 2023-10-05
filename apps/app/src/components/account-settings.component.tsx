import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Helmet } from 'react-helmet';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import { WindowState } from '../models/window.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import React from 'react';

const AccountSettingsDesktopComponent = lazy(
  () => import('./desktop/account-settings.desktop.component')
);
const AccountSettingsMobileComponent = lazy(
  () => import('./mobile/account-settings.mobile.component')
);

export interface AccountSettingsResponsiveProps {
  windowProps: WindowState;
}

export default function AccountSettingsComponent(): JSX.Element {
  const [windowProps] = useObservable(WindowController.model.store);

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
        <meta property="og:title" content={'Home | Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <AuthenticatedComponent>
          <AccountSettingsDesktopComponent windowProps={windowProps} />
          <AccountSettingsMobileComponent windowProps={windowProps} />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
