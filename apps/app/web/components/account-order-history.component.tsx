import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountOrderHistorySuspenseDesktopComponent } from './desktop/suspense/account-order-history.suspense.desktop.component';
import { AccountOrderHistorySuspenseMobileComponent } from './mobile/suspense/account-order-history.suspense.mobile.component';

const AccountOrderHistoryDesktopComponent = React.lazy(
  () => import('./desktop/account-order-history.desktop.component')
);
const AccountOrderHistoryMobileComponent = React.lazy(
  () => import('./mobile/account-order-history.mobile.component')
);

export interface AccountOrderHistoryResponsiveProps {}

function AccountOrderHistoryComponent(): JSX.Element {
  const { AccountController } = React.useContext(DIContext);
  const { suspense } = AccountController.model;

  React.useEffect(() => {
    AccountController.loadOrders();
  }, []);

  const suspenceComponent = (
    <>
      <AccountOrderHistorySuspenseDesktopComponent />
      <AccountOrderHistorySuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountOrderHistoryDesktopComponent />
        <AccountOrderHistoryMobileComponent />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}

export default observer(AccountOrderHistoryComponent);
