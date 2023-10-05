import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-edit.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AddressItemSuspenseDesktopComponent } from './address-item.suspense.desktop.component';
import { AccountProfileFormSuspenseDesktopComponent } from './account-profile-form.suspense.desktop.component';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function AccountEditSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['edit-text-container-skeleton'],
            styles['edit-text-container-skeleton-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['edit-text-skeleton'],
              styles['edit-text-skeleton-desktop'],
            ].join(' ')}
          >
            <Skeleton count={1} borderRadius={20} height={20} width={120} />
          </div>
        </div>
        <div
          className={[
            styles['profile-form-container'],
            styles['profile-form-container-desktop'],
          ].join(' ')}
        >
          <AccountProfileFormSuspenseDesktopComponent />
        </div>
        <div
          className={[
            styles['save-button-container'],
            styles['save-button-container-desktop'],
          ].join(' ')}
        >
          <Skeleton style={{ width: '100%', height: 48 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
