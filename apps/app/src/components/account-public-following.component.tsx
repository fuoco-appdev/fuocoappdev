import { Helmet } from 'react-helmet';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import { WindowState } from '../models/window.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import React, { useEffect } from 'react';
import AccountPublicController from '../controllers/account-public.controller';
import { AccountState } from '../models/account.model';
import { AccountPublicState } from '../models/account-public.model';
import { AccountPublicFollowingSuspenseDesktopComponent } from './desktop/suspense/account-public-following.suspense.desktop.component';
import { AccountPublicFollowingSuspenseMobileComponent } from './mobile/suspense/account-public-following.suspense.mobile.component';
import { AccountPublicFollowingSuspenseTabletComponent } from './tablet/suspense/account-public-following.suspense.tablet.component copy';
import { useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import { RoutePathsType } from '../route-paths';

const AccountPublicFollowingDesktopComponent = lazy(
  () => import('./desktop/account-public-following.desktop.component')
);
const AccountPublicFollowingTabletComponent = lazy(
  () => import('./tablet/account-public-following.tablet.component')
);
const AccountPublicFollowingMobileComponent = lazy(
  () => import('./mobile/account-public-following.mobile.component')
);

export interface AccountPublicFollowingResponsiveProps {
  accountPublicProps: AccountPublicState;
  onItemClick: (followerId: string) => void;
}

export default function AccountPublicFollowingComponent(): JSX.Element {
  const navigate = useNavigate();
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );

  const onItemClick = (followerId: string) => {
    if (AccountController.model.account?.id !== followerId) {
      navigate(`${RoutePathsType.Account}/${followerId}/likes`);
    } else {
      navigate(RoutePathsType.AccountLikes);
    }
  };

  useEffect(() => {
    AccountPublicController.loadFollowingAsync();
  }, []);

  const suspenceComponent = (
    <>
      <AccountPublicFollowingSuspenseDesktopComponent />
      <AccountPublicFollowingSuspenseMobileComponent />
      <AccountPublicFollowingSuspenseTabletComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Following | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Following | Cruthology'} />
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
        <meta property="og:title" content={'Following | Cruthology'} />
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
        <AccountPublicFollowingDesktopComponent
          accountPublicProps={accountPublicProps}
          onItemClick={onItemClick}
        />
        <AccountPublicFollowingTabletComponent
          accountPublicProps={accountPublicProps}
          onItemClick={onItemClick}
        />
        <AccountPublicFollowingMobileComponent
          accountPublicProps={accountPublicProps}
          onItemClick={onItemClick}
        />
      </React.Suspense>
    </>
  );
}
