import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import {
  LineItem,
  ProductOptionValue,
  Order,
  FulfillmentStatus,
} from '@medusajs/medusa';
import styles from './order-item.module.scss';
import { useEffect, useState } from 'react';
import { ProductOptions } from '../models/product.model';
import { useTranslation } from 'react-i18next';
import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import CartController from '../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';

export interface OrderItemProps {
  order: Order;
}

function OrderItemDesktopComponent({ order }: OrderItemProps): JSX.Element {
  return <></>;
}

function OrderItemMobileComponent({ order }: OrderItemProps): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const { t, i18n } = useTranslation();
  const [fulfillmentStatus, setFulfillmentStatus] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (order.fulfillment_status === 'canceled')
      setFulfillmentStatus(t('canceled') ?? '');
    else if (order.fulfillment_status === 'fulfilled')
      setFulfillmentStatus(t('fulfilled') ?? '');
    else if (order.fulfillment_status === 'not_fulfilled')
      setFulfillmentStatus(t('notFulfilled') ?? '');
    else if (order.fulfillment_status === 'partially_fulfilled')
      setFulfillmentStatus(t('partiallyFulfilled') ?? '');
    else if (order.fulfillment_status === 'partially_returned')
      setFulfillmentStatus(t('partiallyReturned') ?? '');
    else if (order.fulfillment_status === 'partially_shipped')
      setFulfillmentStatus(t('partiallyShipped') ?? '');
    else if (order.fulfillment_status === 'requires_action')
      setFulfillmentStatus(t('requiresAction') ?? '');
    else if (order.fulfillment_status === 'returned')
      setFulfillmentStatus(t('returned') ?? '');
    else if (order.fulfillment_status === 'shipped')
      setFulfillmentStatus(t('shipped') ?? '');
  }, [order, i18n.language]);

  const getNumberOfItems = (items: LineItem[]) => {
    return items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  return (
    <div className={styles['root']}>
      <Ripples
        color={'rgba(42, 42, 95, .35)'}
        className={styles['ripples']}
        onClick={() =>
          setTimeout(
            () => navigate(`${RoutePaths.OrderConfirmed}/${order.id}`),
            250
          )
        }
      >
        <div key={order.id} className={styles['container-mobile']}>
          <div className={styles['details-mobile']}>
            <div className={styles['thumbnail-mobile']}>
              <img
                className={styles['thumbnail-image-mobile']}
                src={
                  order.items?.[0]?.thumbnail || '../assets/svg/wine-bottle.svg'
                }
              />
            </div>
            <div className={styles['title-container-mobile']}>
              <div className={styles['title-mobile']}>{`${t('order')} #${
                order.display_id
              }`}</div>
              <div className={styles['status-mobile']}>{`${t(
                'status'
              )}: ${fulfillmentStatus}`}</div>
              <div className={styles['status-mobile']}>{`${t(
                'items'
              )}: ${getNumberOfItems(order.items)}`}</div>
            </div>
            <div className={styles['right-details-container']}>
              <div className={styles['right-details-content']}>
                <div className={[styles['pricing']].join(' ')}>
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

export default function OrderItemComponent(props: OrderItemProps): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <OrderItemDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <OrderItemMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
