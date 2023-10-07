import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseDesktop } from 'src/components/responsive.component';

export function ProductSuspenseDesktopComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['content-container'],
            styles['content-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['thumbnail-container'],
              styles['thumbnail-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['thumbnail-image-skeleton'],
                styles['thumbnail-image-skeleton-desktop'],
              ].join(' ')}
            />
          </div>
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-desktop'],
            styles['middle-content'],
            styles['middle-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['header-container'],
              styles['header-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-desktop'],
              ].join(' ')}
            >
              <Skeleton
                count={1}
                borderRadius={9999}
                className={[
                  styles['title-skeleton'],
                  styles['title-skeleton-desktop'],
                ].join(' ')}
              />
            </div>
            {/* <div className={styles['like-container-desktop']}>
                <div className={styles['like-count-desktop']}>{productProps.likeCount}</div>
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
              styles['description-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              count={16}
              borderRadius={9999}
              className={[
                styles['skeleton-description'],
                styles['skeleton-description-desktop'],
              ].join(' ')}
            />
          </div>
        </div>
        <div
          className={[
            styles['content-container'],
            styles['content-container-desktop'],
            styles['right-content'],
            styles['right-content-desktop'],
          ].join(' ')}
        >
          <div className={[styles['price'], styles['price-desktop']].join(' ')}>
            <Skeleton
              className={[
                styles['inventory-quantity'],
                styles['inventory-quantity-desktop'],
              ].join(' ')}
              borderRadius={9999}
              count={1}
            />
          </div>
          <div
            className={[
              styles['tags-container'],
              styles['tags-container-desktop'],
            ].join(' ')}
          >
            {[1, 2, 3, 4].map(() => (
              <Skeleton
                className={[
                  styles['tag-skeleton'],
                  styles['tag-skeleton-desktop'],
                ].join(' ')}
                borderRadius={9999}
              />
            ))}
          </div>
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-desktop'],
              ].join(' ')}
            />
            <div
              className={[
                styles['options-container'],
                styles['options-container-desktop'],
              ].join(' ')}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['option-title-skeleton'],
                      styles['option-title-skeleton-desktop'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['option-value-skeleton'],
                      styles['option-value-skeleton-desktop'],
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
              styles['add-to-cart-button-skeleton-desktop'],
            ].join(' ')}
          />
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-desktop'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-desktop'],
              ].join(' ')}
            />
            <div
              className={[
                styles['details-container'],
                styles['details-container-desktop'],
              ].join(' ')}
            >
              {[1, 2, 3, 4, 5, 6].map(() => (
                <div
                  className={[
                    styles['details-item-content'],
                    styles['details-item-content-desktop'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['details-title-skeleton'],
                      styles['details-title-skeleton-desktop'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['details-value-skeleton'],
                      styles['details-value-skeleton-desktop'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseDesktop>
  );
}
