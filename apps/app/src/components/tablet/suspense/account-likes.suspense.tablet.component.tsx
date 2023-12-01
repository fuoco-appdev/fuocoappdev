import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-likes.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AccountProfileFormSuspenseTabletComponent } from './account-profile-form.suspense.tablet.component';
import {
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from '../../responsive.component';

export function AccountLikesSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['edit-text-container-skeleton'],
            styles['edit-text-container-skeleton-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['edit-text-skeleton'],
              styles['edit-text-skeleton-tablet'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['profile-form-container'],
            styles['profile-form-container-tablet'],
          ].join(' ')}
        >
          <AccountProfileFormSuspenseTabletComponent />
        </div>
        <div
          className={[
            styles['save-button-container'],
            styles['save-button-container-tablet'],
          ].join(' ')}
        >
          <Skeleton style={{ width: '100%', height: 48 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
