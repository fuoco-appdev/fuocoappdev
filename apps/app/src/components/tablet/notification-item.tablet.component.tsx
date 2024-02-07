import styles from '../notification-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../../models/product.model';
import { LineItem, Order } from '@medusajs/medusa';
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
import { NotificationItemResponsiveProps } from '../notification-item.component';
import moment from 'moment';

export default function NotificationItemTabletComponent({
  notification,
}: NotificationItemResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  if (notification.resourceType === 'order') {
    const order = JSON.parse(notification.data) as Order | undefined;
    return (
      <ResponsiveTablet>
        <div className={[styles['root'], styles['root-tablet']].join(' ')}>
          <div
            className={[styles['details'], styles['details-tablet']].join(' ')}
          >
            <div
              className={[styles['thumbnail'], styles['thumbnail-tablet']].join(
                ' '
              )}
            >
              {!order?.items?.[0]?.thumbnail && (
                <img
                  className={[
                    styles['no-thumbnail-image'],
                    styles['no-thumbnail-image-tablet'],
                  ].join(' ')}
                  src={'../assets/images/wine-bottle.png'}
                />
              )}
              {order?.items?.[0]?.thumbnail && (
                <img
                  className={[
                    styles['thumbnail-image'],
                    styles['thumbnail-image-tablet'],
                  ].join(' ')}
                  src={order.items?.[0]?.thumbnail}
                />
              )}
            </div>
            <div
              className={[
                styles['message-container'],
                styles['message-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[styles['message'], styles['message-tablet']].join(
                  ' '
                )}
              >
                {notification.eventName === 'order.placed' && (
                  <div
                    className={[
                      styles['message-content'],
                      styles['message-content-tablet'],
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
                      styles['message-content-tablet'],
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
                      styles['message-content-tablet'],
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
                      styles['message-content-tablet'],
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
                  styles['message-date-tablet'],
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
              styles['right-content-tablet'],
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
      </ResponsiveTablet>
    );
  }

  return (
    <ResponsiveTablet>
      <div />
    </ResponsiveTablet>
  );
}
