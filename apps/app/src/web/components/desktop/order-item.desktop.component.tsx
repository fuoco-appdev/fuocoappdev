import { useTranslation } from 'react-i18next';
import styles from '../order-item.module.scss';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import Ripples from 'react-ripples';
import { OrderItemResponsiveProps } from '../order-item.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function OrderItemDesktopComponent({
  order,
  fulfillmentStatus,
  getNumberOfItems,
  onClick,
}: OrderItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <Ripples
          color={'rgba(42, 42, 95, .35)'}
          className={[styles['ripples'], styles['ripples-desktop']].join(' ')}
          onClick={onClick}
        >
          <div
            key={order.id}
            className={[styles['container'], styles['container-desktop']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-desktop']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['thumbnail'],
                  styles['thumbnail-desktop'],
                ].join(' ')}
              >
                {!order.items?.[0]?.thumbnail && (
                  <img
                    className={[
                      styles['no-thumbnail-image'],
                      styles['no-thumbnail-image-desktop'],
                    ].join(' ')}
                    src={'../assets/images/wine-bottle.png'}
                  />
                )}
                {order.items?.[0]?.thumbnail && (
                  <img
                    className={[
                      styles['thumbnail-image'],
                      styles['thumbnail-image-desktop'],
                    ].join(' ')}
                    src={order.items?.[0]?.thumbnail}
                  />
                )}
              </div>
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-desktop']].join(
                    ' '
                  )}
                >{`${t('order')} #${order.display_id}`}</div>
                <div
                  className={[styles['status'], styles['status-desktop']].join(
                    ' '
                  )}
                >{`${t('status')}: ${fulfillmentStatus}`}</div>
                <div
                  className={[styles['status'], styles['status-desktop']].join(
                    ' '
                  )}
                >{`${t('items')}: ${getNumberOfItems(order.items)}`}</div>
              </div>
              <div
                className={[
                  styles['right-details-container'],
                  styles['right-details-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['pricing'],
                      styles['pricing-desktop'],
                    ].join(' ')}
                  >
                    {order.region &&
                      formatAmount({
                        amount: order.payments[0].amount ?? 0,
                        region: order.region,
                        includeTaxes: true,
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Ripples>
      </div>
    </ResponsiveDesktop>
  );
}
