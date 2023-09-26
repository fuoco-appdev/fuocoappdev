import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { CartDesktopComponent } from './desktop/cart.desktop.component';
import { CartMobileComponent } from './mobile/cart.mobile.component';
import { useEffect, useState } from 'react';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import { useObservable } from '@ngneat/use-observable';
import CartController from '../controllers/cart.controller';
import HomeController from '../controllers/home.controller';
import { Store } from '@ngneat/elf';
import { InventoryLocation } from '../models/home.model';
import { Helmet } from 'react-helmet';

export interface CartResponsiveProps {
  salesChannelTabs: TabProps[];
}

export default function CartComponent(): JSX.Element {
  const [homeProps] = useObservable(HomeController.model.store);
  const [localProps] = useObservable(
    CartController.model.localStore ?? Store.prototype
  );
  const [salesChannelTabs, setSalesChannelTabs] = useState<TabProps[]>([]);

  useEffect(() => {
    const tabProps: TabProps[] = [];
    const locations = homeProps.inventoryLocations as InventoryLocation[];
    for (const key in localProps.cartIds) {
      if (!key.startsWith('sloc_')) {
        continue;
      }

      const location = locations.find((value) => value.id === key);
      const salesChannel = location?.salesChannels[0];
      tabProps.push({ id: key, label: salesChannel?.name });
    }

    setSalesChannelTabs(tabProps);
  }, [localProps.cartIds, homeProps.inventoryLocations]);

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
      <ResponsiveDesktop>
        <CartDesktopComponent salesChannelTabs={salesChannelTabs} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CartMobileComponent salesChannelTabs={salesChannelTabs} />
      </ResponsiveMobile>
    </>
  );
}
