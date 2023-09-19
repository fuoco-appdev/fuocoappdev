import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NotificationsController from '../controllers/notifications.controller';
import styles from './window.module.scss';
import { Alert } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { Helmet } from 'react-helmet-async';

function NotificationsDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(NotificationsController.model.store);

  return <></>;
}

function NotificationsMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(NotificationsController.model.store);
  const { t, i18n } = useTranslation();

  return <></>;
}

export default function NotificationsComponent(): JSX.Element {
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
      </Helmet>
      <ResponsiveDesktop>
        <NotificationsDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <NotificationsMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
