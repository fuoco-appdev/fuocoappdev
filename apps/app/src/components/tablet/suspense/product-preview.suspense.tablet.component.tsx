import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product-preview.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from 'src/components/responsive.component';

export function ProductPreviewSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet inheritStyles={false}>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['thumbnail-container'],
            styles['thumbnail-container-tablet'],
          ].join(' ')}
          style={{ height: 'calc(100% - 38px)' }}
        >
          <Skeleton
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-tablet'],
            ].join(' ')}
          />
          <div
            className={[
              styles['thumbnail-content-container'],
              styles['thumbnail-content-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['thumbnail-top-content'],
                styles['thumbnail-top-content-tablet'],
              ].join(' ')}
            ></div>
            <div
              className={[
                styles['thumbnail-bottom-content'],
                styles['thumbnail-bottom-content-tablet'],
              ].join(' ')}
            >
              <Skeleton width={46} height={46} borderRadius={46} />
            </div>
          </div>
        </div>
        <div
          className={[styles['bottom-bar'], styles['bottom-bar-tablet']].join(
            ' '
          )}
        >
          <Skeleton
            className={[
              styles['product-title'],
              styles['product-title-tablet'],
            ].join(' ')}
            width={60}
            height={20}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['product-price'],
              styles['product-price-tablet'],
            ].join(' ')}
            width={40}
            height={20}
            borderRadius={20}
          />
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
