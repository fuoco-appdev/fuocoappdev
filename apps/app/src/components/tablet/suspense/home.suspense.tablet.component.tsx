import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../home.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseTablet } from 'src/components/responsive.component';

export function HomeSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['content-container'],
            styles['content-container-tablet'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['background-image'],
              styles['background-image-tablet'],
            ].join(' ')}
          />
        </div>
        <Skeleton
          className={[
            styles['map-container'],
            styles['map-container-tablet'],
          ].join(' ')}
        />
      </div>
    </ResponsiveSuspenseTablet>
  );
}
