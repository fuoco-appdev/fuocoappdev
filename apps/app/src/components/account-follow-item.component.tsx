import { lazy } from '@loadable/component';
import React from 'react';
import { AccountDocument, AccountState } from '../models/account.model';
import { AccountFollowerResponse } from '../protobuf/account-follower_pb';
import { StorageFolderType } from '../protobuf/common_pb';
import BucketService from '../services/bucket.service';
import { AccountFollowItemSuspenseDesktopComponent } from './desktop/suspense/account-follow-item.suspense.desktop.component';
import { AccountFollowItemSuspenseMobileComponent } from './mobile/suspense/account-follow-item.suspense.mobile.component';
import { AccountFollowItemSuspenseTabletComponent } from './tablet/suspense/account-follow-item.suspense.tablet.component';

const AccountFollowItemDesktopComponent = lazy(
  () => import('./desktop/account-follow-item.desktop.component')
);
const AccountFollowItemTabletComponent = lazy(
  () => import('./tablet/account-follow-item.tablet.component')
);
const AccountFollowItemMobileComponent = lazy(
  () => import('./mobile/account-follow-item.mobile.component')
);

export interface AccountFollowItemProps {
  accountProps: AccountState;
  account: AccountDocument;
  follower: AccountFollowerResponse | null;
  isRequest: boolean;
  onClick: () => void;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onRequested?: () => void;
  onConfirm?: () => void;
  onRemove?: () => void;
}

export interface AccountFollowItemResponsiveProps
  extends AccountFollowItemProps {
  profileUrl: string | undefined;
  isFollowing: boolean;
  isAccepted: boolean;
}

export default function AccountFollowItemComponent({
  accountProps,
  account,
  follower,
  isRequest,
  onClick,
  onFollow,
  onUnfollow,
  onRequested,
  onConfirm,
  onRemove,
}: AccountFollowItemProps): JSX.Element {
  const [profileUrl, setProfileUrl] = React.useState<string | undefined>(
    undefined
  );
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
  const [isAccepted, setIsAccepted] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    setIsFollowing(follower?.isFollowing ?? false);
    setIsAccepted(follower?.accepted ?? false);
  }, [follower]);

  const onClickOverride = () => {
    setTimeout(() => {
      onClick();
    }, 150);
  };

  const onFollowOverride = () => {
    setTimeout(() => {
      onFollow?.();

      setIsFollowing(true);
    }, 150);
  };

  const onUnfollowOverride = () => {
    setTimeout(() => {
      onUnfollow?.();

      setIsFollowing(false);
    }, 150);
  };

  const onRequestedOverride = () => {
    setTimeout(() => {
      onRequested?.();

      setIsFollowing(false);
      setIsAccepted(false);
    }, 150);
  };

  const onConfirmOverride = () => {
    setTimeout(() => {
      onConfirm?.();
    }, 150);
  };

  const onRemoveOverride = () => {
    setTimeout(() => {
      onRemove?.();
    }, 150);
  };

  const suspenceComponent = (
    <>
      <AccountFollowItemSuspenseDesktopComponent />
      <AccountFollowItemSuspenseTabletComponent />
      <AccountFollowItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AccountFollowItemDesktopComponent
        accountProps={accountProps}
        account={account}
        follower={follower}
        isRequest={isRequest}
        isFollowing={isFollowing}
        isAccepted={isAccepted}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onFollow={onFollowOverride}
        onUnfollow={onUnfollowOverride}
        onRequested={onRequestedOverride}
        onConfirm={onConfirmOverride}
        onRemove={onRemoveOverride}
      />
      <AccountFollowItemTabletComponent
        accountProps={accountProps}
        account={account}
        follower={follower}
        isRequest={isRequest}
        isFollowing={isFollowing}
        isAccepted={isAccepted}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onFollow={onFollowOverride}
        onUnfollow={onUnfollowOverride}
        onRequested={onRequestedOverride}
        onConfirm={onConfirmOverride}
        onRemove={onRemoveOverride}
      />
      <AccountFollowItemMobileComponent
        accountProps={accountProps}
        account={account}
        follower={follower}
        isRequest={isRequest}
        isFollowing={isFollowing}
        isAccepted={isAccepted}
        profileUrl={profileUrl}
        onClick={onClickOverride}
        onFollow={onFollowOverride}
        onUnfollow={onUnfollowOverride}
        onRequested={onRequestedOverride}
        onConfirm={onConfirmOverride}
        onRemove={onRemoveOverride}
      />
    </React.Suspense>
  );
}
