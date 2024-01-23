import { createRef, useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-order-history.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePathsType, useQuery } from '../../route-paths';
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
import { useAccountOutletContext } from '../account.component';

export default function AccountOrderHistoryDesktopComponent({
  accountProps,
}: AccountOrderHistoryResponsiveProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t, i18n } = useTranslation();
  const context = useAccountOutletContext();

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
          className={[
            styles['items-container'],
            styles['items-container-desktop'],
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
              styles['loading-ring-desktop'],
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
    </ResponsiveDesktop>
  );
}
