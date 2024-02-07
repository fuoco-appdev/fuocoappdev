import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product-preview.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function ProductPreviewSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile inheritStyles={false}>
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
            >
              <div
                className={[
                  styles['label-container'],
                  styles['label-container-mobile'],
                ].join(' ')}
              ></div>
              <div
                className={[
                  styles['status-content-container'],
                  styles['status-content-container--mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['like-status-container'],
                    styles['like-status-container--mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['like-status-button-skeleton'],
                      styles['like-status-button-skeleton--mobile'],
                    ].join(' ')}
                  />
                  <Skeleton
                    borderRadius={9999}
                    className={[
                      styles['like-status-count-skeleton'],
                      styles['like-status-count-skeleton--mobile'],
                    ].join(' ')}
                  />
                </div>
              </div>
            </div>
            <div
              className={[
                styles['thumbnail-bottom-content'],
                styles['thumbnail-bottom-content-mobile'],
              ].join(' ')}
            >
              <Skeleton width={46} height={46} borderRadius={46} />
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
    </ResponsiveSuspenseMobile>
  );
}
