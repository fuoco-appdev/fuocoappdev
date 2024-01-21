import {
  Key,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  lazy,
} from 'react';
import styles from '../product-preview.module.scss';
import { MoneyAmount, Product, LineItem } from '@medusajs/medusa';
import { Button, Card, Line, Solid } from '@fuoco.appdev/core-ui';
import { animated, useSpring } from 'react-spring';
import i18n from '../../i18n';
import ProductController from '../../controllers/product.controller';
import StoreController from '../../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../../controllers/window.controller';
import { useTranslation } from 'react-i18next';
import CartController from '../../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { ProductPreviewResponsiveProps } from '../product-preview.component';
import { ResponsiveDesktop } from '../responsive.component';
import Skeleton from 'react-loading-skeleton';

export default function ProductPreviewDesktopComponent({
  thumbnail,
  title,
  subtitle,
  description,
  likesMetadata,
  pricedProduct,
  accountProps,
  onClick,
  originalPrice,
  calculatedPrice,
  selectedVariantId,
  isLiked,
  likeCount,
  onAddToCart,
  onRest,
  onLikeChanged,
  formatNumberCompact,
}: ProductPreviewResponsiveProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const formatDescription = (description: string): string => {
    const regex = /\*\*(.*?)\*\*/g;
    const cleanDescription = description.trim();
    const descriptionWithoutTitles = cleanDescription.replace(regex, '');
    return descriptionWithoutTitles;
  };

  return (
    <ResponsiveDesktop>
      <Card
        ref={ref}
        classNames={{
          container: [styles['root'], styles['root-desktop']].join(' '),
          card: [styles['card'], styles['card-desktop']].join(' '),
        }}
        rippleProps={{
          color: 'rgba(133, 38, 122, .35)',
        }}
        hoverable={true}
        clickable={true}
        onClick={() => {
          onClick?.();
          setTimeout(() => onRest?.(), 200);
        }}
      >
        <div
          className={[
            styles['thumbnail-container'],
            styles['thumbnail-container-desktop'],
          ].join(' ')}
        >
          <img
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-desktop'],
            ].join(' ')}
            src={thumbnail ?? '../assets/images/wine-bottle.png'}
          />
          <div
            className={[
              styles['thumbnail-content-container'],
              styles['thumbnail-content-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['thumbnail-top-content'],
                styles['thumbnail-top-content-desktop'],
              ].join(' ')}
            >
              {originalPrice !== calculatedPrice && (
                <div
                  className={[
                    styles['calculated-price'],
                    styles['calculated-price-desktop'],
                  ].join(' ')}
                >
                  {calculatedPrice}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={[
            styles['bottom-content'],
            styles['bottom-content-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['bottom-top-content'],
              styles['bottom-top-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['product-title-container'],
                styles['product-title-container-desktop'],
              ].join(' ')}
            >
              <span
                className={[
                  styles['product-title'],
                  styles['product-title-desktop'],
                ].join(' ')}
              >
                {title}
              </span>
              {subtitle && (
                <div
                  className={[
                    styles['product-subtitle'],
                    styles['product-subtitle-desktop'],
                  ].join(' ')}
                >
                  {subtitle}
                </div>
              )}
            </div>
            {originalPrice.length > 0 ? (
              <span
                className={[
                  styles['product-price'],
                  styles['product-price-desktop'],
                  originalPrice !== calculatedPrice &&
                    styles['product-price-crossed'],
                ].join(' ')}
              >
                {originalPrice}
              </span>
            ) : (
              <div
                className={[
                  styles['product-limit-icon'],
                  styles['product-limit-icon-desktop'],
                ].join(' ')}
              >
                <Line.ProductionQuantityLimits size={20} />
              </div>
            )}
          </div>
          <div
            className={[
              styles['product-details-container'],
              styles['product-details-container-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['product-description'],
                styles['product-description-desktop'],
              ].join(' ')}
            >
              {description &&
                description?.length > 0 &&
                formatDescription(
                  `${description?.slice(0, 205)}${
                    description.length > 205 ? '...' : ''
                  }`
                )}
            </div>
            <div
              className={[
                styles['product-status-actions-container'],
                styles['product-status-actions-container-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['status-content-container'],
                  styles['status-content-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['like-status-container'],
                    styles['like-status-container-desktop'],
                  ].join(' ')}
                >
                  {likesMetadata && (
                    <>
                      <Button
                        classNames={{
                          container: styles['like-button-container'],
                          button: styles['like-button'],
                        }}
                        rippleProps={{
                          color: !isLiked
                            ? 'rgba(233, 33, 66, .35)'
                            : 'rgba(42, 42, 95, .35)',
                        }}
                        disabled={
                          !accountProps.account ||
                          accountProps.account.status === 'Incomplete'
                        }
                        rounded={true}
                        onClick={() => onLikeChanged?.(!isLiked)}
                        type={'text'}
                        icon={
                          isLiked ? (
                            <Line.Favorite size={24} color={'#E92142'} />
                          ) : (
                            <Line.FavoriteBorder size={24} color={'#2A2A5F'} />
                          )
                        }
                      />
                      <div
                        className={[
                          styles['like-status-count'],
                          styles['like-status-count-desktop'],
                        ].join(' ')}
                      >
                        {formatNumberCompact(likeCount)}
                      </div>
                    </>
                  )}
                  {!likesMetadata && (
                    <>
                      <Skeleton
                        className={[
                          styles['like-status-button-skeleton'],
                          styles['like-status-button-skeleton-desktop'],
                        ].join(' ')}
                      />
                      <Skeleton
                        borderRadius={9999}
                        className={[
                          styles['like-status-count-skeleton'],
                          styles['like-status-count-skeleton-desktop'],
                        ].join(' ')}
                      />
                    </>
                  )}
                </div>
              </div>
              {pricedProduct && selectedVariantId && (
                <Button
                  classNames={{ button: styles['floating-button'] }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  rounded={true}
                  onClick={onAddToCart}
                  icon={<Line.AddShoppingCart size={24} />}
                />
              )}
              {!pricedProduct && (
                <Skeleton width={46} height={46} borderRadius={46} />
              )}
            </div>
          </div>
        </div>
      </Card>
    </ResponsiveDesktop>
  );
}
