import { LineItem, Order, ProductOptionValue } from '@medusajs/medusa';
import styles from '../notification-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import { CartItemResponsiveProps } from '../cart-item.component';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useNavigate } from 'react-router-dom';
import { ResponsiveMobile } from '../responsive.component';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { NotificationItemResponsiveProps } from '../notification-item.component';
import moment from 'moment';

export default function NotificationItemMobileComponent({
  notification,
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (notification.resourceType === 'order') {
    const order = JSON.parse(notification.data) as Order | undefined;
    return (
      <ResponsiveMobile>
        <div className={[styles['root'], styles['root-mobile']].join(' ')}>
          <div
            className={[styles['details'], styles['details-mobile']].join(' ')}
          >
            <div
              className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
                ' '
              )}
            >
              {!order?.items?.[0]?.thumbnail && (
                <img
                  className={[
                    styles['no-thumbnail-image'],
                    styles['no-thumbnail-image-mobile'],
                  ].join(' ')}
                  src={'../assets/images/wine-bottle.png'}
                />
              )}
              {order?.items?.[0]?.thumbnail && (
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
                styles['message-container'],
                styles['message-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['message'], styles['message-mobile']].join(
                  ' '
                )}
              >
                {notification.eventName === 'order.placed' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-mobile'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderPlacedName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderPlacedDescription')}
                  </div>
                )}
                {notification.eventName === 'order.shipped' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-mobile'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderShippedName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderShippedDescription')}
                  </div>
                )}
                {notification.eventName === 'order.returned' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-mobile'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderReturnedName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderReturnedDescription')}
                  </div>
                )}
                {notification.eventName === 'order.canceled' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-mobile'],
                    ].join(' ')}
                  >
                    <div className={[styles['message-bold']].join(' ')}>
                      {t('orderCanceledName', {
                        displayId: order?.display_id ?? 0,
                      })}
                    </div>
                    &nbsp;
                    {t('orderCanceledDescription')}
                  </div>
                )}
              </div>
              <div
                className={[
                  styles['message-date'],
                  styles['message-date-mobile'],
                ].join(' ')}
              >
                {moment(notification.createdAt)
                  .locale(i18n.language)
                  .calendar()}
              </div>
            </div>
          </div>
          <div
            className={[
              styles['right-content'],
              styles['right-content-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: [styles['secondary-button']].join(' '),
              }}
              size={'tiny'}
              touchScreen={true}
              rippleProps={{
                color: 'rgba(42, 42, 95, .35)',
              }}
              onClick={() =>
                setTimeout(
                  () =>
                    navigate(`${RoutePathsType.OrderConfirmed}/${order?.id}`),
                  150
                )
              }
            >
              {t('view')}
            </Button>
          </div>
        </div>
      </ResponsiveMobile>
    );
  }

  return (
    <ResponsiveMobile>
      <div />
    </ResponsiveMobile>
  );
}
