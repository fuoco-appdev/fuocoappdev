import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DeepLTranslationsResponse } from '../../shared/protobuf/deepl_pb';
import { DIContext } from './app.component';
import { StockLocationItemSuspenseDesktopComponent } from './desktop/suspense/stock-location-item.suspense.desktop.component';
import { StockLocationItemSuspenseMobileComponent } from './mobile/suspense/stock-location-item.suspense.mobile.component';

const StockLocationItemDesktopComponent = React.lazy(
  () => import('./desktop/stock-location-item.desktop.component')
);
const StockLocationItemMobileComponent = React.lazy(
  () => import('./mobile/stock-location-item.mobile.component')
);

export interface StockLocationItemProps {
  stockLocation: HttpTypes.AdminStockLocation;
  selected?: boolean;
  hideDescription?: boolean;
  onClick: () => void;
}

export interface StockLocationItemResponsiveProps
  extends StockLocationItemProps {
  placeName: string;
  description: string;
  avatar?: string;
}

function StockLocationItemComponent({
  stockLocation,
  selected = false,
  hideDescription = false,
  onClick,
}: StockLocationItemProps): JSX.Element {
  const { i18n } = useTranslation();
  const { DeepLService, BucketService } = React.useContext(DIContext);
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined);
  const [placeName, setPlaceName] = React.useState<string>(stockLocation.name);
  const [description, setDescription] = React.useState<string>(
    stockLocation.address?.address_1 ?? ''
  );

  const updateTranslatedPlaceNameAsync = async (value: string) => {
    if (i18n.language !== 'en') {
      const response: DeepLTranslationsResponse =
        await DeepLService.translateAsync(value, i18n.language);
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
        await DeepLService.translateAsync(value, i18n.language);
      if (response.translations.length <= 0) {
        return;
      }

      const firstTranslation = response.translations[0];
      setDescription(firstTranslation.text);
    } else {
      setDescription(value);
    }
  };

  React.useEffect(() => {
    updateTranslatedPlaceNameAsync(stockLocation?.name);
    updateTranslatedDescriptionAsync(stockLocation.address?.address_1 ?? '');
  }, [stockLocation]);

  React.useEffect(() => {
    // if (!Object.keys(stockLocation?.metadata ?? {}).includes('avatar')) {
    //   return;
    // }
    // const avatar: string | undefined = stockLocation?.metadata?.['avatar'] as
    //   | string
    //   | undefined;
    // if (avatar) {
    //   BucketService.getPublicUrlAsync(StorageFolderType.Avatars, avatar).then(
    //     (value) => {
    //       setAvatar(value);
    //     }
    //   );
    // }
  }, [stockLocation]);

  const suspenceComponent = (
    <>
      <StockLocationItemSuspenseDesktopComponent />
      <StockLocationItemSuspenseMobileComponent />
    </>
  );

  if (import.meta.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <StockLocationItemDesktopComponent
        stockLocation={stockLocation}
        selected={selected}
        hideDescription={hideDescription}
        placeName={placeName}
        description={description}
        avatar={avatar}
        onClick={onClick}
      />
      <StockLocationItemMobileComponent
        stockLocation={stockLocation}
        selected={selected}
        hideDescription={hideDescription}
        placeName={placeName}
        description={description}
        avatar={avatar}
        onClick={onClick}
      />
    </React.Suspense>
  );
}

export default observer(StockLocationItemComponent);
