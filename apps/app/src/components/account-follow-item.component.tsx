import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from './cart-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../controllers/cart.controller';
import {
  AccountFollowerResponse,
  CustomerResponse,
  StorageFolderType,
} from '../protobuf/core_pb';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import React from 'react';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { AccountResponse } from '../protobuf/core_pb';
import { MedusaProductTypeNames } from '../types/medusa.type';
import { AccountFollowItemSuspenseDesktopComponent } from './desktop/suspense/account-follow-item.suspense.desktop.component';
import { AccountFollowItemSuspenseTabletComponent } from './tablet/suspense/account-follow-item.suspense.tablet.component';
import { AccountFollowItemSuspenseMobileComponent } from './mobile/suspense/account-follow-item.suspense.mobile.component';
import BucketService from '../services/bucket.service';

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
  account: AccountResponse;
  follower: AccountFollowerResponse | null;
  customer: CustomerResponse | null;
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
  account,
  follower,
  customer,
  isRequest,
  onClick,
  onFollow,
  onUnfollow,
  onRequested,
  onConfirm,
  onRemove,
}: AccountFollowItemProps): JSX.Element {
  const [profileUrl, setProfileUrl] = useState<string | undefined>(undefined);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  useEffect(() => {
    BucketService.getPublicUrlAsync(
      StorageFolderType.Avatars,
      account.profileUrl
    ).then((value) => {
      setProfileUrl(value);
    });
  }, [account]);

  useEffect(() => {
    setIsFollowing(follower?.isFollowing ?? false);
    setIsAccepted(follower?.accepted ?? false);
  }, [follower]);

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
        account={account}
        follower={follower}
        customer={customer}
        isRequest={isRequest}
        isFollowing={isFollowing}
        isAccepted={isAccepted}
        profileUrl={profileUrl}
        onClick={onClick}
        onFollow={onFollowOverride}
        onUnfollow={onUnfollowOverride}
        onRequested={onRequestedOverride}
        onConfirm={onConfirmOverride}
        onRemove={onRemoveOverride}
      />
      <AccountFollowItemTabletComponent
        account={account}
        follower={follower}
        customer={customer}
        isRequest={isRequest}
        isFollowing={isFollowing}
        isAccepted={isAccepted}
        profileUrl={profileUrl}
        onClick={onClick}
        onFollow={onFollowOverride}
        onUnfollow={onUnfollowOverride}
        onRequested={onRequestedOverride}
        onConfirm={onConfirmOverride}
        onRemove={onRemoveOverride}
      />
      <AccountFollowItemMobileComponent
        account={account}
        follower={follower}
        customer={customer}
        isRequest={isRequest}
        isFollowing={isFollowing}
        isAccepted={isAccepted}
        profileUrl={profileUrl}
        onClick={onClick}
        onFollow={onFollowOverride}
        onUnfollow={onUnfollowOverride}
        onRequested={onRequestedOverride}
        onConfirm={onConfirmOverride}
        onRemove={onRemoveOverride}
      />
    </React.Suspense>
  );
}
