/* eslint-disable jsx-a11y/alt-text */
import { Button, Input, Line, Listbox } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/refund-item.module.scss';
import { RefundItemResponsiveProps } from '../refund-item.component';
import { ResponsiveMobile } from '../responsive.component';

function RefundItemMobileComponent({
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
    <ResponsiveMobile>
      <div
        key={item.variant_id}
        className={[styles['container'], styles['container-mobile']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-mobile']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
              ' '
            )}
          >
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-mobile'],
              ].join(' ')}
              src={item.thumbnail || '../assets/images/wine-bottle.png'}
            />
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-mobile']].join(' ')}
            >
              {item.title}
            </div>
            <div
              className={[styles['variant'], styles['variant-mobile']].join(
                ' '
              )}
            >{`${t('vintage')}: ${vintage}`}</div>
          </div>
          <div
            className={[
              styles['quantity-details-container'],
              styles['quantity-details-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-container'],
                styles['quantity-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['quantity-text'],
                  styles['quantity-text-mobile'],
                ].join(' ')}
              >
                {t('quantity')}
              </div>
              <div
                className={[
                  styles['quantity-buttons'],
                  styles['quantity-buttons-mobile'],
                ].join(' ')}
              >
                <Button
                  block={true}
                  touchScreen={true}
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
                <div
                  className={[
                    styles['quantity'],
                    styles['quantity-mobile'],
                  ].join(' ')}
                >
                  {refundItem?.quantity}
                </div>
                <Button
                  block={true}
                  touchScreen={true}
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
          <div
            className={[
              styles['input-container'],
              styles['input-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['reason-container'],
                styles['reason-container-mobile'],
              ].join(' ')}
            >
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
                selectedId={refundItem.reason_id ?? ''}
                onChange={(_index, id) =>
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
                styles['note-container-mobile'],
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
    </ResponsiveMobile>
  );
}

export default observer(RefundItemMobileComponent);
