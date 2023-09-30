import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../window.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function WindowSuspenseDesktopComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}>
        <div
          className={[
            styles['top-bar-left-content'],
            styles['top-bar-left-content-desktop'],
          ].join(' ')}
        >
          <div className={[styles['top-bar-button-container']].join(' ')}>
            <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          </div>
          <div
            className={[
              styles['logo-container'],
              styles['logo-container-desktop'],
            ].join(' ')}
          >
            <img src={'../assets/svg/logo.svg'} />
            <img
              className={[
                styles['logo-text'],
                styles['logo-text-desktop'],
              ].join(' ')}
              src={'../assets/svg/logo-text.svg'}
            />
          </div>
        </div>
        <div
          className={[
            styles['top-bar-right-content'],
            styles['top-bar-right-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['shopping-cart-container-details'],
              styles['shopping-cart-container-details-desktop'],
            ].join(' ')}
          >
            <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          </div>
          <div
            className={[
              styles['top-bar-button-container'],
              styles['top-bar-button-container-desktop'],
            ].join(' ')}
          >
            <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          </div>
          <div
            className={[
              styles['top-bar-button-container'],
              styles['top-bar-button-container-desktop'],
            ].join(' ')}
          >
            <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
          </div>
        </div>
      </div>
      <div className={[styles['content'], styles['content-desktop']].join(' ')}>
        <div
          className={[styles['side-bar'], styles['side-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['skeleton-tabs'],
              styles['skeleton-tabs-desktop'],
            ].join(' ')}
          >
            <Skeleton style={{ width: 56, height: 56 }} borderRadius={6} />
            <Skeleton style={{ width: 56, height: 56 }} borderRadius={6} />
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-desktop'],
          ].join(' ')}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
