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
import { useObservable } from '@ngneat/use-observable';

export interface RefundItemProps {
  item: LineItem;
  refundItem?: {
    item_id: string;
    quantity: number;
    reason_id?: string;
    note?: string;
  };
  returnReasonOptions?: OptionProps[];
  onChanged?: (item: {
    item_id: string;
    quantity: number;
    reason_id?: string;
    note?: string;
  }) => void;
}

function RefundItemDesktopComponent({ item }: RefundItemProps): JSX.Element {
  return <></>;
}

function RefundItemMobileComponent({
  item,
  refundItem,
  returnReasonOptions = [],
  onChanged,
}: RefundItemProps): JSX.Element {
  const [vintage, setVintage] = useState<string>('');
  const [openReturnReasons, setOpenReturnReasons] = useState<boolean>(false);
  const { t } = useTranslation();

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
    <div key={item.variant_id} className={styles['container-mobile']}>
      <div className={styles['details-mobile']}>
        <div className={styles['thumbnail-mobile']}>
          <img
            className={styles['thumbnail-image-mobile']}
            src={item.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
        </div>
        <div className={styles['title-container-mobile']}>
          <div className={styles['title-mobile']}>{item.title}</div>
          <div className={styles['variant-mobile']}>{`${t(
            'vintage'
          )}: ${vintage}`}</div>
        </div>
        <div className={styles['quantity-details-container-mobile']}>
          <div className={styles['quantity-container-mobile']}>
            <div className={styles['quantity-text-mobile']}>
              {t('quantity')}
            </div>
            <div className={styles['quantity-buttons-mobile']}>
              <Button
                block={true}
                classNames={{
                  button: styles['quantity-button'],
                }}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                type={'text'}
                rounded={true}
                size={'tiny'}
                icon={<Line.Remove size={18} />}
                onClick={() => decrementItemQuantity()}
              />
              <div className={styles['quantity']}>{refundItem?.quantity}</div>
              <Button
                block={true}
                classNames={{
                  button: styles['quantity-button'],
                }}
                rippleProps={{
                  color: 'rgba(233, 33, 66, .35)',
                }}
                type={'text'}
                rounded={true}
                size={'tiny'}
                icon={<Line.Add size={18} />}
                onClick={() => incrementItemQuantity()}
              />
            </div>
          </div>
        </div>
      </div>
      {refundItem && refundItem.quantity > 0 && (
        <div className={styles['input-container']}>
          <div className={styles['reason-container']}>
            <Listbox
              touchScreen={true}
              classNames={{
                formLayout: {
                  label: styles['listbox-form-layout-label'],
                },
                listbox: styles['listbox'],
                chevron: styles['listbox-chevron'],
                label: styles['listbox-label'],
              }}
              label={t('reason') ?? ''}
              options={returnReasonOptions}
              onChange={(index, id) =>
                onChanged?.({
                  ...refundItem,
                  reason_id: id,
                })
              }
            />
          </div>
          <div className={styles['note-container']}>
            <Input.TextArea
              classNames={{
                formLayout: { label: styles['input-form-layout-label'] },
                input: styles['input'],
                inputContainer: styles['input-container'],
              }}
              label={t('note') ?? ''}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function RefundItemComponent(
  props: RefundItemProps
): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <RefundItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <RefundItemMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
