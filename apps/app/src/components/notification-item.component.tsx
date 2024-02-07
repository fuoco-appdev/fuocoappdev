import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Order, LineItem } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { lazy } from '@loadable/component';
import { NotificationItemSuspenseDesktopComponent } from './desktop/suspense/notification-item.suspense.desktop.component';
import React from 'react';
import { NotificationItemSuspenseMobileComponent } from './mobile/suspense/notification-item.suspense.mobile.component';
import { NotificationItemSuspenseTabletComponent } from './tablet/suspense/notification-item.suspense.tablet.component';
import { AccountNotificationResponse } from '../protobuf/core_pb';

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
  extends NotificationItemProps {}

export default function NotificationItemComponent({
  notification,
  fromNow,
}: NotificationItemProps): JSX.Element {
  const { t, i18n } = useTranslation();

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
