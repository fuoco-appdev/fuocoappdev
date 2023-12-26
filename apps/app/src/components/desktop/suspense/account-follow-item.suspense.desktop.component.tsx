import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-follow-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function AccountFollowItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-desktop'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-desktop']].join(
                ' '
              )}
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
            <Skeleton
              count={1}
              borderRadius={16}
              height={16}
              width={120}
              className={[
                styles['skeleton-user'],
                styles['skeleton-user-desktop'],
              ].join(' ')}
            />
          </div>
        </div>
        <Skeleton style={{ width: 113, height: 38 }} borderRadius={6} />
      </div>
    </ResponsiveSuspenseDesktop>
  );
}