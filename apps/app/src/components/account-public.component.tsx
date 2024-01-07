import React, { useEffect, useState } from 'react';
import AccountController from '../controllers/account.controller';
import WindowController from '../controllers/window.controller';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { RoutePathsType } from '../route-paths';
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
import { AccountPublicSuspenseDesktopComponent } from './desktop/suspense/account-public.suspense.desktop.component';
import { AccountPublicSuspenseMobileComponent } from './mobile/suspense/account-public.suspense.mobile.component';
import { AccountPublicSuspenseTabletComponent } from './tablet/suspense/account-public.suspense.tablet.component';
import AccountPublicController from '../controllers/account-public.controller';
import { AccountPublicState } from '../models/account-public.model';

const AccountPublicDesktopComponent = lazy(
  () => import('./desktop/account-public.desktop.component')
);
const AccountPublicTabletComponent = lazy(
  () => import('./tablet/account-public.tablet.component')
);
const AccountPublicMobileComponent = lazy(
  () => import('./mobile/account-public.mobile.component')
);

export type AccountPublicOutletContextType = {
  scrollContainerRef: React.RefObject<HTMLDivElement> | undefined;
};

export function useAccountPublicOutletContext() {
  return useOutletContext<AccountPublicOutletContextType>();
}

export interface AccountPublicResponsiveProps {
  windowProps: WindowState;
  accountPublicProps: AccountPublicState;
  storeProps: StoreState;
  isFollowing: boolean;
  isAccepted: boolean;
  likeCount: string | undefined;
  followerCount: string | undefined;
  followingCount: string | undefined;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onScrollLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onFollow: () => void;
  onUnfollow: () => void;
  onRequested: () => void;
  onLikesClick: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

export default function AccountPublicComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [windowProps] = useObservable(WindowController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<string | undefined>(undefined);
  const [followerCount, setFollowerCount] = useState<string | undefined>(
    undefined
  );
  const [followingCount, setFollowingCount] = useState<string | undefined>(
    undefined
  );
  const scrollOffsetTriggerGap = 16;

  const onFollow = () => {
    setTimeout(() => {
      AccountController.requestFollowAsync(accountPublicProps.account.id);
      setIsFollowing(true);
    }, 150);
  };

  const onUnfollow = () => {
    setTimeout(() => {
      AccountController.requestUnfollowAsync(accountPublicProps.account.id);
      setIsFollowing(false);
    }, 150);
  };

  const onRequested = () => {
    setTimeout(() => {
      AccountController.requestUnfollowAsync(accountPublicProps.account.id);
      setIsFollowing(false);
      setIsAccepted(false);
    }, 150);
  };

  const onLikesClick = () => {
    if (!accountPublicProps.account) {
      return;
    }

    navigate(
      `${RoutePathsType.Account}/${accountPublicProps.account?.id}/likes`
    );
  };

  const onFollowersClick = () => {
    if (!accountPublicProps.account) {
      return;
    }

    navigate(
      `${RoutePathsType.AccountStatus}/${accountPublicProps.account?.id}/followers`
    );
  };

  const onFollowingClick = () => {
    if (!accountPublicProps.account) {
      return;
    }

    navigate(
      `${RoutePathsType.AccountStatus}/${accountPublicProps.account?.id}/following`
    );
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (
      AccountPublicController.model.activeTabId === RoutePathsType.AccountLikes
    ) {
      if (
        scrollOffset > scrollOffsetTriggerGap ||
        !AccountPublicController.model.hasMoreLikes
      ) {
        return;
      }

      AccountPublicController.onNextLikedProductScrollAsync();
    }
  };

  const onScrollLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (
      AccountPublicController.model.activeTabId === RoutePathsType.AccountLikes
    ) {
      if (accountPublicProps.likesScrollPosition) {
        e.currentTarget.scrollTop =
          accountPublicProps.likesScrollPosition as number;
        AccountPublicController.updateLikesScrollPosition(undefined);
      }
    }
  };

  useEffect(() => {
    if (!id) {
      navigate(-1);
      return;
    }

    AccountPublicController.updateAccountId(id);
  }, [id]);

  useEffect(() => {
    setIsFollowing(accountPublicProps.accountFollower?.isFollowing ?? false);
    setIsAccepted(accountPublicProps.accountFollower?.accepted ?? false);
  }, [accountPublicProps.accountFollower]);

  useEffect(() => {
    if (accountPublicProps.likeCount !== undefined) {
      setLikeCount(
        new Intl.NumberFormat(i18n.language).format(
          accountPublicProps.likeCount
        )
      );
    }

    if (accountPublicProps.followerCount !== undefined) {
      setFollowerCount(
        new Intl.NumberFormat(i18n.language).format(
          accountPublicProps.followerCount
        )
      );
    }

    if (accountPublicProps.followingCount !== undefined) {
      setFollowingCount(
        new Intl.NumberFormat(i18n.language).format(
          accountPublicProps.followingCount
        )
      );
    }
  }, [
    accountPublicProps.likeCount,
    accountPublicProps.followerCount,
    accountPublicProps.followingCount,
  ]);

  useEffect(() => {
    if (
      WindowController.isLocationAccountWithId(
        location.pathname,
        RoutePathsType.AccountWithIdLikes
      )
    ) {
      AccountPublicController.updateActiveTabId(
        RoutePathsType.AccountWithIdLikes
      );
    }
  }, [location.pathname]);

  const suspenceComponent = (
    <>
      <AccountPublicSuspenseDesktopComponent />
      <AccountPublicSuspenseTabletComponent />
      <AccountPublicSuspenseMobileComponent />
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
        <AccountPublicDesktopComponent
          accountPublicProps={accountPublicProps}
          windowProps={windowProps}
          storeProps={storeProps}
          isFollowing={isFollowing}
          isAccepted={isAccepted}
          likeCount={likeCount}
          followerCount={followerCount}
          followingCount={followingCount}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          onRequested={onRequested}
          onLikesClick={onLikesClick}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />
        <AccountPublicTabletComponent
          accountPublicProps={accountPublicProps}
          windowProps={windowProps}
          storeProps={storeProps}
          isFollowing={isFollowing}
          isAccepted={isAccepted}
          likeCount={likeCount}
          followerCount={followerCount}
          followingCount={followingCount}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          onRequested={onRequested}
          onLikesClick={onLikesClick}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />
        <AccountPublicMobileComponent
          accountPublicProps={accountPublicProps}
          windowProps={windowProps}
          storeProps={storeProps}
          isFollowing={isFollowing}
          isAccepted={isAccepted}
          likeCount={likeCount}
          followerCount={followerCount}
          followingCount={followingCount}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          onRequested={onRequested}
          onLikesClick={onLikesClick}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />
      </React.Suspense>
    </>
  );
}
