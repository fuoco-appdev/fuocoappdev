import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-order-history.module.scss';
import { Alert } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { Customer, Order } from '@medusajs/medusa';
import OrderItemComponent from './order-item.component';
import InfiniteScroll from 'react-infinite-scroll-component';

function AccountOrderHistoryDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);

  return <></>;
}

function AccountOrderHistoryMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  const orders = props.orders as Order[];
  return (
    <div ref={rootRef} className={styles['root']}>
      <InfiniteScroll
        dataLength={orders.length}
        next={() => AccountController.onNextOrderScrollAsync()}
        className={styles['scroll-mobile']}
        hasMore={props.hasMoreOrders}
        height={rootRef.current?.clientHeight ?? 0 - 8}
        loader={
          <img
            src={'../assets/svg/ring-resize.svg'}
            className={styles['loading-ring']}
          />
        }
      >
        <div className={styles['order-history-text']}>{t('orderHistory')}</div>
        {orders
          .sort((current: Order, next: Order) => {
            return (
              new Date(next.created_at).valueOf() -
              new Date(current.created_at).valueOf()
            );
          })
          .map((order: Order) => (
            <OrderItemComponent key={order.id} order={order} />
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default function AccountOrderHistoryComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountOrderHistoryDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountOrderHistoryMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
