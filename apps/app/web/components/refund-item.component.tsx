import { OptionProps } from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ProductOptions } from '../../shared/models/product.model';
import { DIContext } from './app.component';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';

const RefundItemDesktopComponent = React.lazy(
  () => import('./desktop/refund-item.desktop.component')
);
const RefundItemMobileComponent = React.lazy(
  () => import('./mobile/refund-item.mobile.component')
);

export interface RefundItemProps {
  item: HttpTypes.StoreOrderLineItem;
  refundItem: {
    item_id: string;
    quantity: number;
    reason_id?: string;
    note?: string;
  };
  returnReasonOptions: OptionProps[];
  onChanged: (item: {
    item_id: string;
    quantity: number;
    reason_id?: string;
    note?: string;
  }) => void;
}

export interface RefundItemResponsiveProps extends RefundItemProps {
  vintage: string;
  incrementItemQuantity: () => void;
  decrementItemQuantity: () => void;
}

function RefundItemComponent({
  item,
  refundItem,
  returnReasonOptions,
  onChanged,
}: RefundItemProps): JSX.Element {
  const { WindowController } = React.useContext(DIContext);
  const { suspense } = WindowController.model;
  const [vintage, setVintage] = React.useState<string>('');

  React.useEffect(() => {
    const vintageOption = item.variant?.product?.options?.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant?.options?.find(
      (value: HttpTypes.StoreProductOptionValue) =>
        value.option_id === vintageOption?.id
    );
    setVintage(vintageValue?.value ?? '');
  }, [item]);

  const incrementItemQuantity = (): void => {
    if (!refundItem) {
      return;
    }

    if (item?.quantity && refundItem?.quantity < item.quantity) {
      onChanged?.({
        ...refundItem,
        quantity: refundItem.quantity + 1,
      });
    }
  };

  const decrementItemQuantity = (): void => {
    if (!refundItem) {
      return;
    }

    if (refundItem.quantity > 0) {
      onChanged?.({
        ...refundItem,
        quantity: refundItem.quantity - 1,
      });
    }
  };

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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <RefundItemDesktopComponent
        item={item}
        refundItem={refundItem}
        returnReasonOptions={returnReasonOptions}
        vintage={vintage}
        incrementItemQuantity={incrementItemQuantity}
        decrementItemQuantity={decrementItemQuantity}
        onChanged={onChanged}
      />
      <RefundItemMobileComponent
        item={item}
        refundItem={refundItem}
        returnReasonOptions={returnReasonOptions}
        vintage={vintage}
        incrementItemQuantity={incrementItemQuantity}
        decrementItemQuantity={decrementItemQuantity}
        onChanged={onChanged}
      />
    </React.Suspense>
  );
}

export default observer(RefundItemComponent);
