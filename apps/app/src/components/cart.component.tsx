import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { CartDesktopComponent } from './desktop/cart.desktop.component';
import { CartMobileComponent } from './mobile/cart.mobile.component';
import { useEffect, useState } from 'react';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import { useObservable } from '@ngneat/use-observable';
import CartController from '../controllers/cart.controller';
import { Store } from '@ngneat/elf';

export default function CartComponent(): JSX.Element {
  const [localProps] = useObservable(
    CartController.model.localStore ?? Store.prototype
  );
  const [salesChannelTabs, setSalesChannelTabs] = useState<TabProps[]>([]);

  useEffect(() => {
    for (const key in localProps.cartIds) {
      console.log(key);
    }
  }, [localProps.cartIds]);

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
