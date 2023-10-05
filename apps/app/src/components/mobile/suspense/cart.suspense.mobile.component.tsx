import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../cart.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { CartItemSuspenseMobileComponent } from './cart-item.suspense.mobile.component';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function CartSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['account-container'],
            styles['account-container-mobile'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['already-have-an-account-title'],
              styles['already-have-an-account-title-mobile'],
            ].join(' ')}
            width={156}
            borderRadius={20}
          />
          <Skeleton
            className={[
              styles['already-have-an-account-description'],
              styles['already-have-an-account-description-mobile'],
            ].join(' ')}
            width={400}
            borderRadius={20}
          />
          <div
            className={[
              styles['sign-in-button-container'],
              styles['sign-in-button-container-mobile'],
            ].join(' ')}
          >
            <Skeleton width={96} height={48} borderRadius={6} />
          </div>
        </div>
        <div
          className={[
            styles['shopping-cart-container'],
            styles['shopping-cart-container-mobile'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['shopping-cart-title-skeleton'],
              styles['shopping-cart-title-skeleton-mobile'],
            ].join(' ')}
            width={156}
            borderRadius={20}
          />
          <div
            className={[
              styles['shopping-cart-items'],
              styles['shopping-cart-items-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['tabs-container-skeleton'],
                styles['tabs-container-skeleton-mobile'],
              ].join(' ')}
            >
              <Skeleton style={{ height: 36, width: 100 }} borderRadius={36} />
              <Skeleton style={{ height: 36, width: 100 }} borderRadius={36} />
            </div>
            {[1, 2].map(() => (
              <CartItemSuspenseMobileComponent />
            ))}
          </div>
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
            styles['discount-container'],
            styles['discount-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['discount-input-container'],
              styles['discount-input-container-mobile'],
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
        <div
          className={[
            styles['go-to-checkout-container'],
            styles['go-to-checkout-container-mobile'],
          ].join(' ')}
        >
          <Skeleton height={48} borderRadius={6} />
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
