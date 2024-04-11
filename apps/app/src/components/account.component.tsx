import React, { useEffect, useRef, useState } from 'react';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { RoutePathsType, useQuery } from '../route-paths';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { AccountState } from '../models/account.model';
import { WindowState } from '../models/window.model';
import { StoreState } from '../models/store.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import { AccountSuspenseDesktopComponent } from './desktop/suspense/account.suspense.desktop.component';
import { AccountSuspenseMobileComponent } from './mobile/suspense/account.suspense.mobile.component';
import { AccountSuspenseTabletComponent } from './tablet/suspense/account.suspense.tablet.component';

const AccountDesktopComponent = lazy(
  () => import('./desktop/account.desktop.component')
);
const AccountTabletComponent = lazy(
  () => import('./tablet/account.tablet.component')
);
const AccountMobileComponent = lazy(
  () => import('./mobile/account.mobile.component')
);

export type AccountOutletContextType = {
  scrollContainerRef: React.RefObject<HTMLDivElement> | undefined;
};

export function useAccountOutletContext() {
  return useOutletContext<AccountOutletContextType>();
}

export interface AccountResponsiveProps {
  windowProps: WindowState;
  accountProps: AccountState;
  storeProps: StoreState;
  isCropImageModalVisible: boolean;
  likeCount: string | undefined;
  followerCount: string | undefined;
  followingCount: string | undefined;
  isAddInterestOpen: boolean;
  setIsAddInterestOpen: (value: boolean) => void;
  setIsCropImageModalVisible: (value: boolean) => void;
  onUsernameChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompleteProfile: () => void;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onScrollLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onAvatarChanged: (index: number, blob: Blob) => void;
  onLikesClick: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

export default function AccountComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const [accountProps] = useObservable(AccountController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [isCropImageModalVisible, setIsCropImageModalVisible] =
    useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<string | undefined>(undefined);
  const [followerCount, setFollowerCount] = useState<string | undefined>(
    undefined
  );
  const [followingCount, setFollowingCount] = useState<string | undefined>(
    undefined
  );
  const [isAddInterestOpen, setIsAddInterestOpen] = useState<boolean>(false);
  const renderCountRef = useRef<number>(0);
  const scrollOffsetTriggerGap = 16;

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (AccountController.model.activeTabId === RoutePathsType.AccountLikes) {
      if (
        scrollOffset > scrollOffsetTriggerGap ||
        !AccountController.model.hasMoreLikes
      ) {
        return;
      }

      AccountController.onNextLikedProductScrollAsync();
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountOrderHistory
    ) {
      if (
        scrollOffset > scrollOffsetTriggerGap ||
        !AccountController.model.hasMoreOrders
      ) {
        return;
      }

      AccountController.onNextOrderScrollAsync();
    }
  };

