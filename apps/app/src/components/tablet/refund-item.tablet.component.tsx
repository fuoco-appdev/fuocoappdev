import { LineItem, ProductOptionValue } from '@medusajs/medusa';
import styles from '../refund-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Input,
  Line,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import { RefundItemResponsiveProps } from '../refund-item.component';
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';

export default function RefundItemTabletComponent({
  item,
  refundItem,
  returnReasonOptions,
  vintage,
  incrementItemQuantity,
  decrementItemQuantity,
  onChanged,
}: RefundItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveTablet>
      <div
        key={item.variant_id}
        className={[styles['container'], styles['container-tablet']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-tablet']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-tablet']].join(
              ' '
            )}
          >
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-tablet'],
              ].join(' ')}
              src={item.thumbnail || '../assets/images/wine-bottle.png'}
            />
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-tablet']].join(' ')}
            >
              {item.title}
            </div>
            <div
              className={[styles['variant'], styles['variant-tablet']].join(
                ' '
              )}
            >{`${t('vintage')}: ${vintage}`}</div>
          </div>
          <div
            className={[
              styles['quantity-details-container'],
              styles['quantity-details-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-container'],
                styles['quantity-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['quantity-text'],
                  styles['quantity-text-tablet'],
                ].join(' ')}
              >
                {t('quantity')}
              </div>
              <div
                className={[
                  styles['quantity-buttons'],
                  styles['quantity-buttons-tablet'],
                ].join(' ')}
              >
                <Button
                  block={true}
                  classNames={{
                    button: styles['quantity-button'],
                  }}
                  floatingLabel={t('minus') ?? ''}
                  rippleProps={{
                    color: 'rgba(233, 33, 66, .35)',
                  }}
                  type={'text'}
                  rounded={true}
                  size={'tiny'}
                  icon={<Line.Remove size={18} />}
                  onClick={() => decrementItemQuantity()}
                />
                <div
                  className={[
                    styles['quantity'],
                    styles['quantity-tablet'],
                  ].join(' ')}
                >
                  {refundItem?.quantity}
                </div>
                <Button
                  block={true}
                  classNames={{
                    button: styles['quantity-button'],
                  }}
                  floatingLabel={t('add') ?? ''}
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
          <div
            className={[
              styles['input-container'],
              styles['input-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['reason-container'],
                styles['reason-container-tablet'],
              ].join(' ')}
            >
              <Listbox
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
                selectedId={refundItem.reason_id ?? ''}
                onChange={(index, id) =>
                  onChanged?.({
                    ...refundItem,
                    reason_id: id,
                  })
                }
              />
            </div>
            <div
              className={[
                styles['note-container'],
                styles['note-container-tablet'],
              ].join(' ')}
            >
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
    </ResponsiveTablet>
  );
}
