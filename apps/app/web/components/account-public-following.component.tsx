import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { AccountPublicFollowingSuspenseDesktopComponent } from './desktop/suspense/account-public-following.suspense.desktop.component';
import { AccountPublicFollowingSuspenseMobileComponent } from './mobile/suspense/account-public-following.suspense.mobile.component';

const AccountPublicFollowingDesktopComponent = React.lazy(
  () => import('./desktop/account-public-following.desktop.component')
);
const AccountPublicFollowingMobileComponent = React.lazy(
  () => import('./mobile/account-public-following.mobile.component')
);

export interface AccountPublicFollowingResponsiveProps {
  onItemClick: (followerId: string) => void;
}

function AccountPublicFollowingComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { AccountPublicController, AccountController } =
    React.useContext(DIContext);
  const { suspense } = AccountPublicController.model;

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
    AccountPublicController.loadFollowingAsync();
  }, []);

  const suspenceComponent = (
    <>
      <AccountPublicFollowingSuspenseDesktopComponent />
      <AccountPublicFollowingSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Following | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Following | fuoco.appdev'} />
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
        <meta property="og:title" content={'Following | fuoco.appdev'} />
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
        <AccountPublicFollowingDesktopComponent onItemClick={onItemClick} />
        <AccountPublicFollowingMobileComponent onItemClick={onItemClick} />
      </React.Suspense>
    </>
  );
}

export default observer(AccountPublicFollowingComponent);
