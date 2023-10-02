import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product-preview.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function ProductPreviewSuspenseMobileComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div
        className={[
          styles['thumbnail-container'],
          styles['thumbnail-container-mobile'],
        ].join(' ')}
        style={{ height: 'calc(100% - 38px)' }}
      >
        <Skeleton
          className={[
            styles['thumbnail-image'],
            styles['thumbnail-image-mobile'],
          ].join(' ')}
        />
        <div
          className={[
            styles['thumbnail-content-container'],
            styles['thumbnail-content-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['thumbnail-top-content'],
              styles['thumbnail-top-content-mobile'],
            ].join(' ')}
          ></div>
          <div
            className={[
              styles['thumbnail-bottom-content'],
              styles['thumbnail-bottom-content-mobile'],
            ].join(' ')}
          >
            <Skeleton width={56} height={56} borderRadius={56} />
          </div>
        </div>
      </div>
      <div
        className={[styles['bottom-bar'], styles['bottom-bar-mobile']].join(
          ' '
        )}
      >
        <Skeleton
          className={[
            styles['product-title'],
            styles['product-title-mobile'],
          ].join(' ')}
          width={60}
          height={20}
          borderRadius={20}
        />
        <Skeleton
          className={[
            styles['product-price'],
            styles['product-price-mobile'],
          ].join(' ')}
          width={40}
          height={20}
          borderRadius={20}
        />
      </div>
    </div>
  );
}
