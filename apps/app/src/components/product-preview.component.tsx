import { MoneyAmount, ProductType } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ProductController from '../controllers/product.controller';
// @ts-ignore
import { lazy } from '@loadable/component';
import { formatAmount } from 'medusa-react';
import { AccountState } from '../models/account.model';
import { StoreState } from '../models/store.model';
import { DeepLTranslationsResponse } from '../protobuf/deepl_pb';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import DeeplService from '../services/deepl.service';
import { ProductPreviewSuspenseDesktopComponent } from './desktop/suspense/product-preview.suspense.desktop.component';
import { ProductPreviewSuspenseMobileComponent } from './mobile/suspense/product-preview.suspense.mobile.component';
import { ProductPreviewSuspenseTabletComponent } from './tablet/suspense/product-preview.suspense.tablet.component';

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
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  pricedProduct: PricedProduct | null;
  likesMetadata: ProductLikesMetadataResponse;
  isLoading: boolean;
  purchasable: boolean;
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  type?: ProductType;
  storeProps?: StoreState;
  showPricingDetails?: boolean;
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
  formatDescription: (markdown: string) => string;
}

export default function ProductPreviewComponent({
  storeProps,
  accountProps,
  parentRef,
  purchasable,
  thumbnail,
  title,
  subtitle,
  description,
  type,
  isLoading,
  pricedProduct,
  likesMetadata,
  showPricingDetails,
  onClick,
  onRest,
  onAddToCart,
  onLikeChanged,
}: ProductPreviewProps): JSX.Element {
  const [originalPrice, setOriginalPrice] = React.useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = React.useState<string>('');
  const [addedToCartCount] = React.useState<number>(0);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(0);
  const [selectedVariantId, setSelectedVariantId] = React.useState<
    string | undefined
  >(undefined);
  const [translatedDescription, setTranslatedDescription] = React.useState<
    string | undefined
  >(description);
  const { i18n } = useTranslation();

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

  const formatDescription = (markdown: string): string => {
    const toText = markdown
      .replace(/^### (.*$)/gim, '$1') // h3 tag
      .replace(/^## (.*$)/gim, '$1') // h2 tag
      .replace(/^# (.*$)/gim, '$1') // h1 tag
      .replace(/\*\*(.*)\*\*/gim, '') // bold text
      .replace(/\*(.*)\*/gim, ''); // italic text
    return toText.trim();
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

  const updateTranslatedDescriptionAsync = async (description: string) => {
    if (i18n.language !== 'en') {
      const response: DeepLTranslationsResponse =
        await DeeplService.translateAsync(description, i18n.language);
      if (response.translations.length <= 0) {
        return;
      }

      const firstTranslation = response.translations[0];
      setTranslatedDescription(firstTranslation.text);
    } else {
      setTranslatedDescription(description);
    }
  };

  React.useEffect(() => {
    if (!description) {
      return;
    }

    updateTranslatedDescriptionAsync(description);
  }, [description, i18n.language]);

  React.useEffect(() => {
    if (likesMetadata.totalLikeCount !== undefined) {
      setLikeCount(likesMetadata.totalLikeCount);
    }

    setIsLiked(likesMetadata.didAccountLike);
  }, [likesMetadata, accountProps.account]);

  React.useEffect(() => {
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
        purchasable={purchasable}
        title={title}
        subtitle={subtitle}
        description={translatedDescription}
        type={type}
        isLoading={isLoading}
        pricedProduct={pricedProduct}
        onClick={onClick}
        onRest={onRest}
        originalPrice={originalPrice}
        calculatedPrice={calculatedPrice}
        selectedVariantId={selectedVariantId}
        likeCount={likeCount}
        isLiked={isLiked}
        showPricingDetails={showPricingDetails}
        setOriginalPrice={setOriginalPrice}
        setCalculatedPrice={setCalculatedPrice}
        setSelectedVariantId={setSelectedVariantId}
        setLikeCount={setLikeCount}
        formatPrice={formatPrice}
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
        formatDescription={formatDescription}
      />
      <ProductPreviewTabletComponent
        accountProps={accountProps}
        likesMetadata={likesMetadata}
        parentRef={parentRef}
        thumbnail={thumbnail}
        purchasable={purchasable}
        title={title}
        subtitle={subtitle}
        description={translatedDescription}
        type={type}
        isLoading={isLoading}
        pricedProduct={pricedProduct}
        onClick={onClick}
        onRest={onRest}
        originalPrice={originalPrice}
        calculatedPrice={calculatedPrice}
        selectedVariantId={selectedVariantId}
        likeCount={likeCount}
        isLiked={isLiked}
        showPricingDetails={showPricingDetails}
        setOriginalPrice={setOriginalPrice}
        setCalculatedPrice={setCalculatedPrice}
        setSelectedVariantId={setSelectedVariantId}
        setLikeCount={setLikeCount}
        formatPrice={formatPrice}
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
        formatDescription={formatDescription}
      />
      <ProductPreviewMobileComponent
        accountProps={accountProps}
        likesMetadata={likesMetadata}
        parentRef={parentRef}
        thumbnail={thumbnail}
        purchasable={purchasable}
        title={title}
        subtitle={subtitle}
        description={translatedDescription}
        type={type}
        isLoading={isLoading}
        pricedProduct={pricedProduct}
        onClick={onClick}
        onRest={onRest}
        originalPrice={originalPrice}
        calculatedPrice={calculatedPrice}
        selectedVariantId={selectedVariantId}
        likeCount={likeCount}
        isLiked={isLiked}
        showPricingDetails={showPricingDetails}
        setOriginalPrice={setOriginalPrice}
        setCalculatedPrice={setCalculatedPrice}
        setSelectedVariantId={setSelectedVariantId}
        setLikeCount={setLikeCount}
        formatPrice={formatPrice}
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
        formatDescription={formatDescription}
      />
    </React.Suspense>
  );
}
