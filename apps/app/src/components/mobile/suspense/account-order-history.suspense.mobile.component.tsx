import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-order-history.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { OrderItemSuspenseMobileComponent } from './order-item.suspense.mobile.component';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function AccountOrderHistorySuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div className={[styles['scroll'], styles['scroll-desktop']].join(' ')}>
          <div
            className={[
              styles['order-history-text-skeleton'],
              styles['order-history-text-skeleton-desktop'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
          {[1, 2, 3, 4, 5].map(() => (
            <OrderItemSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
