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
import { Button, Card, Line } from '@fuoco.appdev/core-ui';
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

export default function ProductPreviewDesktopComponent({
  preview,
  onClick,
  price,
  selectedVariantId,
  addToCartAsync,
  onRest,
}: ProductPreviewResponsiveProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const formatDescription = (description: string): string => {
    const regex = /\*\*(.*?)\*\*/g;
    const cleanDescription = description.trim();
    const descriptionWithoutTitles = cleanDescription.replace(regex, '');
    return descriptionWithoutTitles;
  };

  return (
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
          src={preview.thumbnail || '../assets/svg/wine-bottle.svg'}
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
          ></div>
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
              {preview.title}
            </span>
            {preview.subtitle && (
              <div
                className={[
                  styles['product-subtitle'],
                  styles['product-subtitle-desktop'],
                ].join(' ')}
              >
                {preview.subtitle}
              </div>
            )}
          </div>
          {price.length > 0 ? (
            <span
              className={[
                styles['product-price'],
                styles['product-price-desktop'],
              ].join(' ')}
            >
              {price}
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
            {preview.description &&
              preview.description?.length > 0 &&
              formatDescription(
                `${preview.description?.slice(0, 205)}${
                  preview.description.length > 205 ? '...' : ''
                }`
              )}
          </div>
          <div
            className={[
              styles['product-status-actions-container'],
              styles['product-status-actions-container-desktop'],
            ].join(' ')}
          >
            {selectedVariantId && (
              <Button
                classNames={{ button: styles['floating-button'] }}
                rippleProps={{
                  color: 'rgba(133, 38, 122, .35)',
                }}
                rounded={true}
                onClick={addToCartAsync}
                icon={<Line.AddShoppingCart size={24} />}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
