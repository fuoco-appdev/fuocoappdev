import {
  Key,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
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
import { ResponsiveMobile } from '../responsive.component';

export default function ProductPreviewMobileComponent({
  accountProps,
  parentRef,
  preview,
  onClick,
  onRest,
  originalPrice,
  calculatedPrice,
  selectedVariantId,
  likeCount,
  isLiked,
  onAddToCart,
  onLikeChanged,
  formatNumberCompact,
}: ProductPreviewResponsiveProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, api] = useSpring(() => ({
    from: {
      top: ref?.current?.getBoundingClientRect().top,
      left: ref?.current?.getBoundingClientRect().left,
      height: 200,
      width: ref?.current?.clientWidth ?? 0,
      borderRadius: 0,
    },
    to: {
      top: 0,
      left: 0,
      height: window.innerHeight,
      width: window.innerWidth,
      borderRadius: 0,
    },
    config: {
      tension: 1000,
      friction: 55,
      bounce: 0,
    },
  }));

  useLayoutEffect(() => {
    let borderRadius: string | null = null;
    if (ref?.current) {
      borderRadius = window
        .getComputedStyle(ref?.current)
        .getPropertyValue('border-radius')
        .replace(/[^\d.]/g, '');
    }
    const parentRect = parentRef?.current?.getBoundingClientRect();
    const rect = ref?.current?.getBoundingClientRect();
    api.start({
      top: expanded
        ? parentRef?.current?.getBoundingClientRect().top
        : rect?.top,
      left: expanded
        ? parentRef?.current?.getBoundingClientRect().left
        : rect?.left,
      height: expanded ? parentRect?.height : rect?.height ?? 0,
      width: expanded ? parentRect?.left : rect?.width ?? 0,
      borderRadius: expanded ? 0 : Number(borderRadius ?? 0),
      onRest: () => {
        if (expanded) {
          onRest?.();
        }
      },
    });
  }, [expanded]);

  return (
    <ResponsiveMobile>
      <Card
        ref={ref}
        classNames={{
          container: [styles['root'], styles['root-mobile']].join(' '),
          card: [styles['card'], styles['card-mobile']].join(' '),
        }}
        rippleProps={{
          color: 'rgba(133, 38, 122, .35)',
        }}
        clickable={true}
        onClick={() => {
          onClick?.();
          setTimeout(() => setExpanded(true), 75);
        }}
      >
        <animated.div
          className={[
            styles['animated-root'],
            styles['animated-root-mobile'],
          ].join(' ')}
          style={{
            ...style,
            position: expanded ? 'fixed' : 'initial',
            zIndex: expanded ? 1 : 0,
          }}
        >
          <div
            className={[
              styles['thumbnail-container'],
              styles['thumbnail-container-mobile'],
            ].join(' ')}
            style={{ height: expanded ? '100%' : 'calc(100% - 38px)' }}
          >
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-mobile'],
              ].join(' ')}
              src={preview.thumbnail || '../assets/svg/wine-bottle.svg'}
            />
            <div
              className={[
                styles['thumbnail-content-container'],
                styles['thumbnail-content-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['thumbnail-top-content'],
                  styles['thumbnail-top-content-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['label-container'],
                    styles['label-container-mobile'],
                  ].join(' ')}
                >
                  {originalPrice !== calculatedPrice && (
                    <div
                      className={[
                        styles['calculated-price'],
                        styles['calculated-price-mobile'],
                      ].join(' ')}
                    >
                      {calculatedPrice}
                    </div>
                  )}
                </div>
                <div
                  className={[
                    styles['status-content-container'],
                    styles['status-content-container-mobile'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['like-status-container'],
                      styles['like-status-container-mobile'],
                    ].join(' ')}
                  >
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
                      touchScreen={true}
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
                        styles['like-status-count-mobile'],
                      ].join(' ')}
                    >
                      {formatNumberCompact(likeCount)}
                    </div>
                  </div>
                </div>
              </div>
              {!expanded && (
                <div
                  className={[
                    styles['thumbnail-bottom-content'],
                    styles['thumbnail-bottom-content-mobile'],
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
              )}
            </div>
          </div>
          {!expanded && (
            <div
              className={[
                styles['bottom-bar'],
                styles['bottom-bar-mobile'],
              ].join(' ')}
            >
              <span
                className={[
                  styles['product-title'],
                  styles['product-title-mobile'],
                ].join(' ')}
              >
                {preview.title}
              </span>
              {originalPrice.length > 0 ? (
                <span
                  className={[
                    styles['product-price'],
                    styles['product-price-mobile'],
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
                    styles['product-limit-icon-mobile'],
                  ].join(' ')}
                >
                  <Line.ProductionQuantityLimits size={20} />
                </div>
              )}
            </div>
          )}
        </animated.div>
      </Card>
    </ResponsiveMobile>
  );
}
