import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-public-status.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';
import { AccountFollowItemSuspenseDesktopComponent } from './account-follow-item.suspense.desktop.component';

export function AccountPublicStatusSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['tabs-container-skeleton'],
              styles['tabs-container-skeleton-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48, width: 250 }} borderRadius={6} />
            </div>
          </div>
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-desktop'],
            ].join(' ')}
          >
            <div style={{ minWidth: '100%', minHeight: '100%' }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}