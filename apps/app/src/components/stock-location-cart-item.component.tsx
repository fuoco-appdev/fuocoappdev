import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Order, LineItem, Cart } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { lazy } from '@loadable/component';
import { OrderItemSuspenseDesktopComponent } from './desktop/suspense/order-item.suspense.desktop.component';
import React from 'react';
import BucketService from '../services/bucket.service';
import { OrderItemSuspenseMobileComponent } from './mobile/suspense/order-item.suspense.mobile.component';
import { OrderItemSuspenseTabletComponent } from './tablet/suspense/order-item.suspense.tablet.component';
import { StockLocation } from '@medusajs/stock-location/dist/models';
import { StockLocationItemSuspenseDesktopComponent } from './desktop/suspense/stock-location-item.suspense.desktop.component';
import {
  DeepLTranslationsResponse,
  StorageFolderType,
} from '../protobuf/core_pb';
import { StockLocationItemSuspenseMobileComponent } from './mobile/suspense/stock-location-item.suspense.mobile.component';
import { StockLocationItemSuspenseTabletComponent } from './tablet/suspense/stock-location-item.suspense.tablet.component';
import DeeplService from '../services/deepl.service';
import { StockLocationCartItemSuspenseDesktopComponent } from './desktop/suspense/stock-location-cart-item.suspense.desktop.component';
import { StockLocationCartItemSuspenseTabletComponent } from './tablet/suspense/stock-location-cart-item.suspense.tablet.component';
import { StockLocationCartItemSuspenseMobileComponent } from './mobile/suspense/stock-location-cart-item.suspense.mobile.component';

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
  const { t, i18n } = useTranslation();
  const [cartCount, setCartCount] = useState<number | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
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

  useEffect(() => {
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
