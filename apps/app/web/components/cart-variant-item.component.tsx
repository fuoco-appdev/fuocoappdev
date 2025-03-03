import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { MedusaProductTypeNames } from '../../shared/types/medusa.type';
import { DIContext } from './app.component';
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
  product: HttpTypes.StoreProduct | undefined;
  variant: HttpTypes.StoreProductVariant;
  variantQuantities: Record<string, number>;
  setVariantQuantities: (value: Record<string, number>) => void;
}

export interface CartVariantItemResponsiveProps extends CartVariantItemProps {
  onQuantitiesChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CartVariantItemComponent({
  productType,
  product,
  variant,
  variantQuantities,
  setVariantQuantities,
}: CartVariantItemProps): JSX.Element {
  const { CartController } = React.useContext(DIContext);
  const { suspense } = CartController.model;
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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <CartVariantItemDesktopComponent
        productType={productType}
        product={product}
        variant={variant}
        variantQuantities={variantQuantities}
        setVariantQuantities={setVariantQuantities}
        onQuantitiesChanged={onQuantitiesChanged}
      />
      <CartVariantItemMobileComponent
        productType={productType}
        product={product}
        variant={variant}
        variantQuantities={variantQuantities}
        setVariantQuantities={setVariantQuantities}
        onQuantitiesChanged={onQuantitiesChanged}
      />
    </React.Suspense>
  );
}

export default observer(CartVariantItemComponent);
