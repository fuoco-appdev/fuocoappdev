import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import React from 'react';
import { Helmet } from 'react-helmet';
import NotificationsController from '../controllers/notifications.controller';
import { NotificationsState } from '../models/notifications.model';
import { AuthenticatedComponent } from './authenticated.component';
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

export interface NotificationsResponsiveProps {
  notificationsProps: NotificationsState;
  fromNowRef: React.MutableRefObject<string | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

export default function NotificationsComponent(): JSX.Element {
  const renderCountRef = React.useRef<number>(0);
  const [notificationsProps] = useObservable(
    NotificationsController.model.store
  );
  const fromNowRef = React.useRef<string | null>(null);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (
      scrollOffset > 16 ||
      !NotificationsController.model.hasMoreNotifications
    ) {
      return;
    }

    NotificationsController.onNextScrollAsync();
  };

  const onLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (NotificationsController.model.scrollPosition) {
      e.currentTarget.scrollTop = NotificationsController.model
        .scrollPosition as number;
      NotificationsController.updateScrollPosition(undefined);
    }
  };

  const suspenceComponent = (
    <>
      <NotificationsSuspenseDesktopComponent />
      <NotificationsSuspenseTabletComponent />
      <NotificationsSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  React.useEffect(() => {
    renderCountRef.current += 1;
    NotificationsController.load(renderCountRef.current);

    return () => {
      NotificationsController.disposeLoad(renderCountRef.current);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Notifications | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Notifications | Cruthology'} />
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
        <meta property="og:title" content={'Notifications | Cruthology'} />
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
          <NotificationsDesktopComponent
            notificationsProps={notificationsProps}
            fromNowRef={fromNowRef}
            onScroll={onScroll}
            onLoad={onLoad}
          />
          <NotificationsTabletComponent
            notificationsProps={notificationsProps}
            fromNowRef={fromNowRef}
            onScroll={onScroll}
            onLoad={onLoad}
          />
          <NotificationsMobileComponent
            notificationsProps={notificationsProps}
            fromNowRef={fromNowRef}
            onScroll={onScroll}
            onLoad={onLoad}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
