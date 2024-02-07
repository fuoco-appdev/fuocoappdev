import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../notifications.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from 'src/components/responsive.component';
import { NotificationItemSuspenseTabletComponent } from './notification-item.suspense.tablet.component';

export function NotificationsSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-tablet']].join(' ')}
        >
          <div
            className={[
              styles['title-container'],
              styles['title-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[styles['title'], styles['title-tablet']].join(' ')}
            >
              <Skeleton width={140} height={20} borderRadius={20} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (value: number, index: number) => {
              return <NotificationItemSuspenseTabletComponent key={value} />;
            }
          )}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
