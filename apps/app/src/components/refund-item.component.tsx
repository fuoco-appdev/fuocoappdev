import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from './refund-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Input,
  Line,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { RefundItemDesktopComponent } from './desktop/refund-item.desktop.component';
import { RefundItemMobileComponent } from './mobile/refund-item.mobile.component';

export interface RefundItemProps {
  item: LineItem;
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

export default function RefundItemComponent({
  item,
  refundItem,
  returnReasonOptions,
  onChanged,
}: RefundItemProps): JSX.Element {
  const [vintage, setVintage] = useState<string>('');

  useEffect(() => {
    const vintageOption = item.variant.product.options.find(
      (value) => value.title === ProductOptions.Vintage
    );
    const vintageValue = item.variant.options?.find(
      (value: ProductOptionValue) => value.option_id === vintageOption?.id
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

  return (
    <>
      <ResponsiveDesktop>
        <RefundItemDesktopComponent
          item={item}
          refundItem={refundItem}
          returnReasonOptions={returnReasonOptions}
          vintage={vintage}
          incrementItemQuantity={incrementItemQuantity}
          decrementItemQuantity={decrementItemQuantity}
          onChanged={onChanged}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <RefundItemMobileComponent
          item={item}
          refundItem={refundItem}
          returnReasonOptions={returnReasonOptions}
          vintage={vintage}
          incrementItemQuantity={incrementItemQuantity}
          decrementItemQuantity={decrementItemQuantity}
          onChanged={onChanged}
        />
      </ResponsiveMobile>
    </>
  );
}