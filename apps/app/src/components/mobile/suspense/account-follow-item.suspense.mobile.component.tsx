import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-follow-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from '../../responsive.component';

export function AccountFollowItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-mobile'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          <div
            className={[
              styles['user-info-container'],
              styles['user-info-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[styles['username'], styles['username-mobile']].join(
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
                  styles['skeleton-user-mobile'],
                ].join(' ')}
              />
            </div>
            <Skeleton
              count={1}
              borderRadius={16}
              height={16}
              width={120}
              className={[styles['full-name'], styles['full-name-mobile']].join(
                ' '
              )}
            />
          </div>
        </div>
        <Skeleton style={{ width: 113, height: 38 }} borderRadius={6} />
      </div>
    </ResponsiveSuspenseMobile>
  );
}
