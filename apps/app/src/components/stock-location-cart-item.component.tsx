import { lazy } from '@loadable/component';
import { Cart } from '@medusajs/medusa';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import React from 'react';
import { StorageFolderType } from '../protobuf/common_pb';
import BucketService from '../services/bucket.service';
import { StockLocationCartItemSuspenseDesktopComponent } from './desktop/suspense/stock-location-cart-item.suspense.desktop.component';
import { StockLocationCartItemSuspenseMobileComponent } from './mobile/suspense/stock-location-cart-item.suspense.mobile.component';
import { StockLocationCartItemSuspenseTabletComponent } from './tablet/suspense/stock-location-cart-item.suspense.tablet.component';

const StockLocationCartItemDesktopComponent = lazy(
  () => import('./desktop/stock-location-cart-item.desktop.component')
);
const StockLocationCartItemTabletComponent = lazy(
  () => import('./tablet/stock-location-cart-item.tablet.component')
);
const StockLocationCartItemMobileComponent = lazy(
  () => import('./mobile/stock-location-cart-item.mobile.component')
);

export interface StockLocationCartItemProps {
  stockLocation: StockLocation;
  cart?: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
  selected?: boolean;
  onClick: () => void;
}

export interface StockLocationCartItemResponsiveProps
  extends StockLocationCartItemProps {
  avatar?: string;
  cartCount?: number;
}

export default function StockLocationCartItemComponent({
  stockLocation,
  cart,
  selected = false,
  onClick,
}: StockLocationCartItemProps): JSX.Element {
  const [cartCount, setCartCount] = React.useState<number | undefined>(
    undefined
  );
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (!Object.keys(stockLocation?.metadata ?? {}).includes('avatar')) {
      return;
    }

    const avatar: string | undefined = stockLocation?.metadata?.['avatar'] as
      | string
      | undefined;
    if (avatar) {
      BucketService.getPublicUrlAsync(StorageFolderType.Avatars, avatar).then(
        (value) => {
          setAvatar(value);
        }
      );
    }
  }, [stockLocation]);

  React.useEffect(() => {
    setCartCount(cart?.items.length);
  }, [cart]);

  const suspenceComponent = (
    <>
      <StockLocationCartItemSuspenseDesktopComponent />
      <StockLocationCartItemSuspenseTabletComponent />
      <StockLocationCartItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <StockLocationCartItemDesktopComponent
        stockLocation={stockLocation}
        cart={cart}
        selected={selected}
        avatar={avatar}
        cartCount={cartCount}
        onClick={onClick}
      />
      <StockLocationCartItemTabletComponent
        stockLocation={stockLocation}
        cart={cart}
        selected={selected}
        avatar={avatar}
        cartCount={cartCount}
        onClick={onClick}
      />
      <StockLocationCartItemMobileComponent
        stockLocation={stockLocation}
        cart={cart}
        selected={selected}
        avatar={avatar}
        cartCount={cartCount}
        onClick={onClick}
      />
    </React.Suspense>
  );
}
