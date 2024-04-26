import { lazy } from '@loadable/component';
import * as React from 'react';
import { AccountNotificationResponse } from '../protobuf/account-notification_pb';
import { NotificationItemSuspenseDesktopComponent } from './desktop/suspense/notification-item.suspense.desktop.component';
import { NotificationItemSuspenseMobileComponent } from './mobile/suspense/notification-item.suspense.mobile.component';
import { NotificationItemSuspenseTabletComponent } from './tablet/suspense/notification-item.suspense.tablet.component';

const NotificationItemDesktopComponent = lazy(
  () => import('./desktop/notification-item.desktop.component')
);
const NotificationItemTabletComponent = lazy(
  () => import('./tablet/notification-item.tablet.component')
);
const NotificationItemMobileComponent = lazy(
  () => import('./mobile/notification-item.mobile.component')
);

export interface NotificationItemProps {
  notification: AccountNotificationResponse;
  fromNow: string | null;
}

export interface NotificationItemResponsiveProps
  extends NotificationItemProps { }

export default function NotificationItemComponent({
  notification,
  fromNow,
}: NotificationItemProps): JSX.Element {
  const suspenceComponent = (
    <>
      <NotificationItemSuspenseDesktopComponent />
      <NotificationItemSuspenseTabletComponent />
      <NotificationItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <NotificationItemDesktopComponent
        notification={notification}
        fromNow={fromNow}
      />
      <NotificationItemTabletComponent
        notification={notification}
        fromNow={fromNow}
      />
      <NotificationItemMobileComponent
        notification={notification}
        fromNow={fromNow}
      />
    </React.Suspense>
  );
}
