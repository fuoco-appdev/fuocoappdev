import {
  Key,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './product-preview.module.scss';
import { ProductPreview } from '../models/store.model';
import { MoneyAmount } from '../models/product.model';
import { Button, Card, Line } from '@fuoco.appdev/core-ui';
import { animated, useSpring } from 'react-spring';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import i18n from '../i18n';
import ProductController from '../controllers/product.controller';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';

export interface ProductPreviewProps {
  parentRef: MutableRefObject<HTMLDivElement | null>;
  preview: ProductPreview;
  onClick?: () => void;
  onRest?: () => void;
}

function ProductPreviewDesktopComponent({}: ProductPreviewProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}

function ProductPreviewMobileComponent({
  parentRef,
  preview,
  onClick,
  onRest,
}: ProductPreviewProps): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >();
  const [storeProps] = useObservable(StoreController.model.store);
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

  const formatPrice = (price: MoneyAmount): string => {
    if (!price.amount) {
      return 'null';
    }

    let value = price.amount.toString();
    let charList = value.split('');
    charList.splice(-2, 0, '.');
    value = charList.join('');

    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: price.currency_code,
    }).format(Number(value));
  };

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

  useEffect(() => {
    const variantPrices: MoneyAmount[] = [];
    for (const variant of preview.variants) {
      if (!storeProps.selectedRegion) {
        continue;
      }

      const selectedCurrencyPrices = variant.prices?.filter(
        (value) =>
          value.currency_code === storeProps.selectedRegion?.currency_code ?? ''
      );
      const cheapestPrice = selectedCurrencyPrices?.reduce((prev, next) => {
        return (prev?.amount ?? 0) < (next?.amount ?? 0) ? prev : next;
      });
      if (cheapestPrice) {
        variantPrices.push(cheapestPrice);
      }
    }

    const cheapestVariant = variantPrices.reduce((prev, next) => {
      return (prev?.amount ?? 0) < (next?.amount ?? 0) ? prev : next;
    });
    setSelectedVariantId(cheapestVariant.variant_id);
    setPrice(formatPrice(cheapestVariant));
  }, [preview, storeProps.selectedRegion]);

  return (
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
          position: expanded ? 'fixed' : 'initial',
          zIndex: expanded ? 1 : 0,
        }}
      >
        <div
          className={styles['thumbnail-container-mobile']}
          style={{ height: expanded ? '100%' : 'calc(100% - 38px)' }}
        >
          <img
            className={styles['thumbnail-image-mobile']}
            src={preview.thumbnail || '../assets/svg/wine-bottle.svg'}
          />
          <div className={styles['thumbnail-content-container']}>
            <div className={styles['thumbnail-top-content']}></div>
            {!expanded && (
              <div className={styles['thumbnail-bottom-content']}>
                <Button
                  classNames={{ button: styles['thumbnail-button'] }}
                  rippleProps={{
                    color: 'rgba(133, 38, 122, .35)',
                  }}
                  rounded={true}
                  onClick={() =>
                    ProductController.addToCartAsync(selectedVariantId ?? '')
                  }
                  icon={<Line.AddShoppingCart size={24} />}
                />
              </div>
            )}
          </div>
        </div>
        {!expanded && (
          <div className={styles['bottom-bar-mobile']}>
            <span className={styles['product-title-mobile']}>
              {preview.title}
            </span>
            <span className={styles['product-price-mobile']}>{price}</span>
          </div>
        )}
      </animated.div>
    </Card>
  );
}

export default function ProductPreviewComponent(
  props: ProductPreviewProps
): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <ProductPreviewMobileComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ProductPreviewMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
