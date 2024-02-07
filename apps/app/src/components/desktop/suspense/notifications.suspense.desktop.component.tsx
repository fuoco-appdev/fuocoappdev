import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../notifications.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';
import { StockLocationItemSuspenseDesktopComponent } from './stock-location-item.suspense.desktop.component';
import { NotificationItemSuspenseDesktopComponent } from './notification-item.suspense.desktop.component';

export function NotificationsSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-desktop']].join(' ')}
            >
              <Skeleton width={140} height={20} borderRadius={20} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (value: number, index: number) => {
              return <NotificationItemSuspenseDesktopComponent key={value} />;
            }
          )}
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
