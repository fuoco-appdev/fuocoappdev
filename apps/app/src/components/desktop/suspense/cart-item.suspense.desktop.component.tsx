import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../cart-item.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function CartItemSuspenseDesktopComponent(): JSX.Element {
  return (
    <div
      className={[styles['container'], styles['container-desktop']].join(' ')}
    >
      <div className={[styles['details'], styles['details-desktop']].join(' ')}>
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
            className={[styles['variant'], styles['variant-desktop']].join(' ')}
            width={80}
            borderRadius={20}
          />
        </div>
        <div
          className={[
            styles['quantity-details-container'],
            styles['quantity-details-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['quantity-container'],
              styles['quantity-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['quantity-text'],
                styles['quantity-text-desktop'],
              ].join(' ')}
              width={80}
              borderRadius={20}
            />
            <div
              className={[
                styles['quantity-buttons'],
                styles['quantity-buttons-desktop'],
              ].join(' ')}
            >
              <Skeleton height={28} width={28} borderRadius={24} />
              <Skeleton
                className={[
                  styles['quantity'],
                  styles['quantity-desktop'],
                ].join(' ')}
                width={40}
                borderRadius={20}
              />
              <Skeleton height={28} width={28} borderRadius={24} />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['remove-container'],
            styles['remove-container-desktop'],
          ].join(' ')}
        >
          <Skeleton height={40} width={40} borderRadius={40} />
        </div>
      </div>
      <div
        className={[
          styles['pricing-details-container'],
          styles['pricing-details-container-desktop'],
        ].join(' ')}
      >
        <Skeleton
          className={[styles['pricing'], styles['pricing-desktop']].join(' ')}
          width={40}
          borderRadius={20}
        />
      </div>
    </div>
  );
}
