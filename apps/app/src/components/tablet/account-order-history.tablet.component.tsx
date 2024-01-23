import { createRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-order-history.module.scss';
import { Button } from '@fuoco.appdev/core-ui';
import { RoutePathsType, useQuery } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import { Order } from '@medusajs/medusa';
import OrderItemComponent from '../order-item.component';
import { AccountOrderHistoryResponsiveProps } from '../account-order-history.component';
import { ResponsiveMobile, ResponsiveTablet } from '../responsive.component';
import { useAccountOutletContext } from '../account.component';

export default function AccountOrderHistoryTabletComponent({
  accountProps,
}: AccountOrderHistoryResponsiveProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t, i18n } = useTranslation();
  const context = useAccountOutletContext();

  const orders = accountProps.orders as Order[];
  return (
    <ResponsiveTablet>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-tablet']].join(' ')}
      >
        <div
          className={[
            styles['order-history-text-container'],
            styles['order-history-text-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['order-history-text'],
              styles['order-history-text-tablet'],
            ].join(' ')}
          >
            {t('orderHistory')}
          </div>
        </div>
        <div
          className={[
            styles['items-container'],
            styles['items-container-tablet'],
          ].join(' ')}
        >
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
                      context?.scrollContainerRef?.current?.scrollTop
                    );
                    setTimeout(
                      () =>
                        navigate({
                          pathname: `${RoutePathsType.OrderConfirmed}/${order.id}`,
                          search: query.toString(),
                        }),
                      250
                    );
                  }}
                />
              ))}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={[
              styles['loading-ring'],
              styles['loading-ring-tablet'],
            ].join(' ')}
            style={{
              display:
                accountProps.hasMoreOrders || accountProps.areOrdersLoading
                  ? 'flex'
                  : 'none',
            }}
          />
          {!accountProps.areOrdersLoading && orders.length <= 0 && (
            <>
              <div
                className={[
                  styles['no-order-history-text'],
                  styles['no-order-history-text-tablet'],
                ].join(' ')}
              >
                {t('noOrderHistory')}
              </div>
              <div
                className={[
                  styles['shop-button-container'],
                  styles['shop-button-container-tablet'],
                ].join(' ')}
              >
                <Button
                  touchScreen={true}
                  classNames={{
                    button: [
                      styles['shop-button'],
                      styles['shop-button-tablet'],
                    ].join(' '),
                  }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  size={'large'}
                  onClick={() =>
                    setTimeout(
                      () =>
                        navigate({
                          pathname: RoutePathsType.Store,
                          search: query.toString(),
                        }),
                      75
                    )
                  }
                >
                  {t('shopNow')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ResponsiveTablet>
  );
}
