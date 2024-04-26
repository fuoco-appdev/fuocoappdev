import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import AccountController from '../controllers/account.controller';
import { AccountState } from '../models/account.model';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountOrderHistorySuspenseDesktopComponent } from './desktop/suspense/account-order-history.suspense.desktop.component';
import { AccountOrderHistorySuspenseMobileComponent } from './mobile/suspense/account-order-history.suspense.mobile.component';
import { AccountOrderHistorySuspenseTabletComponent } from './tablet/suspense/account-order-history.suspense.tablet.component';

const AccountOrderHistoryDesktopComponent = lazy(
  () => import('./desktop/account-order-history.desktop.component')
);
const AccountOrderHistoryTabletComponent = lazy(
  () => import('./tablet/account-order-history.tablet.component')
);
const AccountOrderHistoryMobileComponent = lazy(
  () => import('./mobile/account-order-history.mobile.component')
);

export interface AccountOrderHistoryResponsiveProps {
  accountProps: AccountState;
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  const [accountProps] = useObservable(AccountController.model.store);

  React.useEffect(() => {
    AccountController.loadOrders();
  }, []);

  const suspenceComponent = (
    <>
      <AccountOrderHistorySuspenseDesktopComponent />
      <AccountOrderHistorySuspenseTabletComponent />
      <AccountOrderHistorySuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountOrderHistoryDesktopComponent accountProps={accountProps} />
        <AccountOrderHistoryTabletComponent accountProps={accountProps} />
        <AccountOrderHistoryMobileComponent accountProps={accountProps} />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
