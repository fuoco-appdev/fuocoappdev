import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import { ProductOptions } from '../../models/product.model';
// @ts-ignore
import { lazy } from '@loadable/component';
import * as React from 'react';
import { StoreState } from '../../models/store.model';
import { MedusaProductTypeNames } from '../../types/medusa.type';
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
  productType: MedusaProductTypeNames | undefined;
  quantity: number;
  vintage: string;
  type: string;
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
  const [productType, setProductType] = React.useState<
    MedusaProductTypeNames | undefined
  >();
  const [vintage, setVintage] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(item.quantity);
  const [hasReducedPrice, setHasReducedPrice] = React.useState<boolean>(
    (item.discount_total ?? 0) > 0
  );
  const [deleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);
  const [discountPercentage, setDiscountPercentage] =
    React.useState<string>('');

  React.useEffect(() => {
    const vintageOption = item.variant.product.options?.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant.options?.find(
      (value: ProductOptionValue) => value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');

    const typeOption = item.variant.product.options?.find(
      (value) => value.title === ProductOptions.Type
    );
    const typeValue = item.variant.options?.find(
      (value: ProductOptionValue) => value.option_id === typeOption?.id
    );
    setType(typeValue?.value ?? '');

    const subtotal = item?.subtotal ?? 0;
    const difference = subtotal - (item?.discount_total ?? 0);
    const percentage = (difference / subtotal) * 100;
    setDiscountPercentage((100 - percentage).toFixed());

    setHasReducedPrice((item.discount_total ?? 0) > 0);
  }, [item]);

  React.useEffect(() => {
    const type = storeProps.productTypes.find(
      (value) => value.id === item.variant.product.type_id
    );
    setProductType(type?.value as MedusaProductTypeNames);
  }, [storeProps.productTypes, item]);

  const incrementItemQuantity = (value: number): void => {
    const count = quantity + value;
    if (
      !item.variant.allow_backorder &&
      quantity < item.variant.inventory_quantity
    ) {
      setQuantity(count);
      onQuantityChanged?.(count);
    } else {
      setQuantity(count);
      onQuantityChanged?.(count);
    }
  };

  const decrementItemQuantity = (value: number): void => {
    const count = quantity - value;
    if (quantity > 1) {
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
        productType={productType}
        quantity={quantity}
        onRemove={onRemove}
        vintage={vintage}
        type={type}
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
        productType={productType}
        quantity={quantity}
        onRemove={onRemove}
        vintage={vintage}
        type={type}
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
