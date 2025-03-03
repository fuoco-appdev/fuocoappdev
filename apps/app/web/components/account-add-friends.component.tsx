import * as React from 'react';
import { Helmet } from 'react-helmet';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountAddFriendsSuspenseDesktopComponent } from './desktop/suspense/account-add-friends.suspense.desktop.component';
import { AccountAddFriendsSuspenseMobileComponent } from './mobile/suspense/account-add-friends.suspense.mobile.component';

const AccountAddFriendsDesktopComponent = React.lazy(
  () => import('./desktop/account-add-friends.desktop.component')
);
const AccountAddFriendsMobileComponent = React.lazy(
  () => import('./mobile/account-add-friends.mobile.component')
);

export interface AccountAddFriendsResponsiveProps {
  locationDropdownOpen: boolean;
  setLocationDropdownOpen: (value: boolean) => void;
}

export default function AccountAddFriendsComponent(): JSX.Element {
  const { AccountController } = React.useContext(DIContext);
  const { suspense } = AccountController.model;
  const [locationDropdownOpen, setLocationDropdownOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    // AccountController.loadFollowRequestsAndFriendsAccountsAsync();
  }, []);

  const suspenceComponent = (
    <>
      <AccountAddFriendsSuspenseDesktopComponent />
      <AccountAddFriendsSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Add Friends | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Add Friends | fuoco.appdev'} />
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
        <meta property="og:title" content={'Add Friends | fuoco.appdev'} />
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
          <AccountAddFriendsDesktopComponent
            locationDropdownOpen={locationDropdownOpen}
            setLocationDropdownOpen={setLocationDropdownOpen}
          />
          <AccountAddFriendsMobileComponent
            locationDropdownOpen={locationDropdownOpen}
            setLocationDropdownOpen={setLocationDropdownOpen}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
