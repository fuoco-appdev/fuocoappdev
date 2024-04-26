import { lazy } from '@loadable/component';
import { Address } from '@medusajs/medusa';
import * as React from 'react';
import { AddressItemSuspenseDesktopComponent } from './desktop/suspense/address-item.suspense.desktop.component';
import { AddressItemSuspenseMobileComponent } from './mobile/suspense/address-item.suspense.mobile.component';
import { AddressItemSuspenseTabletComponent } from './tablet/suspense/address-item.suspense.tablet.component';

const AddressItemDesktopComponent = lazy(
  () => import('./desktop/address-item.desktop.component')
);
const AddressItemTabletComponent = lazy(
  () => import('./tablet/address-item.tablet.component')
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
      <AddressItemSuspenseDesktopComponent />
      <AddressItemSuspenseTabletComponent />
      <AddressItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AddressItemDesktopComponent {...props} />
      <AddressItemTabletComponent {...props} />
      <AddressItemMobileComponent {...props} />
    </React.Suspense>
  );
}
