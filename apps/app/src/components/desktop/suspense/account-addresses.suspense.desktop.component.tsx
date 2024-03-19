import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-addresses.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AddressItemSuspenseDesktopComponent } from './address-item.suspense.desktop.component';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function AccountAddressesSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-desktop'],
          ].join(' ')}
        >
          {[1].map(() => (
            <AddressItemSuspenseDesktopComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
