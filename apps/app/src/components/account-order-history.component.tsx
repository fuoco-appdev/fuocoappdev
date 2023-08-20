import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { AccountOrderHistoryDesktopComponent } from './desktop/account-order-history.desktop.component';
import { AccountOrderHistoryMobileComponent } from './mobile/account-order-history.mobile.component';

export default function AccountOrderHistoryComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountOrderHistoryDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountOrderHistoryMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
