import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Address } from '@medusajs/medusa';
import { lazy } from '@loadable/component';
import { AddressItemSuspenseDesktopComponent } from './desktop/suspense/address-item.suspense.desktop.component';
import React from 'react';

const AddressItemDesktopComponent = lazy(
  () => import('./desktop/address-item.desktop.component')
);
const AddressItemMobileComponent = lazy(
  () => import('./mobile/address-item.mobile.component')
);

export interface AddressItemProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressItemComponent(
  props: AddressItemProps
): JSX.Element {
  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <AddressItemSuspenseDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ResponsiveDesktop>
        <AddressItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AddressItemMobileComponent {...props} />
      </ResponsiveMobile>
    </React.Suspense>
  );
}
