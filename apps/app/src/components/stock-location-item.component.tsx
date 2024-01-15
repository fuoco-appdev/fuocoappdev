import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Order, LineItem } from '@medusajs/medusa';
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
import { StorageFolderType } from '../protobuf/core_pb';
import { StockLocationItemSuspenseMobileComponent } from './mobile/suspense/stock-location-item.suspense.mobile.component';
import { StockLocationItemSuspenseTabletComponent } from './tablet/suspense/stock-location-item.suspense.tablet.component';

const StockLocationItemDesktopComponent = lazy(
  () => import('./desktop/stock-location-item.desktop.component')
);
const StockLocationItemTabletComponent = lazy(
  () => import('./tablet/stock-location-item.tablet.component')
);
const StockLocationItemMobileComponent = lazy(
  () => import('./mobile/stock-location-item.mobile.component')
);

export interface StockLocationItemProps {
  stockLocation: StockLocation;
  onClick: () => void;
}

export interface StockLocationItemResponsiveProps
  extends StockLocationItemProps {
  avatar?: string;
}

export default function StockLocationItemComponent({
  stockLocation,
  onClick,
}: StockLocationItemProps): JSX.Element {
  const { t, i18n } = useTranslation();
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

  const suspenceComponent = (
    <>
      <StockLocationItemSuspenseDesktopComponent />
      <StockLocationItemSuspenseTabletComponent />
      <StockLocationItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <StockLocationItemDesktopComponent
        stockLocation={stockLocation}
        avatar={avatar}
        onClick={onClick}
      />
      <StockLocationItemTabletComponent
        stockLocation={stockLocation}
        avatar={avatar}
        onClick={onClick}
      />
      <StockLocationItemMobileComponent
        stockLocation={stockLocation}
        avatar={avatar}
        onClick={onClick}
      />
    </React.Suspense>
  );
}
