import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useObservable } from '@ngneat/use-observable';
import StoreController from '../controllers/store.controller';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import React from 'react';

const ShippingItemDesktopComponent = lazy(
  () => import('./desktop/shipping-item.desktop.component')
);
const ShippingItemMobileComponent = lazy(
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
  const [vintage, setVintage] = useState<string>('');
  const [hasReducedPrice, setHasReducedPrice] = useState<boolean>(
    (item.discount_total ?? 0) > 0
  );
  const [discountPercentage, setDiscountPercentage] = useState<string>('');

  useEffect(() => {
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

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <div />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ResponsiveDesktop>
        <ShippingItemDesktopComponent
          storeProps={storeProps}
          item={item}
          vintage={vintage}
          hasReducedPrice={hasReducedPrice}
          discountPercentage={discountPercentage}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ShippingItemMobileComponent
          storeProps={storeProps}
          item={item}
          vintage={vintage}
          hasReducedPrice={hasReducedPrice}
          discountPercentage={discountPercentage}
        />
      </ResponsiveMobile>
    </React.Suspense>
  );
}
