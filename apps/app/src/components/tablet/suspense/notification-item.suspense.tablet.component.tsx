import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../notification-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseMobile,
  ResponsiveSuspenseTablet,
} from '../../../components/responsive.component';

export function NotificationItemSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['details'], styles['details-tablet']].join(' ')}
        >
          <div
            className={[styles['thumbnail'], styles['thumbnail-tablet']].join(
              ' '
            )}
          >
            <Skeleton
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-tablet'],
              ].join(' ')}
              width={40}
              height={40}
              borderRadius={40}
            />
          </div>
          <div
            className={[
              styles['message-container'],
              styles['message-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[styles['message'], styles['message-tablet']].join(
                ' '
              )}
              width={140}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['message-date'],
                styles['message-date-tablet'],
              ].join(' ')}
              width={80}
              borderRadius={14}
            />
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-tablet'],
          ].join(' ')}
        >
          <Skeleton style={{ width: 80, height: 38 }} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
