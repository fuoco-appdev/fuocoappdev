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
import { AccountPublicFollowersSuspenseDesktopComponent } from './desktop/suspense/account-public-followers.suspense.desktop.component';
import { AccountPublicFollowersSuspenseMobileComponent } from './mobile/suspense/account-public-followers.suspense.mobile.component';
import { AccountPublicFollowersSuspenseTabletComponent } from './tablet/suspense/account-public-followers.suspense.tablet.component';
import AccountController from '../controllers/account.controller';
import { RoutePathsType } from '../route-paths';
import { useNavigate } from 'react-router-dom';

const AccountPublicFollowersDesktopComponent = lazy(
  () => import('./desktop/account-public-followers.desktop.component')
);
const AccountPublicFollowersTabletComponent = lazy(
  () => import('./tablet/account-public-followers.tablet.component')
);
const AccountPublicFollowersMobileComponent = lazy(
  () => import('./mobile/account-public-followers.mobile.component')
);

export interface AccountPublicFollowersResponsiveProps {
  accountPublicProps: AccountPublicState;
  accountProps: AccountState;
  onItemClick: (followerId: string) => void;
}

export default function AccountPublicFollowersComponent(): JSX.Element {
  const navigate = useNavigate();
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [accountProps] = useObservable(AccountController.model.store);

  const onItemClick = (followerId: string) => {
    if (AccountController.model.account?.id !== followerId) {
      navigate(`${RoutePathsType.Account}/${followerId}/likes`);
    } else {
      navigate(RoutePathsType.AccountLikes);
    }
  };

  useEffect(() => {
    AccountPublicController.loadFollowersAsync();
  }, []);

  const suspenceComponent = (
    <>
      <AccountPublicFollowersSuspenseDesktopComponent />
      <AccountPublicFollowersSuspenseMobileComponent />
      <AccountPublicFollowersSuspenseTabletComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Followers | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Followers | Cruthology'} />
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
        <meta property="og:title" content={'Followers | Cruthology'} />
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
        <AccountPublicFollowersDesktopComponent
          accountPublicProps={accountPublicProps}
          accountProps={accountProps}
          onItemClick={onItemClick}
        />
        <AccountPublicFollowersTabletComponent
          accountPublicProps={accountPublicProps}
          accountProps={accountProps}
          onItemClick={onItemClick}
        />
        <AccountPublicFollowersMobileComponent
          accountPublicProps={accountPublicProps}
          accountProps={accountProps}
          onItemClick={onItemClick}
        />
      </React.Suspense>
    </>
  );
}