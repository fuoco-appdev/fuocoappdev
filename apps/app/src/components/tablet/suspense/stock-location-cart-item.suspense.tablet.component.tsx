import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../stock-location-cart-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from '../../responsive.component';

export function StockLocationCartItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop inheritStyles={false}>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['container'], styles['container-tablet']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-tablet']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-tablet'],
              ].join(' ')}
            >
              <Skeleton width={40} height={40} borderRadius={40} />
              <div
                className={[styles['title'], styles['title-tablet']].join(' ')}
              >
                <Skeleton width={140} borderRadius={20} />
              </div>
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-tablet'],
                ].join(' ')}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
