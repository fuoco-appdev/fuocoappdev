import { Button } from '@fuoco.appdev/core-ui';
import { Order } from '@medusajs/medusa';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountController from '../../../controllers/account.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountOrderHistoryResponsiveProps } from '../account-order-history.component';
import styles from '../account-order-history.module.scss';
import { useAccountOutletContext } from '../account.component';
import OrderItemComponent from '../order-item.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function AccountOrderHistoryDesktopComponent({
  accountProps,
}: AccountOrderHistoryResponsiveProps): JSX.Element {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
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
