import { observer } from 'mobx-react-lite';
import moment from 'moment';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { AccountNotificationResponse } from '../../shared/protobuf/account-notification_pb';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { NotificationsSuspenseDesktopComponent } from './desktop/suspense/notifications.suspense.desktop.component';
import { NotificationsSuspenseMobileComponent } from './mobile/suspense/notifications.suspense.mobile.component';

const NotificationsDesktopComponent = React.lazy(
  () => import('./desktop/notifications.desktop.component')
);
const NotificationsMobileComponent = React.lazy(
  () => import('./mobile/notifications.mobile.component')
);

export interface NotificationsResponsiveProps {
  notifications: Record<string, AccountNotificationResponse[]>;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

function NotificationsComponent(): JSX.Element {
  const renderCountRef = React.useRef<number>(0);
  const { t, i18n } = useTranslation();
  const { NotificationsController } = React.useContext(DIContext);
  const { suspense, accountNotifications } = NotificationsController.model;
  const [notifications, setNotifications] = React.useState<
    Record<string, AccountNotificationResponse[]>
  >({});

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

  React.useEffect(() => {
    renderCountRef.current += 1;
    NotificationsController.load(renderCountRef.current);

    return () => {
      NotificationsController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    let lastFromNow = '';
    const newNotifications: Record<string, AccountNotificationResponse[]> = {};
    for (const notification of accountNotifications) {
      const fromNowCurrent = moment(notification?.createdAt)
        .locale(i18n.language)
        .startOf('day')
        .fromNow(true);
      if (lastFromNow !== fromNowCurrent) {
        if (!Object.keys(newNotifications).includes(fromNowCurrent)) {
          newNotifications[fromNowCurrent] = [];
        }

        lastFromNow = fromNowCurrent;
      }

      newNotifications[fromNowCurrent].push(notification);
    }
    setNotifications(newNotifications);
  }, [accountNotifications]);

  const suspenceComponent = (
    <>
      <NotificationsSuspenseDesktopComponent />
      <NotificationsSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Notifications | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Notifications | fuoco.appdev'} />
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
        <meta property="og:title" content={'Notifications | fuoco.appdev'} />
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
            notifications={notifications}
            onScroll={onScroll}
            onLoad={onLoad}
          />
          <NotificationsMobileComponent
            notifications={notifications}
            onScroll={onScroll}
            onLoad={onLoad}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}

export default observer(NotificationsComponent);
