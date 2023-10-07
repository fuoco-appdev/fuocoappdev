import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../product.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ResponsiveSuspenseMobile } from 'src/components/responsive.component';

export function ProductSuspenseMobileComponent(): JSX.Element {
  return (
    <ResponsiveSuspenseMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['thumbnail-container'],
            styles['thumbnail-container-mobile'],
          ].join(' ')}
        >
          <Skeleton
            className={[
              styles['thumbnail-image-skeleton'],
              styles['thumbnail-image-skeleton-mobile'],
            ].join(' ')}
          />
        </div>
        <div
          className={[styles['content'], styles['content-mobile']].join(' ')}
        >
          <div
            className={[
              styles['header-container'],
              styles['header-container-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-mobile'],
              ].join(' ')}
            >
              <Skeleton
                count={1}
                borderRadius={9999}
                className={[
                  styles['title-skeleton'],
                  styles['title-skeleton-mobile'],
                ].join(' ')}
              />
            </div>
            {/* <div className={styles['like-container-mobile']}>
              <div className={styles['like-count-mobile']}>{productProps.likeCount}</div>
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
              styles['description-container-mobile'],
            ].join(' ')}
          >
            <Skeleton
              count={6}
              borderRadius={9999}
              className={[
                styles['skeleton-description'],
                styles['skeleton-description-mobile'],
              ].join(' ')}
            />
          </div>
          <div className={[styles['price'], styles['price-mobile']].join(' ')}>
            <Skeleton
              className={[
                styles['inventory-quantity'],
                styles['inventory-quantity-mobile'],
              ].join(' ')}
              borderRadius={9999}
              count={1}
            />
          </div>
          <div
            className={[
              styles['tags-container'],
              styles['tags-container-mobile'],
            ].join(' ')}
          >
            {[1, 2, 3, 4].map(() => (
              <Skeleton
                className={[
                  styles['tag-skeleton'],
                  styles['tag-skeleton-mobile'],
                ].join(' ')}
                borderRadius={9999}
              />
            ))}
          </div>
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-mobile'],
              ].join(' ')}
            />
            <div
              className={[
                styles['options-container'],
                styles['options-container-mobile'],
              ].join(' ')}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <div
                  className={[
                    styles['option-content'],
                    styles['option-content-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['option-title-skeleton'],
                      styles['option-title-skeleton-mobile'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['option-value-skeleton'],
                      styles['option-value-skeleton-mobile'],
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
              styles['add-to-cart-button-skeleton-mobile'],
            ].join(' ')}
          />
          <div
            className={[
              styles['tab-container'],
              styles['tab-container-mobile'],
            ].join(' ')}
          >
            <Skeleton
              className={[
                styles['tabs-skeleton'],
                styles['tabs-skeleton-mobile'],
              ].join(' ')}
            />
            <div
              className={[
                styles['details-container'],
                styles['details-container-mobile'],
              ].join(' ')}
            >
              {[1, 2, 3, 4, 5, 6].map(() => (
                <div
                  className={[
                    styles['details-item-content'],
                    styles['details-item-content-mobile'],
                  ].join(' ')}
                >
                  <Skeleton
                    className={[
                      styles['details-title-skeleton'],
                      styles['details-title-skeleton-mobile'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                  <Skeleton
                    className={[
                      styles['details-value-skeleton'],
                      styles['details-value-skeleton-mobile'],
                    ].join(' ')}
                    borderRadius={9999}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveSuspenseMobile>
  );
}
