import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../address-form.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseTablet } from '../../responsive.component';

export function AddressFormSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ height: 44 }} borderRadius={6} />
      </div>
      <div
        className={[
          styles['horizontal-input-container'],
          styles['horizontal-input-container-desktop'],
        ].join(' ')}
      >
        <div className={styles['input-root-skeleton']}>
          <Skeleton
            className={styles['input-form-layout-label-skeleton']}
            height={20}
            width={120}
            borderRadius={20}
          />
          <Skeleton style={{ height: 44 }} borderRadius={6} />
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
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ height: 44 }} borderRadius={6} />
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
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ height: 44 }} borderRadius={6} />
      </div>
      <div
        className={[
          styles['horizontal-input-container'],
          styles['horizontal-input-container-desktop'],
        ].join(' ')}
      >
        <div className={styles['input-root-skeleton']}>
          <Skeleton
            className={styles['input-form-layout-label-skeleton']}
            height={20}
            width={120}
            borderRadius={20}
          />
          <Skeleton style={{ height: 44 }} borderRadius={6} />
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
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ height: 44 }} borderRadius={6} />
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
      <div className={styles['input-root-skeleton']}>
        <Skeleton
          className={styles['input-form-layout-label-skeleton']}
          height={20}
          width={120}
          borderRadius={20}
        />
        <Skeleton style={{ height: 44 }} borderRadius={6} />
      </div>
    </ResponsiveSuspenseTablet>
  );
}
