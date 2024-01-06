import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-public-followers.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseTablet,
} from '../../responsive.component';
import { AccountFollowItemSuspenseTabletComponent } from './account-follow-item.suspense.tablet.component';

export function AccountPublicFollowersSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['search-input-root'],
              styles['search-input-root-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['search-input-container-skeleton'],
                styles['search-input-container-skeleton-tablet'],
              ].join(' ')}
              height={46}
              width={556}
              borderRadius={46}
            />
          </div>
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-tablet'],
          ].join(' ')}
        >
          {[1, 2, 3, 4].map(() => (
            <AccountFollowItemSuspenseTabletComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
