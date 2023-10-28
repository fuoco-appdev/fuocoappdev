import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from './cart-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import React from 'react';
import { CartVariantItemSuspenseDesktopComponent } from './desktop/suspense/cart-variant-item.suspense.desktop.component';
import { CartVariantItemSuspenseMobileComponent } from './mobile/suspense/cart-variant-item.suspense.mobile.component';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { CartVariantItemSuspenseTabletComponent } from './tablet/suspense/cart-variant-item.suspense.tablet.component';
import { MedusaProductTypeNames } from 'src/types/medusa.type';

const CartVariantItemDesktopComponent = lazy(
  () => import('./desktop/cart-variant-item.desktop.component')
);
const CartVariantItemTabletComponent = lazy(
  () => import('./tablet/cart-variant-item.tablet.component')
);
const CartVariantItemMobileComponent = lazy(
  () => import('./mobile/cart-variant-item.mobile.component')
);

export interface CartVariantItemProps {
  productType: MedusaProductTypeNames;
  product: PricedProduct | undefined;
  variant: PricedVariant;
  storeProps: StoreState;
  variantQuantities: Record<string, number>;
  setVariantQuantities: (value: Record<string, number>) => void;
}

export interface CartVariantItemResponsiveProps extends CartVariantItemProps {
  onQuantitiesChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CartVariantItemComponent({
  productType,
  product,
  variant,
  storeProps,
  variantQuantities,
  setVariantQuantities,
}: CartVariantItemProps): JSX.Element {
  const onQuantitiesChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantities = { ...variantQuantities };
    if (variant?.id) {
      quantities[variant?.id] = Number(e.currentTarget.value);
    }
    setVariantQuantities(quantities);
  };

  const suspenceComponent = (
    <>
      <CartVariantItemSuspenseDesktopComponent />
      <CartVariantItemSuspenseTabletComponent />
      <CartVariantItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <CartVariantItemDesktopComponent
        productType={productType}
        product={product}
        variant={variant}
        storeProps={storeProps}
        variantQuantities={variantQuantities}
        setVariantQuantities={setVariantQuantities}
        onQuantitiesChanged={onQuantitiesChanged}
      />
      <CartVariantItemTabletComponent
        productType={productType}
        product={product}
        variant={variant}
        storeProps={storeProps}
        variantQuantities={variantQuantities}
        setVariantQuantities={setVariantQuantities}
        onQuantitiesChanged={onQuantitiesChanged}
      />
      <CartVariantItemMobileComponent
        productType={productType}
        product={product}
        variant={variant}
        storeProps={storeProps}
        variantQuantities={variantQuantities}
        setVariantQuantities={setVariantQuantities}
        onQuantitiesChanged={onQuantitiesChanged}
      />
    </React.Suspense>
  );
}
