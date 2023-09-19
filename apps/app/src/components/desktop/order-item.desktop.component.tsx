import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
} from '@medusajs/medusa';
import styles from '../order-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../route-paths';
import {
  OrderItemProps,
  OrderItemResponsiveProps,
} from '../order-item.component';

export function OrderItemDesktopComponent({
  order,
  fulfillmentStatus,
  getNumberOfItems,
  onClick,
}: OrderItemResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
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
            className={[styles['details'], styles['details-desktop']].join(' ')}
          >
            <div
              className={[
                styles['thumbnail'],
                styles['thumbnail-desktop'],
              ].join(' ')}
            >
              <img
                className={[
                  styles['thumbnail-image'],
                  styles['thumbnail-image-desktop'],
                ].join(' ')}
                src={
                  order.items?.[0]?.thumbnail || '../assets/svg/wine-bottle.svg'
                }
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
  );
}
