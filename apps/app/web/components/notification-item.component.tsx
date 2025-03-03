import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { AccountNotificationResponse } from '../../shared/protobuf/account-notification_pb';
import { StorageFolderType } from '../../shared/protobuf/common_pb';
import { AccountData } from '../../shared/services/account-notification.service';
import { DIContext } from './app.component';
import { NotificationItemSuspenseDesktopComponent } from './desktop/suspense/notification-item.suspense.desktop.component';
import { NotificationItemSuspenseMobileComponent } from './mobile/suspense/notification-item.suspense.mobile.component';

const NotificationItemDesktopComponent = React.lazy(
  () => import('./desktop/notification-item.desktop.component')
);
const NotificationItemMobileComponent = React.lazy(
  () => import('./mobile/notification-item.mobile.component')
);

const OrderNotificationItemDesktopComponent = React.lazy(
  () =>
    import(
      './desktop/notification_items/order-notification-item.desktop.component'
    )
);
const OrderNotificationItemMobileComponent = React.lazy(
  () =>
    import(
      './mobile/notification_items/order-notification-item.mobile.component'
    )
);

const AccountNotificationItemDesktopComponent = React.lazy(
  () =>
    import(
      './desktop/notification_items/account-notification-item.desktop.component'
    )
);
const AccountNotificationItemMobileComponent = React.lazy(
  () =>
    import(
      './mobile/notification_items/account-notification-item.mobile.component'
    )
);

export interface NotificationItemProps {
  notification: AccountNotificationResponse;
  fromNow: string | null;
}

export interface NotificationItemResponsiveProps
  extends NotificationItemProps {}

export interface OrderNotificationItemProps
  extends NotificationItemResponsiveProps {
  order: HttpTypes.StoreOrder | undefined;
}

export interface AccountNotificationItemProps
  extends NotificationItemResponsiveProps {
  account: AccountData | undefined;
  publicProfileUrl: string | undefined;
  isFollowing: boolean;
  isAccepted: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
  onRequested: () => void;
}

function NotificationItemComponent({
  notification,
  fromNow,
}: NotificationItemProps): JSX.Element {
  const { NotificationsController, BucketService, AccountController } =
    React.useContext(DIContext);
  const { suspense, accountFollowers } = NotificationsController.model;
  const { account } = AccountController.model;
  const [publicProfileUrl, setPublicProfileUrl] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    BucketService.getPublicUrlAsync(
      StorageFolderType.Avatars,
      account?.profileUrl ?? ''
    ).then((value) => {
      setPublicProfileUrl(value);
    });
  }, [notification]);

  const suspenceComponent = (
    <>
      <NotificationItemSuspenseDesktopComponent />
      <NotificationItemSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  if (notification.resourceType === 'order') {
    const order = JSON.parse(notification.data) as
      | HttpTypes.StoreOrder
      | undefined;
    return (
      <React.Suspense fallback={suspenceComponent}>
        <OrderNotificationItemDesktopComponent
          notification={notification}
          fromNow={fromNow}
          order={order}
        />
        <OrderNotificationItemMobileComponent
          notification={notification}
          fromNow={fromNow}
          order={order}
        />
      </React.Suspense>
    );
  } else if (notification.resourceType === 'account') {
    const account = JSON.parse(notification.data) as AccountData | undefined;
    const accountFollower = Object.keys(accountFollowers).includes(
      account?.id ?? ''
    )
      ? accountFollowers[account?.id ?? '']
      : undefined;

    return (
      <React.Suspense fallback={suspenceComponent}>
        <AccountNotificationItemDesktopComponent
          notification={notification}
          fromNow={fromNow}
          account={account}
          publicProfileUrl={publicProfileUrl}
          isAccepted={accountFollower?.accepted ?? false}
          isFollowing={accountFollower?.isFollowing ?? false}
          onFollow={() =>
            NotificationsController.requestFollowAsync(account?.id ?? '')
          }
          onRequested={() =>
            NotificationsController.requestUnfollowAsync(account?.id ?? '')
          }
          onUnfollow={() =>
            NotificationsController.requestUnfollowAsync(account?.id ?? '')
          }
        />
        <AccountNotificationItemMobileComponent
          notification={notification}
          fromNow={fromNow}
          account={account}
          publicProfileUrl={publicProfileUrl}
          isAccepted={accountFollower?.accepted ?? false}
          isFollowing={accountFollower?.isFollowing ?? false}
          onFollow={() =>
            NotificationsController.requestFollowAsync(account?.id ?? '')
          }
          onRequested={() =>
            NotificationsController.requestUnfollowAsync(account?.id ?? '')
          }
          onUnfollow={() =>
            NotificationsController.requestUnfollowAsync(account?.id ?? '')
          }
        />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <NotificationItemDesktopComponent
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

export default observer(NotificationItemComponent);
