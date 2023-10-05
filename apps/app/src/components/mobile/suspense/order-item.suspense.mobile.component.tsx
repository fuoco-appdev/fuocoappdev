import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../order-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function OrderItemSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['container'], styles['container-mobile']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-mobile']].join(' ')}
          >
            <div
              className={[styles['thumbnail'], styles['thumbnail-mobile']].join(
                ' '
              )}
            >
              <Skeleton
                className={[
                  styles['thumbnail-image'],
                  styles['thumbnail-image-mobile'],
                ].join(' ')}
                width={56}
                height={56}
              />
            </div>
            <div
              className={[
                styles['title-container'],
                styles['title-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[styles['title'], styles['title-mobile']].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[styles['status'], styles['status-mobile']].join(
                  ' '
                )}
                width={80}
                borderRadius={20}
              />
              <Skeleton
                className={[styles['status'], styles['status-mobile']].join(
                  ' '
                )}
                width={80}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['right-details-container'],
                styles['right-details-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['right-details-content'],
                  styles['right-details-content-mobile'],
                ].join(' ')}
              >
                <Skeleton
                  className={[styles['pricing'], styles['pricing-mobile']].join(
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
    </ResponsiveSuspenseMobile>
  );
}
