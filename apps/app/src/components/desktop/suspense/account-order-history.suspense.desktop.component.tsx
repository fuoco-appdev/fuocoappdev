import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-order-history.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { OrderItemSuspenseDesktopComponent } from './order-item.suspense.desktop.component';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function AccountOrderHistorySuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div className={[styles['scroll'], styles['scroll-desktop']].join(' ')}>
          <div
            className={[
              styles['items-container'],
              styles['items-container-desktop'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5].map(() => (
              <OrderItemSuspenseDesktopComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
