import { createRef, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-order-history.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import { Customer, Order } from '@medusajs/medusa';
import OrderItemComponent from '../order-item.component';
import { AccountOrderHistoryResponsiveProps } from '../account-order-history.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function AccountOrderHistoryDesktopComponent({
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
    <ResponsiveDesktop>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-desktop']].join(' ')}
      >
        <div
          className={[
            styles['order-history-text-container'],
            styles['order-history-text-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['order-history-text'],
              styles['order-history-text-desktop'],
            ].join(' ')}
          >
            {t('orderHistory')}
          </div>
        </div>
        <div
          ref={ordersContainerRef}
          onScroll={onOrdersScroll}
          onLoad={onOrdersLoad}
          className={[styles['scroll'], styles['scroll-desktop']].join(' ')}
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
              styles['loading-ring-desktop'],
            ].join(' ')}
            style={{ display: accountProps.hasMoreOrders ? 'flex' : 'none' }}
          />
          {!accountProps.areOrdersLoading && orders.length <= 0 && (
            <>
              <div
                className={[
                  styles['no-order-history-text'],
                  styles['no-order-history-text-desktop'],
                ].join(' ')}
              >
                {t('noOrderHistory')}
              </div>
              <div
                className={[
                  styles['shop-button-container'],
                  styles['shop-button-container-desktop'],
                ].join(' ')}
              >
                <Button
                  classNames={{
                    button: [
                      styles['shop-button'],
                      styles['shop-button-desktop'],
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
    </ResponsiveDesktop>
  );
}
