import React, {
  Key,
  LegacyRef,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './product-preview.module.scss';
import { MoneyAmount, Product, LineItem } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { Button, Card, Line } from '@fuoco.appdev/core-ui';
import { animated, useSpring } from 'react-spring';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import i18n from '../i18n';
import ProductController from '../controllers/product.controller';
import StoreController from '../controllers/store.controller';
import { useObservable } from '@ngneat/use-observable';
import WindowController from '../controllers/window.controller';
import { useTranslation } from 'react-i18next';
import CartController from '../controllers/cart.controller';
// @ts-ignore
import { formatAmount } from 'medusa-react';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import { ProductPreviewSuspenseDesktopComponent } from './desktop/suspense/product-preview.suspense.desktop.component';
import { ProductPreviewSuspenseMobileComponent } from './mobile/suspense/product-preview.suspense.mobile.component';
import { ProductPreviewSuspenseTabletComponent } from './tablet/suspense/product-preview.suspense.tablet.component';
import { WindowState } from '../models';
import { ProductLikesMetadataResponse } from '../protobuf/core_pb';
import AccountController from '../controllers/account.controller';
import { AccountState } from '../models/account.model';

const ProductPreviewDesktopComponent = lazy(
  () => import('./desktop/product-preview.desktop.component')
);
const ProductPreviewTabletComponent = lazy(
  () => import('./tablet/product-preview.tablet.component')
);
const ProductPreviewMobileComponent = lazy(
  () => import('./mobile/product-preview.mobile.component')
);

export interface ProductPreviewProps {
  accountProps: AccountState;
  parentRef: MutableRefObject<HTMLDivElement | null>;
  pricedProduct: PricedProduct | null;
  likesMetadata: ProductLikesMetadataResponse;
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  storeProps?: StoreState;
  onClick?: () => void;
  onRest?: () => void;
  onAddToCart?: () => void;
  onLikeChanged?: (isLiked: boolean) => void;
}

export interface ProductPreviewResponsiveProps extends ProductPreviewProps {
  originalPrice: string;
  calculatedPrice: string;
  selectedVariantId: string | undefined;
  likeCount: number;
  isLiked: boolean;
  setOriginalPrice: (value: string) => void;
  setCalculatedPrice: (value: string) => void;
  setSelectedVariantId: (value: string | undefined) => void;
  setLikeCount: (value: number) => void;
  formatPrice: (price: MoneyAmount) => string;
  formatNumberCompact: (value: number) => string;
}

export default function ProductPreviewComponent({
  storeProps,
  accountProps,
  parentRef,
  thumbnail,
  title,
  subtitle,
  description,
  pricedProduct,
  likesMetadata,
  onClick,
  onRest,
  onAddToCart,
  onLikeChanged,
}: ProductPreviewProps): JSX.Element {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<string>('');
  const [addedToCartCount, setAddedToCartCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(undefined);
  const { t, i18n } = useTranslation();

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

  const formatNumberCompact = (value: number): string => {
    const formatter = Intl.NumberFormat(i18n.language, { notation: 'compact' });
    return formatter.format(value);
  };

  const onLikeChangedOverride = (isLiked: boolean) => {
    setIsLiked(isLiked);

    if (isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    onLikeChanged?.(isLiked);
  };

  useEffect(() => {
    if (likesMetadata.totalLikeCount !== undefined) {
      setLikeCount(likesMetadata.totalLikeCount);
    }

    setIsLiked(likesMetadata.didAccountLike);
  }, [likesMetadata, accountProps.account]);

  useEffect(() => {
    const purchasableVariants = pricedProduct?.variants.filter(
      (value) => value.purchasable === true
    );

    if (purchasableVariants && purchasableVariants.length > 0) {
      const cheapestVariant =
        ProductController.getCheapestPrice(purchasableVariants);
      if (cheapestVariant && storeProps?.selectedRegion) {
        setSelectedVariantId(cheapestVariant.id);
        setOriginalPrice(
          formatAmount({
            amount: cheapestVariant.original_price ?? 0,
            region: storeProps.selectedRegion,
            includeTaxes: false,
          })
        );
        setCalculatedPrice(
          formatAmount({
            amount: cheapestVariant.calculated_price ?? 0,
            region: storeProps.selectedRegion,
            includeTaxes: false,
          })
        );
      }
    } else {
      setSelectedVariantId(undefined);
      setOriginalPrice('');
      setCalculatedPrice('');
    }
  }, [pricedProduct, addedToCartCount, storeProps?.selectedRegion]);

  const suspenceComponent = (
    <>
      <ProductPreviewSuspenseDesktopComponent />
      <ProductPreviewSuspenseTabletComponent />
      <ProductPreviewSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ProductPreviewDesktopComponent
        accountProps={accountProps}
        likesMetadata={likesMetadata}
        parentRef={parentRef}
        thumbnail={thumbnail}
        title={title}
        subtitle={subtitle}
        description={description}
        pricedProduct={pricedProduct}
        onClick={onClick}
        onRest={onRest}
        originalPrice={originalPrice}
        calculatedPrice={calculatedPrice}
        selectedVariantId={selectedVariantId}
        likeCount={likeCount}
        isLiked={isLiked}
        setOriginalPrice={setOriginalPrice}
        setCalculatedPrice={setCalculatedPrice}
        setSelectedVariantId={setSelectedVariantId}
        setLikeCount={setLikeCount}
        formatPrice={formatPrice}
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
      />
      <ProductPreviewTabletComponent
        accountProps={accountProps}
        likesMetadata={likesMetadata}
        parentRef={parentRef}
        thumbnail={thumbnail}
        title={title}
        subtitle={subtitle}
        description={description}
        pricedProduct={pricedProduct}
        onClick={onClick}
        onRest={onRest}
        originalPrice={originalPrice}
        calculatedPrice={calculatedPrice}
        selectedVariantId={selectedVariantId}
        likeCount={likeCount}
        isLiked={isLiked}
        setOriginalPrice={setOriginalPrice}
        setCalculatedPrice={setCalculatedPrice}
        setSelectedVariantId={setSelectedVariantId}
        setLikeCount={setLikeCount}
        formatPrice={formatPrice}
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
      />
      <ProductPreviewMobileComponent
        accountProps={accountProps}
        likesMetadata={likesMetadata}
        parentRef={parentRef}
        thumbnail={thumbnail}
        title={title}
        subtitle={subtitle}
        description={description}
        pricedProduct={pricedProduct}
        onClick={onClick}
        onRest={onRest}
        originalPrice={originalPrice}
        calculatedPrice={calculatedPrice}
        selectedVariantId={selectedVariantId}
        likeCount={likeCount}
        isLiked={isLiked}
        setOriginalPrice={setOriginalPrice}
        setCalculatedPrice={setCalculatedPrice}
        setSelectedVariantId={setSelectedVariantId}
        setLikeCount={setLikeCount}
        formatPrice={formatPrice}
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
      />
    </React.Suspense>
  );
}
