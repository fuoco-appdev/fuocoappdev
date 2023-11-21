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
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';

export default function ProductPreviewTabletComponent({
  preview,
  onClick,
  originalPrice,
  calculatedPrice,
  selectedVariantId,
  onAddToCart,
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
    <ResponsiveTablet>
      <Card
        ref={ref}
        classNames={{
          container: [styles['root'], styles['root-tablet']].join(' '),
          card: [styles['card'], styles['card-tablet']].join(' '),
        }}
        rippleProps={{
          color: 'rgba(133, 38, 122, .35)',
        }}
        clickable={true}
        onClick={() => {
          onClick?.();
          setTimeout(() => onRest?.(), 200);
        }}
      >
        <div
          className={[
            styles['thumbnail-container'],
            styles['thumbnail-container-tablet'],
          ].join(' ')}
          style={{ height: 'calc(100% - 38px)' }}
        >
          <img
            className={[
              styles['thumbnail-image'],
              styles['thumbnail-image-tablet'],
            ].join(' ')}
            src={preview.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
          <div
            className={[
              styles['thumbnail-content-container'],
              styles['thumbnail-content-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['thumbnail-top-content'],
                styles['thumbnail-top-content-tablet'],
              ].join(' ')}
            >
              {originalPrice !== calculatedPrice && (
                <div
                  className={[
                    styles['calculated-price'],
                    styles['calculated-price-tablet'],
                  ].join(' ')}
                >
                  {calculatedPrice}
                </div>
              )}
            </div>
            <div
              className={[
                styles['thumbnail-bottom-content'],
                styles['thumbnail-bottom-content-tablet'],
              ].join(' ')}
            >
              {selectedVariantId && (
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
            </div>
          </div>
        </div>
        <div
          className={[styles['bottom-bar'], styles['bottom-bar-tablet']].join(
            ' '
          )}
        >
          <span
            className={[
              styles['product-title'],
              styles['product-title-tablet'],
            ].join(' ')}
          >
            {preview.title}
          </span>
          {originalPrice.length > 0 ? (
            <span
              className={[
                styles['product-price'],
                styles['product-price-tablet'],
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
                styles['product-limit-icon-tablet'],
              ].join(' ')}
            >
              <Line.ProductionQuantityLimits size={20} />
            </div>
          )}
        </div>
      </Card>
    </ResponsiveTablet>
  );
}
