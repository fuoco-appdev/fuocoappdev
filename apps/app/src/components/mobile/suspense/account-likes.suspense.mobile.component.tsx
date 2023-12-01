import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-likes.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AccountProfileFormSuspenseMobileComponent } from './account-profile-form.suspense.mobile.component';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function AccountLikesSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['edit-text-container-skeleton'],
            styles['edit-text-container-skeleton-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['edit-text-skeleton'],
              styles['edit-text-skeleton-mobile'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['profile-form-container'],
            styles['profile-form-container-mobile'],
          ].join(' ')}
        >
          <AccountProfileFormSuspenseMobileComponent />
        </div>
        <div
          className={[
            styles['save-button-container'],
            styles['save-button-container-mobile'],
          ].join(' ')}
        >
          <Skeleton style={{ width: '100%', height: 48 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
