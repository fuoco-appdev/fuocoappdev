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
import { ProductPreviewSuspenseTabletComponent } from './product-preview.suspense.tablet.component';

export function AccountLikesSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['likes-text-container-skeleton'],
            styles['likes-text-container-skeleton-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['likes-text-skeleton'],
              styles['likes-text-skeleton-tablet'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['items-container'],
            styles['items-container-tablet'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseTabletComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
