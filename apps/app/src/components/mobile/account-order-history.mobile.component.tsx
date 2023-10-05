import { createRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-order-history.module.scss';
import { Button } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { Order } from '@medusajs/medusa';
import OrderItemComponent from '../order-item.component';
import { AccountOrderHistoryResponsiveProps } from '../account-order-history.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountOrderHistoryMobileComponent({
  accountProps,
  onOrdersScroll,
  onOrdersLoad,
}: AccountOrderHistoryResponsiveProps): JSX.Element {
  const ordersContainerRef = createRef<HTMLDivElement>();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const orders = accountProps.orders as Order[];
  return (
    <ResponsiveMobile>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-mobile']].join(' ')}
      >
        <div
          ref={ordersContainerRef}
          onScroll={onOrdersScroll}
          onLoad={onOrdersLoad}
          className={[styles['scroll'], styles['scroll-mobile']].join(' ')}
        >
          <div
            className={[
              styles['order-history-text'],
              styles['order-history-text-mobile'],
            ].join(' ')}
          >
            {t('orderHistory')}
          </div>
          {orders.length > 0 &&
            orders
              .sort((current: Order, next: Order) => {
                return (
                  new Date(next.created_at).valueOf() -
                  new Date(current.created_at).valueOf()
                );
              })
              .map((order: Order) => (
                <OrderItemComponent
                  key={order.id}
                  order={order}
                  onClick={() => {
                    AccountController.updateOrdersScrollPosition(
                      ordersContainerRef.current?.scrollTop
                    );
                    setTimeout(
                      () =>
                        navigate(
                          `${RoutePathsType.OrderConfirmed}/${order.id}`
                        ),
                      250
                    );
                  }}
                />
              ))}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={[
              styles['loading-ring'],
              styles['loading-ring-mobile'],
            ].join(' ')}
            style={{ display: accountProps.hasMoreOrders ? 'flex' : 'none' }}
          />
          {!accountProps.areOrdersLoading && orders.length <= 0 && (
            <>
              <div
                className={[
                  styles['no-order-history-text'],
                  styles['no-order-history-text-mobile'],
                ].join(' ')}
              >
                {t('noOrderHistory')}
              </div>
              <div
                className={[
                  styles['shop-button-container'],
                  styles['shop-button-container-mobile'],
                ].join(' ')}
              >
                <Button
                  classNames={{
                    button: [
                      styles['shop-button'],
                      styles['shop-button-mobile'],
                    ].join(' '),
                  }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  size={'large'}
                  onClick={() =>
                    setTimeout(() => navigate(RoutePathsType.Store), 75)
                  }
                >
                  {t('shopNow')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ResponsiveMobile>
  );
}
