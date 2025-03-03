import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ProductOptions } from '../../shared/models/product.model';
import { MedusaProductTypeNames } from '../../shared/types/medusa.type';
import { DIContext } from './app.component';
import { CartItemSuspenseDesktopComponent } from './desktop/suspense/cart-item.suspense.desktop.component';
import { CartItemSuspenseMobileComponent } from './mobile/suspense/cart-item.suspense.mobile.component';

const CartItemDesktopComponent = React.lazy(
  () => import('./desktop/cart-item.desktop.component')
);
const CartItemMobileComponent = React.lazy(
  () => import('./mobile/cart-item.mobile.component')
);

export interface CartItemProps {
  item: HttpTypes.StoreCartLineItem;
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

function CartItemComponent({
  item,
  onQuantityChanged,
  onRemove,
}: CartItemProps): JSX.Element {
  const { StoreController } = React.useContext(DIContext);
  const { suspense, productTypes } = StoreController.model;
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
    const vintageOption = item.variant?.product?.options?.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant?.options?.find(
      (value: HttpTypes.StoreProductOptionValue) =>
        value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');

    const typeOption = item.variant?.product?.options?.find(
      (value) => value.title === ProductOptions.Type
    );
    const typeValue = item.variant?.options?.find(
      (value: HttpTypes.StoreProductOptionValue) =>
        value.option_id === typeOption?.id
    );
    setType(typeValue?.value ?? '');

    const subtotal = item?.subtotal ?? 0;
    const difference = subtotal - (item?.discount_total ?? 0);
    const percentage = (difference / subtotal) * 100;
    setDiscountPercentage((100 - percentage).toFixed());

    setHasReducedPrice((item.discount_total ?? 0) > 0);
  }, [item]);

  React.useEffect(() => {
    const type = productTypes.find(
      (value) => value.id === item.variant?.product?.type_id
    );
    setProductType(type?.value as MedusaProductTypeNames);
  }, [productTypes, item]);

  const incrementItemQuantity = (value: number): void => {
    const count = quantity + value;
    if (
      !item.variant?.allow_backorder &&
      quantity < (item.variant?.inventory_quantity ?? 0)
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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <CartItemDesktopComponent
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

export default observer(CartItemComponent);
