import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-add-friends.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from '../../responsive.component';
import { AccountFollowItemSuspenseMobileComponent } from './account-follow-item.suspense.mobile.component';

export function AccountAddFriendsSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['search-input-root'],
              styles['search-input-root-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['search-input-container-skeleton'],
                styles['search-input-container-skeleton-mobile'],
              ].join(' ')}
              height={46}
              borderRadius={46}
            />
          </div>
        </div>
        <div className={[styles['title'], styles['title-mobile']].join(' ')}>
          <Skeleton count={1} borderRadius={14} height={14} width={80} />
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {[1, 2, 3, 4].map(() => (
            <AccountFollowItemSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
