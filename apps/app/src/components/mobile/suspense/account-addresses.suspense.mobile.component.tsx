import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-addresses.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AddressItemSuspenseMobileComponent } from './address-item.suspense.mobile.component';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function AccountAddressesSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-mobile'],
          ].join(' ')}
        >
          {[1].map(() => (
            <AddressItemSuspenseMobileComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
