/* eslint-disable no-restricted-globals */
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { AccountPublicSuspenseDesktopComponent } from './desktop/suspense/account-public.suspense.desktop.component';
import { AccountPublicSuspenseMobileComponent } from './mobile/suspense/account-public.suspense.mobile.component';

const AccountPublicDesktopComponent = React.lazy(
  () => import('./desktop/account-public.desktop.component')
);
const AccountPublicMobileComponent = React.lazy(
  () => import('./mobile/account-public.mobile.component')
);

export type AccountPublicOutletContextType = {
  scrollContainerRef: React.RefObject<HTMLDivElement> | undefined;
};

export function useAccountPublicOutletContext() {
  return useOutletContext<AccountPublicOutletContextType>();
}

export interface AccountPublicResponsiveProps {
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
  onMessage: () => void;
}

function AccountPublicComponent(): JSX.Element {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const { id } = useParams();
  const { AccountPublicController, WindowController, AccountController } =
    React.useContext(DIContext);
  const {
    suspense,
    account,
    likesScrollPosition,
    accountFollower,
    followerCount,
    followingCount,
    likeCount,
  } = AccountPublicController.model;
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);
  const [isAccepted, setIsAccepted] = React.useState<boolean>(false);
  const [currentLikeCount, setCurrentLikeCount] = React.useState<
    string | undefined
  >(undefined);
  const [currentFollowerCount, setCurrentFollowerCount] = React.useState<
    string | undefined
  >(undefined);
  const [currentFollowingCount, setCurrentFollowingCount] = React.useState<
    string | undefined
  >(undefined);
  const renderCountRef = React.useRef<number>(0);
  const scrollOffsetTriggerGap = 16;

  const onFollow = () => {
    if (!account) {
      return;
    }

    setTimeout(() => {
      AccountController.requestFollowAsync(account.id);
      setIsFollowing(true);
    }, 150);
  };

  const onUnfollow = () => {
    if (!account) {
      return;
    }

    setTimeout(() => {
      AccountController.requestUnfollowAsync(account.id);
      setIsFollowing(false);
    }, 150);
  };

  const onRequested = () => {
    if (!account) {
      return;
    }

    setTimeout(() => {
      AccountController.requestUnfollowAsync(account.id);
      setIsFollowing(false);
      setIsAccepted(false);
    }, 150);
  };

  const onLikesClick = () => {
    if (!account) {
      return;
    }

    navigate({
      pathname: `${RoutePathsType.Account}/${account?.id}/likes`,
      search: query.toString(),
    });
  };

  const onFollowersClick = () => {
    if (!account) {
      return;
    }

    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${account?.id}/followers`,
      search: query.toString(),
    });
  };

  const onFollowingClick = () => {
    if (!account) {
      return;
    }

    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${account?.id}/following`,
      search: query.toString(),
    });
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
      if (likesScrollPosition) {
        e.currentTarget.scrollTop = likesScrollPosition as number;
        AccountPublicController.updateLikesScrollPosition(undefined);
      }
    }
  };

  const onMessage = () => {};

  React.useEffect(() => {
    renderCountRef.current += 1;
    AccountPublicController.load(renderCountRef.current);
    return () => {
      AccountPublicController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!id) {
      navigate(-1);
      return;
    }

    AccountPublicController.updateAccountId(id);
  }, [id]);

  React.useEffect(() => {
    setIsFollowing(accountFollower?.isFollowing ?? false);
    setIsAccepted(accountFollower?.accepted ?? false);
  }, [accountFollower]);

  React.useEffect(() => {
    if (likeCount !== undefined) {
      setCurrentLikeCount(
        new Intl.NumberFormat(i18n.language).format(likeCount)
      );
    }

    if (followerCount !== undefined) {
      setCurrentFollowerCount(
        new Intl.NumberFormat(i18n.language).format(followerCount)
      );
    }

    if (followingCount !== undefined) {
      setCurrentFollowingCount(
        new Intl.NumberFormat(i18n.language).format(followingCount)
      );
    }
  }, [likeCount, followerCount, followingCount]);

  React.useEffect(() => {
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
      <AccountPublicSuspenseMobileComponent />
    </>
  );

  if (suspense) {
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
          isFollowing={isFollowing}
          isAccepted={isAccepted}
          likeCount={currentLikeCount}
          followerCount={currentFollowerCount}
          followingCount={currentFollowingCount}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          onRequested={onRequested}
          onLikesClick={onLikesClick}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
          onMessage={onMessage}
        />
        <AccountPublicMobileComponent
          isFollowing={isFollowing}
          isAccepted={isAccepted}
          likeCount={currentLikeCount}
          followerCount={currentFollowerCount}
          followingCount={currentFollowingCount}
          onScroll={onScroll}
          onScrollLoad={onScrollLoad}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          onRequested={onRequested}
          onLikesClick={onLikesClick}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
          onMessage={onMessage}
        />
      </React.Suspense>
    </>
  );
}

export default observer(AccountPublicComponent);
