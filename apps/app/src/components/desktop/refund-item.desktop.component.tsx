import { Button, Input, Line, Listbox } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { RefundItemResponsiveProps } from '../refund-item.component';
import styles from '../refund-item.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function RefundItemDesktopComponent({
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
    <ResponsiveDesktop>
      <div
        key={item.variant_id}
        className={[styles['container'], styles['container-desktop']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-desktop']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-desktop']].join(
              ' '
            )}
          >
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              src={item.thumbnail || '../assets/images/wine-bottle.png'}
            />
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-desktop']].join(' ')}
            >
              {item.title}
            </div>
            <div
              className={[styles['variant'], styles['variant-desktop']].join(
                ' '
              )}
            >{`${t('vintage')}: ${vintage}`}</div>
          </div>
          <div
            className={[
              styles['quantity-details-container'],
              styles['quantity-details-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['quantity-container'],
                styles['quantity-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['quantity-text'],
                  styles['quantity-text-desktop'],
                ].join(' ')}
              >
                {t('quantity')}
              </div>
              <div
                className={[
                  styles['quantity-buttons'],
                  styles['quantity-buttons-desktop'],
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
                    styles['quantity-desktop'],
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
              styles['input-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['reason-container'],
                styles['reason-container-desktop'],
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
                styles['note-container-desktop'],
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
    </ResponsiveDesktop>
  );
}
