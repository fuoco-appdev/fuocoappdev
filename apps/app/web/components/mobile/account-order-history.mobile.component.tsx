import { Button } from '@fuoco.appdev/web-components';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/account-order-history.module.scss';
import { useQuery } from '../../route-paths';
import { AccountOrderHistoryResponsiveProps } from '../account-order-history.component';
import { useAccountOutletContext } from '../account.component';
import { DIContext } from '../app.component';
import OrderItemComponent from '../order-item.component';
import { ResponsiveMobile } from '../responsive.component';

function AccountOrderHistoryMobileComponent({}: AccountOrderHistoryResponsiveProps): JSX.Element {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const context = useAccountOutletContext();
  const { AccountController } = React.useContext(DIContext);
  const { orders, areOrdersLoading } = AccountController.model;

  return (
    <ResponsiveMobile>
      <div
        ref={rootRef}
        className={[styles['root'], styles['root-mobile']].join(' ')}
      >
        <div
          className={[
            styles['items-container'],
            styles['items-container-mobile'],
          ].join(' ')}
        >
          {orders.length > 0 &&
            orders
              .sort(
                (current: HttpTypes.StoreOrder, next: HttpTypes.StoreOrder) => {
                  return (
                    new Date(next.created_at).valueOf() -
                    new Date(current.created_at).valueOf()
                  );
                }
              )
              .map((order: HttpTypes.StoreOrder) => (
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
          {!areOrdersLoading && orders.length <= 0 && (
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
                  touchScreen={true}
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
    </ResponsiveMobile>
  );
}

export default observer(AccountOrderHistoryMobileComponent);
