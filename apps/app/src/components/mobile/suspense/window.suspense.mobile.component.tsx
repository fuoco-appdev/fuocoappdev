import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../window.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function WindowSuspenseMobileComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={[styles['content'], styles['content-mobile']].join(' ')}>
        <div style={{ minWidth: '100%', minHeight: '100%' }}>
          <Outlet />
        </div>
      </div>
      <div className={[styles['bottom-bar-container-mobile']].join(' ')}>
        <div className={[styles['bottom-bar-mobile']].join(' ')}>
          <div
            className={[
              styles['shopping-cart-container'],
              styles['shopping-cart-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['shopping-cart-container-details'],
                styles['shopping-cart-container-details-mobile'],
              ].join(' ')}
            >
              <Skeleton style={{ width: 56, height: 56 }} borderRadius={40} />
            </div>
          </div>
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['left-tab-container'],
                styles['left-tab-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['tab-button-container'],
                  styles['tab-button-container-mobile'],
                ].join(' ')}
              >
                <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
              </div>
              <div
                className={[
                  styles['tab-button-container'],
                  styles['tab-button-container-mobile'],
                ].join(' ')}
              >
                <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
              </div>
            </div>
            <div
              className={[
                styles['right-tab-container'],
                styles['right-tab-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['tab-button-container'],
                  styles['tab-button-container-mobile'],
                ].join(' ')}
              >
                <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
              </div>
              <div
                className={[
                  styles['tab-button-container'],
                  styles['tab-button-container-mobile'],
                ].join(' ')}
              >
                <Skeleton style={{ width: 40, height: 40 }} borderRadius={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
