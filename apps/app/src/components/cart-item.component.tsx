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
import { CartItemSuspenseDesktopComponent } from './desktop/suspense/cart-item.suspense.desktop.component';
import { CartItemSuspenseMobileComponent } from './mobile/suspense/cart-item.suspense.mobile.component';

const CartItemDesktopComponent = lazy(
  () => import('./desktop/cart-item.desktop.component')
);
const CartItemMobileComponent = lazy(
  () => import('./mobile/cart-item.mobile.component')
);

export interface CartItemProps {
  storeProps: StoreState;
  item: LineItem;
  onQuantityChanged?: (quantity: number) => void;
  onRemove?: () => void;
}

export interface CartItemResponsiveProps extends CartItemProps {
  quantity: number;
  vintage: string;
  hasReducedPrice: boolean;
  deleteModalVisible: boolean;
  discountPercentage: string;
  setDeleteModalVisible: (value: boolean) => void;
  incrementItemQuantity: (value: number) => void;
  decrementItemQuantity: (value: number) => void;
}

export default function CartItemComponent({
  storeProps,
  item,
  onQuantityChanged,
  onRemove,
}: CartItemProps): JSX.Element {
  const [vintage, setVintage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [hasReducedPrice, setHasReducedPrice] = useState<boolean>(
    (item.discount_total ?? 0) > 0
  );
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [discountPercentage, setDiscountPercentage] = useState<string>('');

  useEffect(() => {
    const vintageOption = item.variant.product.options.find(
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

  const incrementItemQuantity = (value: number): void => {
    if (quantity < item.variant.inventory_quantity) {
      const count = quantity + value;
      setQuantity(count);
      onQuantityChanged?.(count);
    }
  };

  const decrementItemQuantity = (value: number): void => {
    if (quantity > 1) {
      const count = quantity - value;
      setQuantity(count);
      onQuantityChanged?.(count);
    }
  };

  const suspenceComponent = (
    <>
      <CartItemSuspenseDesktopComponent />
      <CartItemSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <CartItemDesktopComponent
        storeProps={storeProps}
        item={item}
        quantity={quantity}
        onRemove={onRemove}
        vintage={vintage}
        hasReducedPrice={hasReducedPrice}
        setDeleteModalVisible={setDeleteModalVisible}
        deleteModalVisible={deleteModalVisible}
        discountPercentage={discountPercentage}
        incrementItemQuantity={incrementItemQuantity}
        decrementItemQuantity={decrementItemQuantity}
      />
      <CartItemMobileComponent
        storeProps={storeProps}
        item={item}
        quantity={quantity}
        onRemove={onRemove}
        vintage={vintage}
        hasReducedPrice={hasReducedPrice}
        setDeleteModalVisible={setDeleteModalVisible}
        deleteModalVisible={deleteModalVisible}
        discountPercentage={discountPercentage}
        incrementItemQuantity={incrementItemQuantity}
        decrementItemQuantity={decrementItemQuantity}
      />
    </React.Suspense>
  );
}
