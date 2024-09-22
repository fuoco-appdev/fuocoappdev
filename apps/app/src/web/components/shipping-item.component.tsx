import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import StoreController from '../../controllers/store.controller';
import { ProductOptions } from '../../models/product.model';
import { StoreState } from '../../models/store.model';
import { ShippingItemSuspenseDesktopComponent } from './desktop/suspense/shipping-item.suspense.desktop.component';
import { ShippingItemSuspenseMobileComponent } from './mobile/suspense/shipping-item.suspense.mobile.component';

const ShippingItemDesktopComponent = React.lazy(
  () => import('./desktop/shipping-item.desktop.component')
);
const ShippingItemMobileComponent = React.lazy(
  () => import('./mobile/shipping-item.mobile.component')
);

export interface ShippingItemProps {
  storeProps: StoreState;
  item: LineItem;
}

export interface ShippingItemResponsiveProps extends ShippingItemProps {
  vintage: string;
  hasReducedPrice: boolean;
  discountPercentage: string;
}

export default function ShippingItemComponent({
  storeProps,
  item,
}: ShippingItemProps): JSX.Element {
  const [storeDebugProps] = useObservable(StoreController.model.debugStore);
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

  if (storeDebugProps.suspense) {
    return suspenceComponent;
  }

  React.useEffect(() => {
    const vintageOption = item.variant.product.options?.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant.options?.find(
      (value: ProductOptionValue) => value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');

    const subtotal = item?.subtotal ?? 0;
    const difference = subtotal - (item?.discount_total ?? 0);
    const percentage = (difference / subtotal) * 100;
    setDiscountPercentage((100 - percentage).toFixed());

    setHasReducedPrice((item.discount_total ?? 0) > 0);
  }, [item]);

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ShippingItemDesktopComponent
        storeProps={storeProps}
        item={item}
        vintage={vintage}
        hasReducedPrice={hasReducedPrice}
        discountPercentage={discountPercentage}
      />
      <ShippingItemMobileComponent
        storeProps={storeProps}
        item={item}
        vintage={vintage}
        hasReducedPrice={hasReducedPrice}
        discountPercentage={discountPercentage}
      />
    </React.Suspense>
  );
}
