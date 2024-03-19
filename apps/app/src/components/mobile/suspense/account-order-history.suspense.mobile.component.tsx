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
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div className={[styles['scroll'], styles['scroll-mobile']].join(' ')}>
          <div
            className={[
              styles['items-container'],
              styles['items-container-mobile'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => (
              <OrderItemSuspenseMobileComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
