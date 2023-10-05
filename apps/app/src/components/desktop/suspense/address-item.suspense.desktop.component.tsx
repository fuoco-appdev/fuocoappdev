import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../address-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function AddressItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[styles['container'], styles['container-desktop']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-desktop']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-desktop'],
              ].join(' ')}
            >
              <Skeleton
                className={[styles['title'], styles['title-desktop']].join(' ')}
                width={200}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['subtitle'],
                  styles['subtitle-desktop'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-desktop'],
                ].join(' ')}
              >
                <div>
                  <Skeleton
                    style={{ width: 40, height: 40 }}
                    borderRadius={40}
                  />
                </div>
                <div>
                  <Skeleton
                    style={{ width: 40, height: 40 }}
                    borderRadius={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