  const onScrollLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (AccountController.model.activeTabId === RoutePathsType.AccountLikes) {
      if (AccountController.model.likesScrollPosition) {
        e.currentTarget.scrollTop = AccountController.model
          .likesScrollPosition as number;
        AccountController.updateLikesScrollPosition(undefined);
      }
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountOrderHistory
    ) {
      if (AccountController.model.ordersScrollPosition) {
        e.currentTarget.scrollTop = AccountController.model
          .ordersScrollPosition as number;
        AccountController.updateOrdersScrollPosition(undefined);
      }
    }
  };

  const onUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    AccountController.checkIfUsernameExists(event.target.value);
  };

  const onCompleteProfile = async () => {
    AccountController.updateProfileErrors({
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      phoneNumber: undefined,
    });
    const errors = await AccountController.getProfileFormErrorsAsync(
      AccountController.model.profileForm
    );
    if (errors) {
      AccountController.updateProfileErrors(errors);
      return;
    }
    AccountController.completeProfileAsync();
  };

  const onAvatarChanged = async (index: number, blob: Blob) => {
    await AccountController.uploadAvatarAsync(index, blob);
    setIsCropImageModalVisible(false);
  };

  const onLikesClick = () => {
    navigate({
      pathname: RoutePathsType.AccountLikes,
      search: query.toString(),
    });
  };

  const onFollowersClick = () => {
    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${accountProps.account?.id}/followers`,
      search: query.toString(),
    });
  };

  const onFollowingClick = () => {
    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${accountProps.account?.id}/following`,
      search: query.toString(),
    });
  };

  useEffect(() => {
    AccountController.updateErrorStrings({
      empty: t('fieldEmptyError') ?? '',
      exists: t('fieldExistsError') ?? '',
      spaces: t('fieldSpacesError') ?? '',
    });
  }, [i18n.language]);

  useEffect(() => {
    renderCountRef.current += 1;
    AccountController.load(renderCountRef.current);
    if (windowProps.activeRoute === RoutePathsType.Account) {
      navigate({
        pathname: RoutePathsType.AccountLikes,
        search: query.toString(),
      });
    }

    return () => {
      AccountController.disposeLoad(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    if (accountProps.likeCount !== undefined) {
      setLikeCount(
        new Intl.NumberFormat(i18n.language).format(accountProps.likeCount)
      );
    }

    if (accountProps.followerCount !== undefined) {
      setFollowerCount(
        new Intl.NumberFormat(i18n.language).format(accountProps.followerCount)
      );
    }

    if (accountProps.followingCount !== undefined) {
      setFollowingCount(
        new Intl.NumberFormat(i18n.language).format(accountProps.followingCount)
      );
    }
  }, [
    accountProps.likeCount,
    accountProps.followerCount,
    accountProps.followingCount,
  ]);

  useEffect(() => {
    const loadedLocation = windowProps.loadedLocationPath as string | undefined;
    if (loadedLocation && loadedLocation !== RoutePathsType.Account) {
      if (
        loadedLocation.startsWith(RoutePathsType.Account) &&
        !WindowController.isLocationAccountWithId(loadedLocation) &&
        !loadedLocation.startsWith(RoutePathsType.AccountSettings)
      ) {
        AccountController.updateActiveTabId(loadedLocation);
      }
      WindowController.updateLoadedLocationPath(undefined);
    } else {
      if (!loadedLocation?.startsWith(RoutePathsType.AccountSettings)) {
        navigate({
          pathname: accountProps.activeTabId,
          search: query.toString(),
        });
      }
    }
  }, [windowProps.loadedLocationPath]);

  useEffect(() => {
    if (AccountController.model.activeTabId === location.pathname) {
      return;
    }

    if (location.pathname === RoutePathsType.AccountLikes) {
      AccountController.updateActiveTabId(RoutePathsType.AccountLikes);
    } else if (location.pathname === RoutePathsType.AccountOrderHistory) {
      AccountController.updateActiveTabId(RoutePathsType.AccountOrderHistory);
    } else if (location.pathname === RoutePathsType.AccountAddresses) {
      AccountController.updateActiveTabId(RoutePathsType.AccountAddresses);
    }
  }, [location.pathname]);

  const suspenceComponent = (
    <>
      <AccountSuspenseDesktopComponent />
      <AccountSuspenseTabletComponent />
      <AccountSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

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
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <AuthenticatedComponent>
          <AccountDesktopComponent
            accountProps={accountProps}
            windowProps={windowProps}
            storeProps={storeProps}
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={likeCount}
            followerCount={followerCount}
            followingCount={followingCount}
            isAddInterestOpen={isAddInterestOpen}
            setIsAddInterestOpen={setIsAddInterestOpen}
            setIsCropImageModalVisible={setIsCropImageModalVisible}
            onUsernameChanged={onUsernameChanged}
            onCompleteProfile={onCompleteProfile}
            onScroll={onScroll}
            onScrollLoad={onScrollLoad}
            onAvatarChanged={onAvatarChanged}
            onLikesClick={onLikesClick}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
          <AccountTabletComponent
            accountProps={accountProps}
            windowProps={windowProps}
            storeProps={storeProps}
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={likeCount}
            followerCount={followerCount}
            followingCount={followingCount}
            isAddInterestOpen={isAddInterestOpen}
            setIsAddInterestOpen={setIsAddInterestOpen}
            setIsCropImageModalVisible={setIsCropImageModalVisible}
            onUsernameChanged={onUsernameChanged}
            onCompleteProfile={onCompleteProfile}
            onScroll={onScroll}
            onScrollLoad={onScrollLoad}
            onAvatarChanged={onAvatarChanged}
            onLikesClick={onLikesClick}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
          <AccountMobileComponent
            accountProps={accountProps}
            windowProps={windowProps}
            storeProps={storeProps}
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={likeCount}
            followerCount={followerCount}
            followingCount={followingCount}
            isAddInterestOpen={isAddInterestOpen}
            setIsAddInterestOpen={setIsAddInterestOpen}
            setIsCropImageModalVisible={setIsCropImageModalVisible}
            onUsernameChanged={onUsernameChanged}
            onCompleteProfile={onCompleteProfile}
            onScroll={onScroll}
            onScrollLoad={onScrollLoad}
            onAvatarChanged={onAvatarChanged}
            onLikesClick={onLikesClick}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
