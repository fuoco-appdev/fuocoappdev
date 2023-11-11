import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../order-confirmed.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseTablet,
} from '../../responsive.component';
import { ShippingItemSuspenseTabletComponent } from './shipping-item.suspense.tablet.component';

export function OrderConfirmedSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['left-content'],
            styles['left-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-container'],
              styles['card-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['thankyou-text'],
                styles['thankyou-text-tablet'],
              ].join(' ')}
              width={260}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['order-number-text'],
                styles['order-number-text-tablet'],
              ].join(' ')}
              width={80}
              borderRadius={20}
            />
            <Skeleton
              className={[
                styles['order-id-text'],
                styles['order-id-text-tablet'],
              ].join(' ')}
              width={180}
              borderRadius={20}
            />
            <div
              className={[
                styles['date-container'],
                styles['date-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['date-content'],
                  styles['date-content-tablet'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['date-text'],
                    styles['date-text-tablet'],
                  ].join(' ')}
                  width={180}
                  borderRadius={20}
                />
                <Skeleton
                  className={[
                    styles['item-count-text'],
                    styles['item-count-text-tablet'],
                  ].join(' ')}
                  width={40}
                  borderRadius={20}
                />
              </div>
              <div>
                <Skeleton width={80} height={28} />
              </div>
            </div>
            <div
              className={[
                styles['shipping-items'],
                styles['shipping-items-tablet'],
              ].join(' ')}
            >
              {[1, 2].map(() => (
                <ShippingItemSuspenseTabletComponent />
              ))}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['right-content'],
            styles['right-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-container'],
              styles['card-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container-skeleton'],
                  styles['header-container-skeleton-tablet'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['header-title'],
                    styles['header-title-tablet'],
                  ].join(' ')}
                  width={120}
                  borderRadius={20}
                />
              </div>
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
                width={180}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
              <Skeleton
                className={styles['detail-text']}
                width={180}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container-skeleton'],
                  styles['header-container-skeleton-tablet'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['header-title'],
                    styles['header-title-tablet'],
                  ].join(' ')}
                  width={120}
                  borderRadius={20}
                />
              </div>
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['subheader-title'],
                  styles['subheader-title-tablet'],
                ].join(' ')}
                width={120}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['detail-text'],
                  styles['detail-text-tablet'],
                ].join(' ')}
                width={140}
                borderRadius={20}
              />
            </div>
          </div>
          <div
            className={[
              styles['card-container'],
              styles['card-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['content-container'],
                styles['content-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['header-container-skeleton'],
                  styles['header-container-skeleton-tablet'],
                ].join(' ')}
              >
                <Skeleton
                  className={[
                    styles['header-title'],
                    styles['header-title-tablet'],
                  ].join(' ')}
                  width={140}
                  borderRadius={20}
                />
              </div>
              <div
                className={[
                  styles['pricing-container'],
                  styles['pricing-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['subtotal-container'],
                    styles['subtotal-container-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['subtotal-text'],
                      styles['subtotal-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-detail-container'],
                    styles['total-detail-container-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-detail-text'],
                      styles['total-detail-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
                <div
                  className={[
                    styles['total-container'],
                    styles['total-container-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['total-text'],
                      styles['total-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                  <Skeleton
                    className={[
                      styles['total-text'],
                      styles['total-text-tablet'],
                    ].join(' ')}
                    width={140}
                    borderRadius={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
