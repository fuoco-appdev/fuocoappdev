import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountOrderHistoryDesktopComponent } from './desktop/account-order-history.desktop.component';
import { AccountOrderHistoryMobileComponent } from './mobile/account-order-history.mobile.component';
import { useEffect, useLayoutEffect, useRef } from 'react';
import AccountController from '../controllers/account.controller';
import { useObservable } from '@ngneat/use-observable';

export interface AccountOrderHistoryResponsiveProps {
  onOrdersScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onOrdersLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);

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
    if (props.scrollPosition) {
      e.currentTarget.scrollTop = props.scrollPosition as number;
      AccountController.updateOrdersScrollPosition(undefined);
    }
  };

  return (
    <>
      <ResponsiveDesktop>
        <AccountOrderHistoryDesktopComponent
          onOrdersScroll={onScroll}
          onOrdersLoad={onLoad}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountOrderHistoryMobileComponent
          onOrdersScroll={onScroll}
          onOrdersLoad={onLoad}
        />
      </ResponsiveMobile>
    </>
  );
}
