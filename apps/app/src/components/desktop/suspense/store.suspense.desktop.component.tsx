import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../store.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ProductPreviewSuspenseDesktopComponent } from './product-preview.suspense.desktop.component';

export function StoreSuspenseDesktopComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div
        className={[
          styles['left-content'],
          styles['left-content-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['top-bar-container'],
            styles['top-bar-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-left-content'],
              styles['top-bar-left-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['search-container'],
                styles['search-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-input-root'],
                  styles['search-input-root-desktop'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['search-input-container-skeleton'],
                    styles['search-input-container-skeleton-desktop'],
                  ].join(' ')}
                  height={46}
                  width={556}
                  borderRadius={46}
                />
              </div>
            </div>
            <div
              className={[
                styles['tab-container-skeleton'],
                styles['tab-container-skeleton-desktop'],
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
              styles['top-bar-right-content-desktop'],
            ].join(' ')}
          >
            <div>
              <Skeleton style={{ width: 48, height: 48 }} borderRadius={40} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-desktop'],
          ].join(' ')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <ProductPreviewSuspenseDesktopComponent />
          ))}
        </div>
      </div>
    </div>
  );
}
