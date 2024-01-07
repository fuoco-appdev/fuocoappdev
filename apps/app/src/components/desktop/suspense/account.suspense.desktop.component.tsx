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
          >
            <div
              className={[
                styles['username-container'],
                styles['username-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['username'],
                  styles['username-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  count={1}
                  borderRadius={20}
                  height={20}
                  width={80}
                  className={[
                    styles['skeleton-user'],
                    styles['skeleton-user-desktop'],
                  ].join(' ')}
                />
              </div>
            </div>
          </div>
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
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-content'],
              styles['top-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['status-container'],
                styles['status-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['avatar-content'],
                  styles['avatar-content-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['avatar-container'],
                    styles['avatar-container-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    style={{ width: 96, height: 96 }}
                    borderRadius={96}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['followers-status-container'],
                  styles['followers-status-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={30} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={55} height={19} borderRadius={19} />
                  </div>
                </div>
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={30} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={55} height={19} borderRadius={19} />
                  </div>
                </div>
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={30} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-desktop'],
                    ].join(' ')}
                  >
                    <Skeleton width={55} height={19} borderRadius={19} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={[styles['username'], styles['username-desktop']].join(
                ' '
              )}
            >
              <Skeleton
                count={1}
                borderRadius={9999}
                width={120}
                className={[
                  styles['skeleton-user'],
                  styles['skeleton-user-desktop'],
                ].join(' ')}
              />
            </div>
          </div>
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
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-desktop'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
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
