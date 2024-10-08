import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import AccountController from '../../shared/controllers/account.controller';
import { AccountState } from '../../shared/models/account.model';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountOrderHistorySuspenseDesktopComponent } from './desktop/suspense/account-order-history.suspense.desktop.component';
import { AccountOrderHistorySuspenseMobileComponent } from './mobile/suspense/account-order-history.suspense.mobile.component';

const AccountOrderHistoryDesktopComponent = React.lazy(
  () => import('./desktop/account-order-history.desktop.component')
);
const AccountOrderHistoryMobileComponent = React.lazy(
  () => import('./mobile/account-order-history.mobile.component')
);

export interface AccountOrderHistoryResponsiveProps {
  accountProps: AccountState;
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  const [accountProps] = useObservable(AccountController.model.store);
  const [accountDebugProps] = useObservable(AccountController.model.debugStore);

  React.useEffect(() => {
    AccountController.loadOrders();
  }, []);

  const suspenceComponent = (
    <>
      <AccountOrderHistorySuspenseDesktopComponent />
      <AccountOrderHistorySuspenseMobileComponent />
    </>
  );

  if (accountDebugProps.suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountOrderHistoryDesktopComponent accountProps={accountProps} />
        <AccountOrderHistoryMobileComponent accountProps={accountProps} />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
