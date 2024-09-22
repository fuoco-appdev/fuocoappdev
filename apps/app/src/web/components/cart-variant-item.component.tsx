// @ts-ignore
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import CartController from '../../controllers/cart.controller';
import { StoreState } from '../../models/store.model';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { CartVariantItemSuspenseDesktopComponent } from './desktop/suspense/cart-variant-item.suspense.desktop.component';
import { CartVariantItemSuspenseMobileComponent } from './mobile/suspense/cart-variant-item.suspense.mobile.component';

const CartVariantItemDesktopComponent = React.lazy(
  () => import('./desktop/cart-variant-item.desktop.component')
);
const CartVariantItemMobileComponent = React.lazy(
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
  const [cartDebugProps] = useObservable(CartController.model.debugStore);
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
      <CartVariantItemSuspenseMobileComponent />
    </>
  );

  if (cartDebugProps.suspense) {
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
