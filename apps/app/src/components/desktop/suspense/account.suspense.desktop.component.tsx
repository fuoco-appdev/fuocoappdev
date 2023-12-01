import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AccountOrderHistorySuspenseDesktopComponent } from './account-order-history.suspense.desktop.component';
import { AccountAddressesSuspenseDesktopComponent } from './account-addresses.suspense.desktop.component';
import { AccountLikesSuspenseDesktopComponent } from './account-likes.suspense.desktop.component';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function AccountSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['left-tab-container'],
              styles['left-tab-container-desktop'],
            ].join(' ')}
          ></div>
          <div
            className={[
              styles['right-tab-container'],
              styles['right-tab-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-container'],
                styles['tab-button-container-desktop'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['avatar-container'],
            styles['avatar-container-desktop'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 96, height: 96 }} borderRadius={96} />
        </div>
        <div
          className={[styles['username'], styles['username-desktop']].join(' ')}
        >
          <Skeleton
            count={1}
            borderRadius={20}
            height={20}
            width={120}
            className={[
              styles['skeleton-user'],
              styles['skeleton-user-desktop'],
            ].join(' ')}
          />
        </div>
        <div
          className={[styles['content'], styles['content-desktop']].join(' ')}
        >
          <div
            className={[
              styles['left-content'],
              styles['left-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['card-container'],
                styles['card-container-desktop'],
                styles['left-card-container-desktop'],
              ].join(' ')}
            >
              <AccountOrderHistorySuspenseDesktopComponent />
            </div>
          </div>
          <div
            className={[
              styles['right-content'],
              styles['right-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['card-container'],
                styles['card-container-desktop'],
              ].join(' ')}
            >
              <AccountAddressesSuspenseDesktopComponent />
            </div>
            <div
              className={[
                styles['card-container'],
                styles['card-container-desktop'],
              ].join(' ')}
            >
              <AccountLikesSuspenseDesktopComponent />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
