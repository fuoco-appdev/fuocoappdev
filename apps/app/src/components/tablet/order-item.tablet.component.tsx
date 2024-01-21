import styles from '../order-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { LineItem } from '@medusajs/medusa';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../route-paths';
import {
  OrderItemProps,
  OrderItemResponsiveProps,
} from '../order-item.component';
import { ResponsiveMobile, ResponsiveTablet } from '../responsive.component';

export default function OrderItemTabletComponent({
  order,
  fulfillmentStatus,
  getNumberOfItems,
  onClick,
}: OrderItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <Ripples
          color={'rgba(42, 42, 95, .35)'}
          className={[styles['ripples'], styles['ripples-tablet']].join(' ')}
          onClick={onClick}
        >
          <div
            key={order.id}
            className={[styles['container'], styles['container-tablet']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-tablet']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['thumbnail'],
                  styles['thumbnail-tablet'],
                ].join(' ')}
              >
                <img
                  className={[
                    styles['thumbnail-image'],
                    styles['thumbnail-image-tablet'],
                  ].join(' ')}
                  src={
                    order.items?.[0]?.thumbnail ||
                    '../assets/images/wine-bottle.png'
                  }
                />
              </div>
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-tablet']].join(
                    ' '
                  )}
                >{`${t('order')} #${order.display_id}`}</div>
                <div
                  className={[styles['status'], styles['status-tablet']].join(
                    ' '
                  )}
                >{`${t('status')}: ${fulfillmentStatus}`}</div>
                <div
                  className={[styles['status'], styles['status-tablet']].join(
                    ' '
                  )}
                >{`${t('items')}: ${getNumberOfItems(order.items)}`}</div>
              </div>
              <div
                className={[
                  styles['right-details-container'],
                  styles['right-details-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['pricing'],
                      styles['pricing-tablet'],
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
    </ResponsiveTablet>
  );
}
