import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-public-likes.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AccountProfileFormSuspenseMobileComponent } from './account-profile-form.suspense.mobile.component';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';
import { ProductPreviewSuspenseMobileComponent } from './product-preview.suspense.mobile.component';

export function AccountPublicLikesSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['likes-text-container-skeleton'],
            styles['likes-text-container-skeleton-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['likes-text-skeleton'],
              styles['likes-text-skeleton-mobile'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['items-container'],
            styles['items-container-mobile'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
