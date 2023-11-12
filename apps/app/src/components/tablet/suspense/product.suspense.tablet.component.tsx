import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
  ResponsiveSuspenseDesktop,
  ResponsiveSuspenseTablet,
} from '../../../components/responsive.component';

export function ProductSuspenseTabletComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['content-container'],
            styles['content-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['thumbnail-container'],
              styles['thumbnail-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['thumbnail-image-skeleton'],
                styles['thumbnail-image-skeleton-tablet'],
              ].join(' ')}
            />
          </div>
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-tablet'],
            styles['middle-content'],
            styles['middle-content-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['header-container'],
              styles['header-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-tablet'],
              ].join(' ')}
            >
              <Skeleton
                count={1}
                borderRadius={9999}
                className={[
                  styles['title-skeleton'],
                  styles['title-skeleton-tablet'],
                ].join(' ')}
              />
            </div>
            {/* <div className={styles['like-container-tablet']}>
                <div className={styles['like-count-tablet']}>{productProps.likeCount}</div>
                <Button
                  rippleProps={{
                    color: !productProps.isLiked
                      ? 'rgba(233, 33, 66, .35)'
                      : 'rgba(42, 42, 95, .35)',
                  }}
                  rounded={true}
                  onClick={() => ProductController.updateIsLiked(!productProps.isLiked)}
                  type={'text'}
                  icon={
                    productProps.isLiked ? (
                      <Line.Favorite size={24} color={'#E92142'} />
                    ) : (
                      <Line.FavoriteBorder size={24} color={'#2A2A5F'} />
                    )
                  }
                />
              </div> */}
          </div>
          <div
            className={[
              styles['description-container'],
              styles['description-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              count={16}
              borderRadius={9999}
              className={[
                styles['skeleton-description'],
                styles['skeleton-description-tablet'],
              ].join(' ')}
            />
          </div>
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-tablet'],
            styles['right-content'],
            styles['right-content-tablet'],
          ].join(' ')}
        >
          <div className={[styles['price'], styles['price-tablet']].join(' ')}>
            <Skeleton
              className={[
                styles['inventory-quantity'],
                styles['inventory-quantity-tablet'],
              ].join(' ')}
              borderRadius={9999}
              count={1}
            />
          </div>
          <div
            className={[
              styles['tags-container'],
              styles['tags-container-tablet'],
            ].join(' ')}
          >
            {[1, 2, 3, 4].map(() => (
              <Skeleton
                className={[
                  styles['tag-skeleton'],
                  styles['tag-skeleton-tablet'],
                ].join(' ')}
                borderRadius={9999}
              />
            ))}
          </div>
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-tablet'],
              ].join(' ')}
            />
            <div
              className={[
                styles['options-container'],
                styles['options-container-tablet'],
              ].join(' ')}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['option-title-skeleton'],
                      styles['option-title-skeleton-tablet'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['option-value-skeleton'],
                      styles['option-value-skeleton-tablet'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                </div>
              ))}
            </div>
          </div>
          <Skeleton
            className={[
              styles['add-to-cart-button-skeleton'],
              styles['add-to-cart-button-skeleton-tablet'],
            ].join(' ')}
          />
          <Skeleton
            className={[
              styles['add-to-cart-button-skeleton'],
              styles['add-to-cart-button-skeleton-tablet'],
            ].join(' ')}
          />
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-tablet'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-tablet'],
              ].join(' ')}
            />
            <div
              className={[
                styles['details-container'],
                styles['details-container-tablet'],
              ].join(' ')}
            >
              {[1, 2, 3, 4, 5, 6].map(() => (
                <div
                  className={[
                    styles['details-item-content'],
                    styles['details-item-content-tablet'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['details-title-skeleton'],
                      styles['details-title-skeleton-tablet'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['details-value-skeleton'],
                      styles['details-value-skeleton-tablet'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseTablet>
  );
}
