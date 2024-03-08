import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../cart-variant-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function CartVariantItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div
        className={[
          styles['variant-container'],
          styles['variant-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['variant-content'],
            styles['variant-content-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['variant-details'],
              styles['variant-details-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['variant-thumbnail-container'],
                styles['variant-thumbnail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton width={38} height={38} />
            </div>
            <div
              className={[
                styles['variant-title'],
                styles['variant-title-mobile'],
              ].join(' ')}
            >
              <Skeleton width={60} height={22} borderRadius={22} />
            </div>
            <div
              className={[
                styles['variant-value'],
                styles['variant-value-mobile'],
              ].join(' ')}
            >
              <Skeleton width={40} height={22} borderRadius={22} />
            </div>
            <div
              className={[
                styles['variant-price'],
                styles['variant-price-mobile'],
              ].join(' ')}
            >
              <Skeleton width={60} height={22} borderRadius={22} />
            </div>
          </div>

          <Skeleton width={24} height={24} borderRadius={24} />
        </div>
        <div className={styles['input-root-skeleton']}>
          <Skeleton
            className={styles['input-form-layout-label-skeleton']}
            height={20}
            width={120}
            borderRadius={20}
          />
          <Skeleton style={{ height: 44 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
