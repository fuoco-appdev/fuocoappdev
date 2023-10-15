import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../cart-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseMobile,
} from 'src/components/responsive.component';

export function CartVariantItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div
        className={[styles['container'], styles['container-desktop']].join(' ')}
      ></div>
    </ResponsiveSuspenseDesktop>
  );
}
