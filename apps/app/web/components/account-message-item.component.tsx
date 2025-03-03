import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { AccountDocument } from '../../shared/models/account.model';
import { StorageFolderType } from '../../shared/protobuf/common_pb';
import { DIContext } from './app.component';
import { AccountMessageItemSuspenseDesktopComponent } from './desktop/suspense/account-message-item.suspense.desktop.component';
import { AccountMessageItemSuspenseMobileComponent } from './mobile/suspense/account-message-item.suspense.mobile.component';

const AccountMessageItemDesktopComponent = React.lazy(
  () => import('./desktop/account-message-item.desktop.component')
);
const AccountMessageItemMobileComponent = React.lazy(
  () => import('./mobile/account-message-item.mobile.component')
);

export interface AccountMessageItemProps {
  account: AccountDocument;
  onClick: () => void;
  onMessage: () => void;
}

export interface AccountMessageItemResponsiveProps
  extends AccountMessageItemProps {
  profileUrl: string | undefined;
}

function AccountMessageItemComponent({
  account,
  onClick,
  onMessage,
}: AccountMessageItemProps): JSX.Element {
  const { ChatController, BucketService } = React.useContext(DIContext);
  const { suspense } = ChatController.model;
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
  };

  const suspenceComponent = (
    <>
      <AccountMessageItemSuspenseDesktopComponent />
      <AccountMessageItemSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AccountMessageItemDesktopComponent
        account={account}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onMessage={onMessageOverride}
      />
      <AccountMessageItemMobileComponent
        account={account}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onMessage={onMessageOverride}
      />
    </React.Suspense>
  );
}

export default observer(AccountMessageItemComponent);
