import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product-preview.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function ProductPreviewSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop inheritStyles={false}>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['thumbnail-container'],
            styles['thumbnail-container-desktop'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-desktop'],
            ].join(' ')}
          />
          <div
            className={[
              styles['thumbnail-content-container'],
              styles['thumbnail-content-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['thumbnail-top-content'],
                styles['thumbnail-top-content-desktop'],
              ].join(' ')}
            ></div>
          </div>
        </div>
        <div
          className={[
            styles['bottom-content-skeleton'],
            styles['bottom-content-skeleton-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['bottom-top-content-skeleton'],
              styles['bottom-top-content-skeleton-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['product-title-container'],
                styles['product-title-container-desktop'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['product-title'],
                  styles['product-title-desktop'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['product-subtitle'],
                  styles['product-subtitle-desktop'],
                ].join(' ')}
                width={100}
                borderRadius={20}
              />
            </div>
            <Skeleton
              className={[
                styles['product-price'],
                styles['product-price-desktop'],
              ].join(' ')}
              width={40}
              borderRadius={20}
            />
          </div>
          <div
            className={[
              styles['product-details-container-skeleton'],
              styles['product-details-container-skeleton-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['product-description-skeleton'],
                styles['product-description-skeleton-desktop'],
              ].join(' ')}
            >
              <Skeleton count={4} borderRadius={20} />
            </div>
            <div
              className={[
                styles['product-status-actions-container'],
                styles['product-status-actions-container-desktop'],
              ].join(' ')}
            >
              <Skeleton width={56} height={56} borderRadius={56} />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
