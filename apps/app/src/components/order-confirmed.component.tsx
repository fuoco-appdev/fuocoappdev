import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { OrderConfirmedDesktopComponent } from './desktop/order-confirmed.desktop.component';
import { OrderConfirmedMobileComponent } from './mobile/order-confirmed.mobile.component';

export interface OrderConfirmedProps {}

export default function OrderConfirmedComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <OrderConfirmedDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <OrderConfirmedMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
