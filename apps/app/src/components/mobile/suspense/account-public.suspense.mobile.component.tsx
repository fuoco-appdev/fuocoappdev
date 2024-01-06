import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-public.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function AccountPublicSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-content'],
              styles['top-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['status-container'],
                styles['status-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['avatar-content'],
                  styles['avatar-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['avatar-container'],
                    styles['avatar-container-mobile'],
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
                  styles['followers-status-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-mobile'],
                    ].join(' ')}
                  >
                    <Skeleton width={16} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-mobile'],
                    ].join(' ')}
                  >
                    <Skeleton width={50} height={19} borderRadius={19} />
                  </div>
                </div>
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-mobile'],
                    ].join(' ')}
                  >
                    <Skeleton width={16} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-mobile'],
                    ].join(' ')}
                  >
                    <Skeleton width={50} height={19} borderRadius={19} />
                  </div>
                </div>
                <div
                  className={[
                    styles['followers-status-item'],
                    styles['followers-status-item-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['followers-status-value'],
                      styles['followers-status-value-mobile'],
                    ].join(' ')}
                  >
                    <Skeleton width={16} height={19} borderRadius={19} />
                  </div>
                  <div
                    className={[
                      styles['followers-status-name'],
                      styles['followers-status-name-mobile'],
                    ].join(' ')}
                  >
                    <Skeleton width={50} height={19} borderRadius={19} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={[styles['username'], styles['username-mobile']].join(
                ' '
              )}
            >
              <Skeleton
                count={1}
                borderRadius={20}
                height={20}
                width={120}
                className={[
                  styles['skeleton-user'],
                  styles['skeleton-user-mobile'],
                ].join(' ')}
              />
            </div>
            <div
              className={[
                styles['follow-button-container'],
                styles['follow-button-container-mobile'],
              ].join(' ')}
            >
              <Skeleton count={1} borderRadius={6} height={34} width={104} />
            </div>
          </div>
          <div
            className={[
              styles['tabs-container-skeleton'],
              styles['tabs-container-skeleton-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-mobile'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-mobile'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
            <div
              className={[
                styles['tab-button-skeleton'],
                styles['tab-button-skeleton-mobile'],
              ].join('')}
            >
              <Skeleton style={{ height: 48 }} borderRadius={6} />
            </div>
          </div>
          <div
            className={[
              styles['outlet-container'],
              styles['outlet-container-mobile'],
            ].join(' ')}
          >
            <div style={{ minWidth: '100%', minHeight: '100%' }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
