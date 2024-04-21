import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AccountPublicController from '../controllers/account-public.controller';
import WindowController from '../controllers/window.controller';
import { AccountPublicState } from '../models/account-public.model';
import { RoutePathsType } from '../route-paths';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountPublicStatusSuspenseDesktopComponent } from './desktop/suspense/account-public-status.suspense.desktop.component';
import { AccountPublicStatusSuspenseMobileComponent } from './mobile/suspense/account-public-status.suspense.mobile.component';
import { AccountPublicStatusSuspenseTabletComponent } from './tablet/suspense/account-public-status.suspense.tablet.component';

const AccountPublicStatusDesktopComponent = lazy(
  () => import('./desktop/account-public-status.desktop.component')
);
const AccountPublicStatusTabletComponent = lazy(
  () => import('./tablet/account-public-status.tablet.component')
);
const AccountPublicStatusMobileComponent = lazy(
  () => import('./mobile/account-public-status.mobile.component')
);

export interface AccountFollowersFollowingResponsiveProps {
  accountPublicProps: AccountPublicState;
  followerCount: string | undefined;
  followingCount: string | undefined;
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

export default function AccountFollowersFollowingComponent(): JSX.Element {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [followerCount, setFollowerCount] = React.useState<string | undefined>(
    undefined
  );
  const [followingCount, setFollowingCount] = React.useState<
    string | undefined
  >(undefined);
  const scrollOffsetTriggerGap = 16;

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowers
    ) {
      if (
        scrollOffset > scrollOffsetTriggerGap ||
        !AccountPublicController.model.hasMoreFollowers
      ) {
        return;
      }
      AccountPublicController.onFollowersScrollAsync();
    } else if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowing
    ) {
      if (
        scrollOffset > scrollOffsetTriggerGap ||
        !AccountPublicController.model.hasMoreFollowing
      ) {
        return;
      }
      AccountPublicController.onFollowingScrollAsync();
    }
  };

  const onLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowers
    ) {
      if (AccountPublicController.model.followerScrollPosition) {
        e.currentTarget.scrollTop = AccountPublicController.model
          .followerScrollPosition as number;
        AccountPublicController.updateFollowerScrollPosition(undefined);
      }
    } else if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowing
    ) {
      if (AccountPublicController.model.followingScrollPosition) {
        e.currentTarget.scrollTop = AccountPublicController.model
          .followingScrollPosition as number;
        AccountPublicController.updateFollowingScrollPosition(undefined);
      }
    }
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }

    AccountPublicController.updateAccountId(id);
  }, []);

  React.useEffect(() => {
    if (
      WindowController.isLocationAccountStatusWithId(
        location.pathname,
        RoutePathsType.AccountStatusWithIdFollowers
      )
    ) {
      AccountPublicController.updateActiveStatusTabId(
        RoutePathsType.AccountStatusWithIdFollowers
      );
    } else if (
      WindowController.isLocationAccountStatusWithId(
        location.pathname,
        RoutePathsType.AccountStatusWithIdFollowing
      )
    ) {
      AccountPublicController.updateActiveStatusTabId(
        RoutePathsType.AccountStatusWithIdFollowing
      );
    }
  }, [location.pathname]);

  React.useEffect(() => {
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

  const suspenceComponent = (
    <>
      <AccountPublicStatusSuspenseDesktopComponent />
      <AccountPublicStatusSuspenseMobileComponent />
      <AccountPublicStatusSuspenseTabletComponent />
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
          <AccountPublicStatusDesktopComponent
            accountPublicProps={accountPublicProps}
            followerCount={followerCount}
            followingCount={followingCount}
            onScroll={onScroll}
            onLoad={onLoad}
          />
          <AccountPublicStatusTabletComponent
            accountPublicProps={accountPublicProps}
            followerCount={followerCount}
            followingCount={followingCount}
            onScroll={onScroll}
            onLoad={onLoad}
          />
          <AccountPublicStatusMobileComponent
            accountPublicProps={accountPublicProps}
            followerCount={followerCount}
            followingCount={followingCount}
            onScroll={onScroll}
            onLoad={onLoad}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
