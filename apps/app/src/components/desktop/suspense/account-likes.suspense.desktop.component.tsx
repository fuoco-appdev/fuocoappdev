import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-likes.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AddressItemSuspenseDesktopComponent } from './address-item.suspense.desktop.component';
import { AccountProfileFormSuspenseDesktopComponent } from './account-profile-form.suspense.desktop.component';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';
import { ProductPreviewSuspenseDesktopComponent } from './product-preview.suspense.desktop.component';

export function AccountLikesSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['likes-text-container-skeleton'],
            styles['likes-text-container-skeleton-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['likes-text-skeleton'],
              styles['likes-text-skeleton-desktop'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['items-container'],
            styles['items-container-desktop'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseDesktopComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
