import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import AccountController from '../controllers/account.controller';
import { AccountState } from '../models/account.model';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountAddFriendsSuspenseDesktopComponent } from './desktop/suspense/account-add-friends.suspense.desktop.component';
import { AccountAddFriendsSuspenseMobileComponent } from './mobile/suspense/account-add-friends.suspense.mobile.component';
import { AccountAddFriendsSuspenseTabletComponent } from './tablet/suspense/account-add-friends.suspense.tablet.component';

const AccountAddFriendsDesktopComponent = lazy(
  () => import('./desktop/account-add-friends.desktop.component')
);
const AccountAddFriendsTabletComponent = lazy(
  () => import('./tablet/account-add-friends.tablet.component')
);
const AccountAddFriendsMobileComponent = lazy(
  () => import('./mobile/account-add-friends.mobile.component')
);

export interface AccountAddFriendsResponsiveProps {
  accountProps: AccountState;
  locationDropdownOpen: boolean;
  setLocationDropdownOpen: (value: boolean) => void;
}

export default function AccountAddFriendsComponent(): JSX.Element {
  const [accountProps] = useObservable(AccountController.model.store);
  const [locationDropdownOpen, setLocationDropdownOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    AccountController.loadFollowRequestsAndFriendsAccountsAsync();
  }, []);

  const suspenceComponent = (
    <>
      <AccountAddFriendsSuspenseDesktopComponent />
      <AccountAddFriendsSuspenseMobileComponent />
      <AccountAddFriendsSuspenseTabletComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Add Friends | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Add Friends | Cruthology'} />
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
        <meta property="og:title" content={'Add Friends | Cruthology'} />
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
            accountProps={accountProps}
            locationDropdownOpen={locationDropdownOpen}
            setLocationDropdownOpen={setLocationDropdownOpen}
          />
          <AccountAddFriendsTabletComponent
            accountProps={accountProps}
            locationDropdownOpen={locationDropdownOpen}
            setLocationDropdownOpen={setLocationDropdownOpen}
          />
          <AccountAddFriendsMobileComponent
            accountProps={accountProps}
            locationDropdownOpen={locationDropdownOpen}
            setLocationDropdownOpen={setLocationDropdownOpen}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
