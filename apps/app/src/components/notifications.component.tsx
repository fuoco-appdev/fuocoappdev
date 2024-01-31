import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NotificationsController from '../controllers/notifications.controller';
import styles from './window.module.scss';
import { Alert } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { Helmet } from 'react-helmet';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import React from 'react';
import { NotificationsSuspenseDesktopComponent } from './desktop/suspense/notifications.suspense.desktop.component';
import { NotificationsSuspenseMobileComponent } from './mobile/suspense/notifications.suspense.mobile.component';
import { NotificationsSuspenseTabletComponent } from './tablet/suspense/notifications.suspense.tablet.component';

const NotificationsDesktopComponent = lazy(
  () => import('./desktop/notifications.desktop.component')
);
const NotificationsTabletComponent = lazy(
  () => import('./tablet/notifications.tablet.component')
);
const NotificationsMobileComponent = lazy(
  () => import('./mobile/notifications.mobile.component')
);

export default function NotificationsComponent(): JSX.Element {
  const suspenceComponent = (
    <>
      <NotificationsSuspenseDesktopComponent />
      <NotificationsSuspenseTabletComponent />
      <NotificationsSuspenseMobileComponent />
    </>
  );

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
        <meta property="og:title" content={'Cruthology'} />
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
          <NotificationsDesktopComponent />
          <NotificationsTabletComponent />
          <NotificationsMobileComponent />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
