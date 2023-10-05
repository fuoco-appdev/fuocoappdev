import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { useEffect, useState } from 'react';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import CartController from '../controllers/cart.controller';
import HomeController from '../controllers/home.controller';
import WindowController from '../controllers/window.controller';
import { Store } from '@ngneat/elf';
import {
  HomeLocalState,
  HomeState,
  InventoryLocation,
} from '../models/home.model';
import { Helmet } from 'react-helmet';
import { CartState } from '../models/cart.model';
import { StoreState } from '../models/store.model';
import { WindowState } from '../models/window.model';
import { lazy } from '@loadable/component';
import React from 'react';
import { CartSuspenseDesktopComponent } from './desktop/suspense/cart.suspense.desktop.component';
import { CartSuspenseMobileComponent } from './mobile/suspense/cart.suspense.mobile.component';

const CartDesktopComponent = lazy(
  () => import('./desktop/cart.desktop.component')
);
const CartMobileComponent = lazy(
  () => import('./mobile/cart.mobile.component')
);

export interface CartResponsiveProps {
  cartProps: CartState;
  homeProps: HomeState;
  storeProps: StoreState;
  windowProps: WindowState;
  homeLocalProps: HomeLocalState;
  salesChannelTabs: TabProps[];
}

export default function CartComponent(): JSX.Element {
  const [cartProps] = useObservable(CartController.model.store);
  const [homeProps] = useObservable(HomeController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [cartLocalProps] = useObservable(
    CartController.model.localStore ?? Store.prototype
  );
  const [homeLocalProps] = useObservable(
    HomeController.model.localStore ?? Store.prototype
  );
  const [salesChannelTabs, setSalesChannelTabs] = useState<TabProps[]>([]);

  useEffect(() => {
    const tabProps: TabProps[] = [];
    const locations = homeProps.inventoryLocations as InventoryLocation[];
    for (const key in cartLocalProps.cartIds) {
      if (!key.startsWith('sloc_')) {
        continue;
      }

      const location = locations.find((value) => value.id === key);
      const salesChannel = location?.salesChannels[0];
      tabProps.push({ id: key, label: salesChannel?.name });
    }

    setSalesChannelTabs(tabProps);
  }, [cartLocalProps.cartIds, homeProps.inventoryLocations]);

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <CartSuspenseDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <CartSuspenseMobileComponent />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Home | Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ResponsiveDesktop>
          <CartDesktopComponent
            cartProps={cartProps}
            homeProps={homeProps}
            storeProps={storeProps}
            windowProps={windowProps}
            homeLocalProps={homeLocalProps}
            salesChannelTabs={salesChannelTabs}
          />
        </ResponsiveDesktop>
        <ResponsiveMobile>
          <CartMobileComponent
            cartProps={cartProps}
            homeProps={homeProps}
            storeProps={storeProps}
            windowProps={windowProps}
            homeLocalProps={homeLocalProps}
            salesChannelTabs={salesChannelTabs}
          />
        </ResponsiveMobile>
      </React.Suspense>
    </>
  );
}
