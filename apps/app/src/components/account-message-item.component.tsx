import { lazy } from '@loadable/component';
import * as React from 'react';
import { AccountDocument } from '../models/account.model';
import { ChatState } from '../models/chat.model';
import { StorageFolderType } from '../protobuf/common_pb';
import BucketService from '../services/bucket.service';
import { AccountMessageItemSuspenseDesktopComponent } from './desktop/suspense/account-message-item.suspense.desktop.component';
import { AccountMessageItemSuspenseMobileComponent } from './mobile/suspense/account-message-item.suspense.mobile.component';

const AccountMessageItemDesktopComponent = lazy(
  () => import('./desktop/account-message-item.desktop.component')
);
const AccountMessageItemMobileComponent = lazy(
  () => import('./mobile/account-message-item.mobile.component')
);

export interface AccountMessageItemProps {
  chatProps: ChatState;
  account: AccountDocument;
  onClick: () => void;
  onMessage: () => void;
}

export interface AccountMessageItemResponsiveProps
  extends AccountMessageItemProps {
  profileUrl: string | undefined;
}

export default function AccountMessageItemComponent({
  chatProps,
  account,
  onClick,
  onMessage
}: AccountMessageItemProps): JSX.Element {
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (!account.profile_url) {
      return;
    }

    BucketService.getPublicUrlAsync(
      StorageFolderType.Avatars,
      account.profile_url
    ).then((value) => {
      setProfileUrl(value);
    });
  }, [account]);

  const onClickOverride = () => {
    setTimeout(() => {
      onClick();
    }, 150);
  };

  const onMessageOverride = () => {
    setTimeout(() => {
      onMessage();
    }, 150);
  }

  const suspenceComponent = (
    <>
      <AccountMessageItemSuspenseDesktopComponent />
      <AccountMessageItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AccountMessageItemDesktopComponent
        chatProps={chatProps}
        account={account}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onMessage={onMessageOverride}
      />
      <AccountMessageItemMobileComponent
        chatProps={chatProps}
        account={account}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onMessage={onMessageOverride}
      />
    </React.Suspense>
  );
}