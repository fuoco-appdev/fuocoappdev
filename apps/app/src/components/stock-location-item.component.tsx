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
import {
  DeepLTranslationsResponse,
  StorageFolderType,
} from '../protobuf/core_pb';
import { StockLocationItemSuspenseMobileComponent } from './mobile/suspense/stock-location-item.suspense.mobile.component';
import { StockLocationItemSuspenseTabletComponent } from './tablet/suspense/stock-location-item.suspense.tablet.component';
import DeeplService from '../services/deepl.service';

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
  placeName: string;
  description: string;
  avatar?: string;
}

export default function StockLocationItemComponent({
  stockLocation,
  onClick,
}: StockLocationItemProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [placeName, setPlaceName] = useState<string>(
    stockLocation?.metadata?.['place_name'] as string
  );
  const [description, setDescription] = useState<string>(
    stockLocation?.metadata?.['description'] as string
  );

  const updateTranslatedPlaceNameAsync = async (value: string) => {
    if (i18n.language !== 'en') {
      const response: DeepLTranslationsResponse =
        await DeeplService.translateAsync(value, i18n.language);
      if (response.translations.length <= 0) {
        return;
      }

      const firstTranslation = response.translations[0];
      setPlaceName(firstTranslation.text);
    } else {
      setPlaceName(value);
    }
  };

  const updateTranslatedDescriptionAsync = async (value: string) => {
    if (i18n.language !== 'en') {
      const response: DeepLTranslationsResponse =
        await DeeplService.translateAsync(value, i18n.language);
      if (response.translations.length <= 0) {
        return;
      }

      const firstTranslation = response.translations[0];
      setDescription(firstTranslation.text);
    } else {
      setDescription(value);
    }
  };

  useEffect(() => {
    updateTranslatedPlaceNameAsync(
      stockLocation?.metadata?.['place_name'] as string
    );
    updateTranslatedDescriptionAsync(
      stockLocation?.metadata?.['description'] as string
    );
  }, [stockLocation?.metadata]);

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
        placeName={placeName}
        description={description}
        avatar={avatar}
        onClick={onClick}
      />
      <StockLocationItemTabletComponent
        stockLocation={stockLocation}
        placeName={placeName}
        description={description}
        avatar={avatar}
        onClick={onClick}
      />
      <StockLocationItemMobileComponent
        stockLocation={stockLocation}
        placeName={placeName}
        description={description}
        avatar={avatar}
        onClick={onClick}
      />
    </React.Suspense>
  );
}
