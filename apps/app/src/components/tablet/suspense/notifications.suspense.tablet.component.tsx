import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../notifications.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from 'src/components/responsive.component';

export function NotificationsSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}></div>
    </ResponsiveSuspenseTablet>
  );
}
