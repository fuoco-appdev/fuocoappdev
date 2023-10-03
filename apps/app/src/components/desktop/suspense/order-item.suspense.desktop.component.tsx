import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../order-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function OrderItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div
        className={[styles['container'], styles['container-desktop']].join(' ')}
      >
        <div
          className={[styles['details'], styles['details-desktop']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-desktop']].join(
              ' '
            )}
          >
            <Skeleton
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              width={56}
              height={56}
            />
          </div>
          <div
            className={[
              styles['title-container'],
              styles['title-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[styles['title'], styles['title-desktop']].join(' ')}
              width={140}
              borderRadius={20}
            />
            <Skeleton
              className={[styles['status'], styles['status-desktop']].join(' ')}
              width={80}
              borderRadius={20}
            />
            <Skeleton
              className={[styles['status'], styles['status-desktop']].join(' ')}
              width={80}
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
              <Skeleton
                className={[styles['pricing'], styles['pricing-desktop']].join(
                  ' '
                )}
                width={40}
                borderRadius={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
