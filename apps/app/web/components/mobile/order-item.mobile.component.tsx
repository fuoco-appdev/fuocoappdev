/* eslint-disable jsx-a11y/alt-text */
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Ripples from 'react-ripples';
import styles from '../../modules/order-item.module.scss';
import { DIContext } from '../app.component';
import { OrderItemResponsiveProps } from '../order-item.component';
import { ResponsiveMobile } from '../responsive.component';

function OrderItemMobileComponent({
  order,
  fulfillmentStatus,
  getNumberOfItems,
  onClick,
}: OrderItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const { MedusaService, StoreController } = React.useContext(DIContext);
  const { regions } = StoreController.model;

  const region = regions.find((value) => value.id === order.region_id);
  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <Ripples
          color={'rgba(42, 42, 95, .35)'}
          className={[styles['ripples'], styles['ripples-mobile']].join(' ')}
          onClick={onClick}
        >
          <div
            key={order.id}
            className={[styles['container'], styles['container-mobile']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-mobile']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['thumbnail'],
                  styles['thumbnail-mobile'],
                ].join(' ')}
              >
                {!order.items?.[0]?.thumbnail && (
                  <img
                    className={[
                      styles['no-thumbnail-image'],
                      styles['no-thumbnail-image-mobile'],
                    ].join(' ')}
                    src={'../assets/images/wine-bottle.png'}
                  />
                )}
                {order.items?.[0]?.thumbnail && (
                  <img
                    className={[
                      styles['thumbnail-image'],
                      styles['thumbnail-image-mobile'],
                    ].join(' ')}
                    src={order.items?.[0]?.thumbnail}
                  />
                )}
              </div>
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-mobile']].join(
                    ' '
                  )}
                >{`${t('order')} #${order.display_id}`}</div>
                <div
                  className={[styles['status'], styles['status-mobile']].join(
                    ' '
                  )}
                >{`${t('status')}: ${fulfillmentStatus}`}</div>
                <div
                  className={[styles['status'], styles['status-mobile']].join(
                    ' '
                  )}
                >{`${t('items')}: ${getNumberOfItems(order.items ?? [])}`}</div>
              </div>
              <div
                className={[
                  styles['right-details-container'],
                  styles['right-details-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['pricing'],
                      styles['pricing-mobile'],
                    ].join(' ')}
                  >
                    {order.region_id &&
                      MedusaService.formatAmount(
                        order.payment_collections?.[0].amount ?? 0,
                        region?.currency_code ?? '',
                        i18n.language
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Ripples>
      </div>
    </ResponsiveMobile>
  );
}

export default observer(OrderItemMobileComponent);
