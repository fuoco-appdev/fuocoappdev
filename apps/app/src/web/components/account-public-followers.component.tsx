import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import AccountPublicController from '../../controllers/account-public.controller';
import AccountController from '../../controllers/account.controller';
import { AccountPublicState } from '../../models/account-public.model';
import { AccountState } from '../../models/account.model';
import { RoutePathsType } from '../../route-paths-type';
import { useQuery } from '../route-paths';
import { AccountPublicFollowersSuspenseDesktopComponent } from './desktop/suspense/account-public-followers.suspense.desktop.component';
import { AccountPublicFollowersSuspenseMobileComponent } from './mobile/suspense/account-public-followers.suspense.mobile.component';

const AccountPublicFollowersDesktopComponent = React.lazy(
  () => import('./desktop/account-public-followers.desktop.component')
);
const AccountPublicFollowersMobileComponent = React.lazy(
  () => import('./mobile/account-public-followers.mobile.component')
);

export interface AccountPublicFollowersResponsiveProps {
  accountPublicProps: AccountPublicState;
  accountProps: AccountState;
  onItemClick: (followerId: string) => void;
}

export default function AccountPublicFollowersComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [accountPublicDebugProps] = useObservable(
    AccountPublicController.model.debugStore
  );
  const [accountProps] = useObservable(AccountController.model.store);

  const onItemClick = (followerId: string) => {
    if (AccountController.model.account?.id !== followerId) {
      navigate({
        pathname: `${RoutePathsType.Account}/${followerId}/likes`,
        search: query.toString(),
      });
    } else {
      navigate({
        pathname: RoutePathsType.AccountLikes,
        search: query.toString(),
      });
    }
  };

  React.useEffect(() => {
    AccountPublicController.loadFollowersAsync();
  }, []);

  const suspenceComponent = (
    <>
      <AccountPublicFollowersSuspenseDesktopComponent />
      <AccountPublicFollowersSuspenseMobileComponent />
    </>
  );

  if (accountPublicDebugProps.suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Followers | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Followers | fuoco.appdev'} />
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
        <meta property="og:title" content={'Followers | fuoco.appdev'} />
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
        <AccountPublicFollowersMobileComponent
          accountPublicProps={accountPublicProps}
          accountProps={accountProps}
          onItemClick={onItemClick}
        />
      </React.Suspense>
    </>
  );
}
