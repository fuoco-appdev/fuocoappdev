/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { DIContext } from './app.component';
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
  followerCount: string | undefined;
  followingCount: string | undefined;
  onScrollLoad: () => void;
  onScrollReload: () => void;
}

export default function AccountFollowersFollowingComponent(): JSX.Element {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const { AccountPublicController, WindowController } =
    React.useContext(DIContext);
  const { suspense, followerCount, followingCount, likeCount } =
    AccountPublicController.model;
  const [currentFollowerCount, setCurrentFollowerCount] = React.useState<
    string | undefined
  >(undefined);
  const [currentFollowingCount, setCurrentFollowingCount] = React.useState<
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

  const suspenceComponent = (
    <>
      <AccountPublicStatusSuspenseDesktopComponent />
      <AccountPublicStatusSuspenseMobileComponent />
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
        <AuthenticatedComponent>
          <AccountPublicStatusDesktopComponent
            followerCount={currentFollowerCount}
            followingCount={currentFollowingCount}
            onScrollLoad={onScrollLoad}
            onScrollReload={onScrollReload}
          />
          <AccountPublicStatusMobileComponent
            followerCount={currentFollowerCount}
            followingCount={currentFollowingCount}
            onScrollLoad={onScrollLoad}
            onScrollReload={onScrollReload}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
