import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { Address } from '@medusajs/medusa';
import { AddressItemDesktopComponent } from './desktop/address-item.desktop.component';
import { AddressItemMobileComponent } from './mobile/address-item.mobile.component';

export interface AddressItemProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AddressItemComponent(
  props: AddressItemProps
): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AddressItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AddressItemMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
