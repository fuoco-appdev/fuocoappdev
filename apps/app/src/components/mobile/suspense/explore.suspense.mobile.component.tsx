import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../explore.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function ExploreSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['top-bar-container'],
              styles['top-bar-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['logo-container'],
                styles['logo-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[styles['logo'], styles['logo-mobile']].join(' ')}
                borderRadius={32}
              />
              <Skeleton
                className={[
                  styles['logo-text'],
                  styles['logo-text-mobile'],
                ].join(' ')}
                width={128}
                borderRadius={28}
              />
            </div>
            <div
              className={[
                styles['search-container'],
                styles['search-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['search-input-root'],
                  styles['search-input-root-mobile'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['search-input-container-skeleton'],
                    styles['search-input-container-skeleton-mobile'],
                  ].join(' ')}
                  height={46}
                  borderRadius={46}
                />
              </div>
            </div>
            <div
              className={[
                styles['tab-container-skeleton'],
                styles['tab-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
              <Skeleton style={{ width: 80, height: 24 }} borderRadius={24} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['map-container'],
            styles['map-container-mobile'],
          ].join(' ')}
        ></div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
