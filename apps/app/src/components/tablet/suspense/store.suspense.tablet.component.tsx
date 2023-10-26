import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../store.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ProductPreviewSuspenseTabletComponent } from './product-preview.suspense.tablet.component';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseTablet,
} from 'src/components/responsive.component';

export function StoreSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-left-content'],
                styles['top-bar-left-content-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['search-input-container-skeleton'],
                      styles['search-input-container-skeleton-tablet'],
                    ].join(' ')}
                    height={46}
                    width={456}
                    borderRadius={46}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['tab-container-skeleton'],
                  styles['tab-container-skeleton-tablet'],
                ].join(' ')}
              >
                <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
                <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
                <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
                <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
              </div>
            </div>
            <div
              className={[
                styles['top-bar-right-content'],
                styles['top-bar-right-content-tablet'],
              ].join(' ')}
            >
              <div>
                <Skeleton style={{ width: 48, height: 48 }} borderRadius={48} />
              </div>
            </div>
          </div>
          <div
            className={[
              styles['scroll-container'],
              styles['scroll-container-tablet'],
            ].join(' ')}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
              <ProductPreviewSuspenseTabletComponent />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
