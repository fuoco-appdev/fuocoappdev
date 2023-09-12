import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountOrderHistoryDesktopComponent } from './desktop/account-order-history.desktop.component';
import { AccountOrderHistoryMobileComponent } from './mobile/account-order-history.mobile.component';
import { useEffect, useLayoutEffect, useRef } from 'react';
import AccountController from '../controllers/account.controller';
import { useObservable } from '@ngneat/use-observable';

export interface AccountOrderHistoryResponsiveProps {
  ordersContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  const ordersContainerRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(AccountController.model.store);

  const onScroll = () => {
    const scrollTop = ordersContainerRef.current?.scrollTop ?? 0;
    const scrollHeight = ordersContainerRef.current?.scrollHeight ?? 0;
    const clientHeight = ordersContainerRef.current?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;
    if (scrollOffset > 0) {
      return;
    }

    if (AccountController.model.hasMoreOrders) {
      AccountController.onNextOrderScrollAsync();
    }
  };

  useLayoutEffect(() => {
    if (props.scrollPosition) {
      ordersContainerRef.current?.scrollTo(0, props.scrollPosition);
      AccountController.updateOrdersScrollPosition(undefined);
    }

    ordersContainerRef.current?.addEventListener('scroll', onScroll);
    ordersContainerRef.current?.addEventListener('touchmove', onScroll);
    return () => {
      ordersContainerRef.current?.removeEventListener('scroll', onScroll);
      ordersContainerRef.current?.removeEventListener('touchmove', onScroll);
    };
  }, [ordersContainerRef.current]);

  return (
    <>
      <ResponsiveDesktop>
        <AccountOrderHistoryDesktopComponent
          ordersContainerRef={ordersContainerRef}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountOrderHistoryMobileComponent
          ordersContainerRef={ordersContainerRef}
        />
      </ResponsiveMobile>
    </>
  );
}
