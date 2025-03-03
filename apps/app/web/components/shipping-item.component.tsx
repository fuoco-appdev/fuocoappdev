import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ProductOptions } from '../../shared/models/product.model';
import { DIContext } from './app.component';
import { ShippingItemSuspenseDesktopComponent } from './desktop/suspense/shipping-item.suspense.desktop.component';
import { ShippingItemSuspenseMobileComponent } from './mobile/suspense/shipping-item.suspense.mobile.component';

const ShippingItemDesktopComponent = React.lazy(
  () => import('./desktop/shipping-item.desktop.component')
);
const ShippingItemMobileComponent = React.lazy(
  () => import('./mobile/shipping-item.mobile.component')
);

export interface ShippingItemProps {
  item: HttpTypes.StoreOrderLineItem;
}

export interface ShippingItemResponsiveProps extends ShippingItemProps {
  vintage: string;
  hasReducedPrice: boolean;
  discountPercentage: string;
}

function ShippingItemComponent({ item }: ShippingItemProps): JSX.Element {
  const { StoreController } = React.useContext(DIContext);
  const { suspense } = StoreController.model;
  const [vintage, setVintage] = React.useState<string>('');
  const [hasReducedPrice, setHasReducedPrice] = React.useState<boolean>(
    (item.discount_total ?? 0) > 0
  );
  const [discountPercentage, setDiscountPercentage] =
    React.useState<string>('');

  const suspenceComponent = (
    <>
      <ShippingItemSuspenseDesktopComponent />
      <ShippingItemSuspenseMobileComponent />
    </>
  );

  React.useEffect(() => {
    const vintageOption = item.variant?.product?.options?.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant?.options?.find(
      (value: HttpTypes.StoreProductOptionValue) =>
        value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');

    const subtotal = item?.subtotal ?? 0;
    const difference = subtotal - (item?.discount_total ?? 0);
    const percentage = (difference / subtotal) * 100;
    setDiscountPercentage((100 - percentage).toFixed());

    setHasReducedPrice((item.discount_total ?? 0) > 0);
  }, [item]);

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ShippingItemDesktopComponent
        item={item}
        vintage={vintage}
        hasReducedPrice={hasReducedPrice}
        discountPercentage={discountPercentage}
      />
      <ShippingItemMobileComponent
        item={item}
        vintage={vintage}
        hasReducedPrice={hasReducedPrice}
        discountPercentage={discountPercentage}
      />
    </React.Suspense>
  );
}

export default observer(ShippingItemComponent);
