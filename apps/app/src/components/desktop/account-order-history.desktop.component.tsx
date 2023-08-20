import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-order-history.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import { Store } from '@ngneat/elf';
import { Customer, Order } from '@medusajs/medusa';
import OrderItemComponent from '../order-item.component';
import InfiniteScroll from 'react-infinite-scroll-component';

export function AccountOrderHistoryDesktopComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  const orders = props.orders as Order[];
  return (
    <div
      ref={rootRef}
      className={[styles['root'], styles['root-desktop']].join(' ')}
    >
      <InfiniteScroll
        dataLength={orders.length}
        next={() => AccountController.onNextOrderScrollAsync()}
        className={[styles['scroll'], styles['scroll-desktop']].join(' ')}
        hasMore={props.hasMoreOrders}
        height={rootRef.current?.clientHeight ?? 0 - 8}
        loader={
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={[
              styles['loading-ring'],
              styles['loading-ring-desktop'],
            ].join(' ')}
          />
        }
      >
        <div
          className={[
            styles['order-history-text'],
            styles['order-history-text-desktop'],
          ].join(' ')}
        >
          {t('orderHistory')}
        </div>
        {orders.length > 0 ? (
          orders
            .sort((current: Order, next: Order) => {
              return (
                new Date(next.created_at).valueOf() -
                new Date(current.created_at).valueOf()
              );
            })
            .map((order: Order) => (
              <OrderItemComponent key={order.id} order={order} />
            ))
        ) : (
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
                touchScreen={true}
                onClick={() =>
                  setTimeout(() => navigate(RoutePaths.Store), 150)
                }
              >
                {t('shopNow')}
              </Button>
            </div>
          </>
        )}
      </InfiniteScroll>
    </div>
  );
}
