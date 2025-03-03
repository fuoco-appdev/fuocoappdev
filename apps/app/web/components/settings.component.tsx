import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import SettingsSuspenseDesktopComponent from './desktop/suspense/settings.suspense.desktop';
import SettingsSuspenseMobileComponent from './mobile/suspense/settings.suspense.mobile';

const SettingsDesktopComponent = React.lazy(
  () => import('./desktop/settings.desktop.component')
);
const SettingsMobileComponent = React.lazy(
  () => import('./mobile/settings.mobile.component')
);

export interface SettingsResponsiveProps {}

function SettingsComponent(): JSX.Element {
  const { WindowController } = React.useContext(DIContext);
  const { suspense } = WindowController.model;

  const suspenceComponent = (
    <>
      <SettingsSuspenseDesktopComponent />
      <SettingsSuspenseMobileComponent />
    </>
  );

  if (suspense) {
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
        <meta property="og:title" content={'Home | fuoco.appdev'} />
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
          <SettingsDesktopComponent />
          <SettingsMobileComponent />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}

export default observer(SettingsComponent);
