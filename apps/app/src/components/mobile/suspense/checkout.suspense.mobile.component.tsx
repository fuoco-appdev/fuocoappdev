import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../checkout.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';
import { AddressFormSuspenseMobileComponent } from './address-form.suspense.mobile.component';

export function CheckoutSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container-skeleton'],
                styles['header-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton width={32} height={32} borderRadius={32} />
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
            <AddressFormSuspenseMobileComponent />
            <div
              className={[
                styles['checkbox-container-skeleton'],
                styles['checkbox-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton width={24} height={24} borderRadius={4} />
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
            <div className={styles['submit-button-container']}>
              <Skeleton height={48} borderRadius={6} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container-skeleton'],
                styles['header-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton width={32} height={32} borderRadius={32} />
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
            <Skeleton
              className={[
                styles['card-description'],
                styles['card-description-mobile'],
              ].join(' ')}
              width={250}
              borderRadius={20}
            />
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container-skeleton'],
                styles['header-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['apply-card-container'],
                styles['apply-card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['apply-card-input-container'],
                  styles['apply-card-input-container-mobile'],
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
              </div>
              <div
                className={[
                  styles['apply-button-container-skeleton'],
                  styles['apply-button-container-skeleton-mobile'],
                ].join(' ')}
              >
                <Skeleton width={96} height={44} borderRadius={6} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container-skeleton'],
                styles['header-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['apply-card-container'],
                styles['apply-card-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['apply-card-input-container'],
                  styles['apply-card-input-container-mobile'],
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
              </div>
              <div
                className={[
                  styles['apply-button-container-skeleton'],
                  styles['apply-button-container-skeleton-mobile'],
                ].join(' ')}
              >
                <Skeleton width={96} height={44} borderRadius={6} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={[
            styles['card-container'],
            styles['card-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['card-content-container'],
              styles['card-content-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['header-container-skeleton'],
                styles['header-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
            <Skeleton
              className={[
                styles['card-description'],
                styles['card-description-mobile'],
              ].join(' ')}
              width={250}
              borderRadius={20}
            />
          </div>
          <div
            className={[
              styles['pricing-container'],
              styles['pricing-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['subtotal-container'],
                styles['subtotal-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['subtotal-text'],
                  styles['subtotal-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['subtotal-text'],
                  styles['subtotal-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-detail-container'],
                styles['total-detail-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-detail-text'],
                  styles['total-detail-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
            </div>
            <div
              className={[
                styles['total-container-skeleton'],
                styles['total-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton
                className={[
                  styles['total-text'],
                  styles['total-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
              <Skeleton
                className={[
                  styles['total-text'],
                  styles['total-text-mobile'],
                ].join(' ')}
                width={62}
                borderRadius={20}
              />
            </div>
          </div>
          <div
            className={[
              styles['is-legal-age-container'],
              styles['is-legal-age-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['checkbox-container-skeleton'],
                styles['checkbox-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton width={24} height={24} borderRadius={4} />
              <Skeleton
                className={[
                  styles['header-title'],
                  styles['header-title-mobile'],
                ].join(' ')}
                width={156}
                borderRadius={20}
              />
            </div>
          </div>
          <div
            className={[
              styles['pay-button-container'],
              styles['pay-button-container-mobile'],
            ].join(' ')}
          >
            <Skeleton height={48} borderRadius={6} />
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
