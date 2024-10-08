import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AccountPublicController from '../../shared/controllers/account-public.controller';
import WindowController from '../../shared/controllers/window.controller';
import { AccountPublicState } from '../../shared/models/account-public.model';
import { RoutePathsType } from '../../shared/route-paths-type';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountPublicStatusSuspenseDesktopComponent } from './desktop/suspense/account-public-status.suspense.desktop.component';
import { AccountPublicStatusSuspenseMobileComponent } from './mobile/suspense/account-public-status.suspense.mobile.component';

const AccountPublicStatusDesktopComponent = React.lazy(
  () => import('./desktop/account-public-status.desktop.component')
);
const AccountPublicStatusMobileComponent = React.lazy(
  () => import('./mobile/account-public-status.mobile.component')
);

export interface AccountFollowersFollowingResponsiveProps {
  accountPublicProps: AccountPublicState;
  followerCount: string | undefined;
  followingCount: string | undefined;
  onScrollLoad: () => void;
  onScrollReload: () => void;
}

export default function AccountFollowersFollowingComponent(): JSX.Element {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [accountPublicDebugProps] = useObservable(
    AccountPublicController.model.debugStore
  );
  const [followerCount, setFollowerCount] = React.useState<string | undefined>(
    undefined
  );
  const [followingCount, setFollowingCount] = React.useState<
    string | undefined
  >(undefined);
  const scrollOffsetTriggerGap = 16;

  const onScrollLoad = () => {
    if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowers
    ) {
      AccountPublicController.onFollowersScrollAsync();
    } else if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowing
    ) {
      AccountPublicController.onFollowingScrollAsync();
    }
  };

  const onScrollReload = () => {
    if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowers
    ) {
    } else if (
      AccountPublicController.model.activeStatusTabId ===
      RoutePathsType.AccountStatusWithIdFollowing
    ) {
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
    </>
  );

  if (accountPublicDebugProps.suspense) {
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
            onScrollLoad={onScrollLoad}
            onScrollReload={onScrollReload}
          />
          <AccountPublicStatusMobileComponent
            accountPublicProps={accountPublicProps}
            followerCount={followerCount}
            followingCount={followingCount}
            onScrollLoad={onScrollLoad}
            onScrollReload={onScrollReload}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
