import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-order-history.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { OrderItemSuspenseTabletComponent } from './order-item.suspense.tablet.component';
import {
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from '../../../components/responsive.component';

export function AccountOrderHistorySuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div className={[styles['scroll'], styles['scroll-tablet']].join(' ')}>
          <div
            className={[
              styles['order-history-text-skeleton'],
              styles['order-history-text-skeleton-tablet'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
          <div
            className={[
              styles['items-container'],
              styles['items-container-tablet'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => (
              <OrderItemSuspenseTabletComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
