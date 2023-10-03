import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { useEffect, useLayoutEffect, useRef } from 'react';
import AccountController from '../controllers/account.controller';
import { useObservable } from '@ngneat/use-observable';
import { AccountState } from '../models/account.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import { AccountOrderHistorySuspenseDesktopComponent } from './desktop/suspense/account-order-history.suspense.desktop.component';
import React from 'react';
import { AccountOrderHistorySuspenseMobileComponent } from './mobile/suspense/account-order-history.suspense.mobile.component';

const AccountOrderHistoryDesktopComponent = lazy(
  () => import('./desktop/account-order-history.desktop.component')
);
const AccountOrderHistoryMobileComponent = lazy(
  () => import('./mobile/account-order-history.mobile.component')
);

export interface AccountOrderHistoryResponsiveProps {
  accountProps: AccountState;
  onOrdersScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onOrdersLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  const [accountProps] = useObservable(AccountController.model.store);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (scrollOffset > 16 || !AccountController.model.hasMoreOrders) {
      return;
    }

    AccountController.onNextOrderScrollAsync();
  };

  const onLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (accountProps.scrollPosition) {
      e.currentTarget.scrollTop = accountProps.scrollPosition as number;
      AccountController.updateOrdersScrollPosition(undefined);
    }
  };

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <AccountOrderHistorySuspenseDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <AccountOrderHistorySuspenseMobileComponent />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <ResponsiveDesktop>
          <AccountOrderHistoryDesktopComponent
            accountProps={accountProps}
            onOrdersScroll={onScroll}
            onOrdersLoad={onLoad}
          />
        </ResponsiveDesktop>
        <ResponsiveMobile>
          <AccountOrderHistoryMobileComponent
            accountProps={accountProps}
            onOrdersScroll={onScroll}
            onOrdersLoad={onLoad}
          />
        </ResponsiveMobile>
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
