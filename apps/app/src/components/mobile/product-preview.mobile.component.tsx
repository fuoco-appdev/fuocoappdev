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
import Skeleton from 'react-loading-skeleton';
import { MedusaProductTypeNames } from '../../types/medusa.type';
import { config } from '@react-spring/web';
import { easings } from '@react-spring/web';

export default function ProductPreviewMobileComponent({
  thumbnail,
  title,
  subtitle,
  description,
  type,
  isLoading,
  likesMetadata,
  pricedProduct,
  accountProps,
  purchasable,
  parentRef,
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
  formatDescription,
}: ProductPreviewResponsiveProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, api] = useSpring(() => ({
    from: {
      top: ref?.current?.getBoundingClientRect().top,
      left: ref?.current?.getBoundingClientRect().left,
      minHeight: `${ref?.current?.getBoundingClientRect().height}px`,
      minWidth: `${ref?.current?.getBoundingClientRect().width}px`,
      borderRadius: 0,
    },
    to: {
      top: 0,
      left: 0,
      minHeight: `${window.innerHeight}px`,
      minWidth: `${window.innerWidth}px`,
      borderRadius: 0,
    },
    config: {
      easing: easings.easeInOutSine,
      duration: 250,
    },
  }));

  useEffect(() => {
    if (!expanded) {
      return;
    }

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
      from: {
        top: expanded ? rect?.top : parentRect?.top,
        left: expanded ? rect?.left : parentRect?.left,
        minHeight: expanded
          ? `${rect?.height ?? 0}px`
          : `${parentRect?.height}px`,
        minWidth: expanded ? `${rect?.width ?? 0}px` : `${parentRect?.left}px`,
        borderRadius: expanded ? Number(borderRadius ?? 0) : 0,
      },
      to: {
        top: expanded ? parentRect?.top : rect?.top,
        left: expanded ? parentRect?.left : rect?.left,
        minHeight: expanded
          ? `${parentRect?.height}px`
          : `${rect?.height ?? 0}px`,
        minWidth: expanded ? `${parentRect?.left}px` : `${rect?.width ?? 0}px`,
        borderRadius: expanded ? 0 : Number(borderRadius ?? 0),
      },
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
          setTimeout(() => setExpanded(true), 150);
        }}
      >
        <animated.div
          className={[
            styles['animated-root'],
            styles['animated-root-mobile'],
          ].join(' ')}
          style={{
            ...style,
            ...(expanded && { padding: '0px', position: 'fixed' }),
            zIndex: expanded ? 100 : 0,
          }}
        >
          <div
            className={[
              styles['left-content'],
              styles['left-content-mobile'],
            ].join(' ')}
            style={
              expanded
                ? {
                    height: '100%',
                    width: '100%',
                  }
                : {}
            }
          >
            <div
              className={[
                styles['top-content'],
                styles['top-content-mobile'],
              ].join(' ')}
              style={
                expanded
                  ? {
                      height: '100%',
                      width: '100%',
                    }
                  : {}
              }
            >
              <div
                className={[
                  styles['thumbnail-content'],
                  styles['thumbnail-content-mobile'],
                ].join(' ')}
                style={
                  expanded
                    ? {
                        height: '100%',
                        width: '100%',
                      }
                    : {}
                }
              >
                <div
                  className={[
                    styles['thumbnail-container'],
                    styles['thumbnail-container-mobile'],
                  ].join(' ')}
                  style={{
                    height: expanded ? '100%' : '56px',
                    width: expanded ? '100%' : '56px',
                    borderRadius: expanded ? '0px' : '6px',
                  }}
                >
                  {thumbnail && type?.value === MedusaProductTypeNames.Wine && (
                    <img
                      className={[
                        styles['wine-thumbnail-image'],
                        styles['wine-thumbnail-image-mobile'],
                      ].join(' ')}
                      src={thumbnail}
                    />
                  )}
                  {thumbnail &&
                    type?.value === MedusaProductTypeNames.MenuItem && (
                      <img
                        className={[
                          styles['menu-item-thumbnail-image'],
                          styles['menu-item-thumbnail-image-mobile'],
                        ].join(' ')}
                        src={thumbnail}
                      />
                    )}
                  {!thumbnail &&
                    type?.value === MedusaProductTypeNames.Wine && (
                      <img
                        className={[
                          styles['no-thumbnail-image'],
                          styles['no-thumbnail-image-mobile'],
                        ].join(' ')}
                        src={'../assets/images/wine-bottle.png'}
                      />
                    )}
                  {!thumbnail &&
                    type?.value === MedusaProductTypeNames.MenuItem && (
                      <img
                        className={[
                          styles['no-thumbnail-image'],
                          styles['no-thumbnail-image-mobile'],
                        ].join(' ')}
                        src={'../assets/images/menu.png'}
                      />
                    )}
                </div>
                {!expanded && (
                  <div
                    className={[
                      styles['title-container'],
                      styles['title-container-mobile'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['product-title'],
                        styles['product-title-mobile'],
                      ].join(' ')}
                    >
                      {title}
                    </div>
                    {subtitle && (
                      <div
                        className={[
                          styles['product-subtitle'],
                          styles['product-subtitle-mobile'],
                        ].join(' ')}
                      >
                        {subtitle}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {!expanded && (
              <div
                className={[
                  styles['product-description'],
                  styles['product-description-mobile'],
                ].join(' ')}
              >
                {description &&
                  description?.length > 0 &&
                  formatDescription(
                    `${description?.slice(0, 130)}${
                      description.length > 130 ? '...' : ''
                    }`
                  )}
              </div>
            )}
          </div>
          {!expanded && (
            <div
              className={[
                styles['right-content'],
                styles['right-content-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['price-container'],
                  styles['price-container-mobile'],
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
                    </>
                  )}
                  {!likesMetadata && (
                    <>
                      <Skeleton
                        className={[
                          styles['like-status-button-skeleton'],
                          styles['like-status-button-skeleton-mobile'],
                        ].join(' ')}
                      />
                      <Skeleton
                        borderRadius={9999}
                        className={[
                          styles['like-status-count-skeleton'],
                          styles['like-status-count-skeleton-mobile'],
                        ].join(' ')}
                      />
                    </>
                  )}
                </div>
              </div>
              {purchasable && pricedProduct && selectedVariantId && (
                <Button
                  classNames={{ button: styles['floating-button'] }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  rounded={true}
                  onClick={onAddToCart}
                  icon={<Line.AddShoppingCart size={24} />}
                  loadingComponent={
                    <img
                      src={'../assets/svg/ring-resize-dark.svg'}
                      style={{ height: 24 }}
                      className={[
                        styles['loading-ring'],
                        styles['loading-ring-mobile'],
                      ].join(' ')}
                    />
                  }
                  loading={isLoading}
                />
              )}
              {purchasable && !pricedProduct && (
                <Skeleton width={46} height={46} borderRadius={46} />
              )}
            </div>
          )}
        </animated.div>
      </Card>
    </ResponsiveMobile>
  );
}
