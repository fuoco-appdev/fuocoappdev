import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DIContext } from './app.component';
import { StockLocationCartItemSuspenseDesktopComponent } from './desktop/suspense/stock-location-cart-item.suspense.desktop.component';
import { StockLocationCartItemSuspenseMobileComponent } from './mobile/suspense/stock-location-cart-item.suspense.mobile.component';

const StockLocationCartItemDesktopComponent = React.lazy(
  () => import('./desktop/stock-location-cart-item.desktop.component')
);
const StockLocationCartItemMobileComponent = React.lazy(
  () => import('./mobile/stock-location-cart-item.mobile.component')
);

export interface StockLocationCartItemProps {
  stockLocation: HttpTypes.AdminStockLocation;
  cart?: HttpTypes.StoreCart;
  selected?: boolean;
  onClick: () => void;
}

export interface StockLocationCartItemResponsiveProps
  extends StockLocationCartItemProps {
  avatar?: string;
  cartCount?: number;
}

function StockLocationCartItemComponent({
  stockLocation,
  cart,
  selected = false,
  onClick,
}: StockLocationCartItemProps): JSX.Element {
  const {
    ExploreController,
    WindowController,
    StoreController,
    ProductController,
    BucketService,
  } = React.useContext(DIContext);
  const [cartCount, setCartCount] = React.useState<number | undefined>(
    undefined
  );
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined);

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

  React.useEffect(() => {
    setCartCount(cart?.items?.length ?? 0);
  }, [cart]);

  const suspenceComponent = (
    <>
      <StockLocationCartItemSuspenseDesktopComponent />
      <StockLocationCartItemSuspenseMobileComponent />
    </>
  );

  if (import.meta.env['DEBUG_SUSPENSE'] === 'true') {
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

export default observer(StockLocationCartItemComponent);
