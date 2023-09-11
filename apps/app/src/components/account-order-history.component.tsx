import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountOrderHistoryDesktopComponent } from './desktop/account-order-history.desktop.component';
import { AccountOrderHistoryMobileComponent } from './mobile/account-order-history.mobile.component';
import { useEffect, useRef } from 'react';
import AccountController from '../controllers/account.controller';

export interface AccountOrderHistoryResponsiveProps {
  ordersContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  const ordersContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    ordersContainerRef.current?.addEventListener('scroll', onScroll);
    return () =>
      ordersContainerRef.current?.removeEventListener('scroll', onScroll);
  }, []);

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
