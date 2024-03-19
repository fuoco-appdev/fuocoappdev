import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../account-addresses.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AddressItemSuspenseTabletComponent } from './address-item.suspense.tablet.component';
import {
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from '../../../components/responsive.component';

export function AccountAddressesSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-tablet'],
          ].join(' ')}
        >
          {[1].map(() => (
            <AddressItemSuspenseTabletComponent />
          ))}
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
