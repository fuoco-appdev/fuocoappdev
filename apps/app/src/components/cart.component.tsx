import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { CartDesktopComponent } from './desktop/cart.desktop.component';
import { CartMobileComponent } from './mobile/cart.mobile.component';

export default function CartComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CartDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CartMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
