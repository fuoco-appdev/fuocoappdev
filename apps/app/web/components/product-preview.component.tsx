import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DeepLTranslationsResponse } from '../../shared/protobuf/deepl_pb';
import { ProductLikesMetadataResponse } from '../../shared/protobuf/product-like_pb';
import { DIContext } from './app.component';
import { ProductPreviewSuspenseDesktopComponent } from './desktop/suspense/product-preview.suspense.desktop.component';
import { ProductPreviewSuspenseMobileComponent } from './mobile/suspense/product-preview.suspense.mobile.component';

const ProductPreviewDesktopComponent = React.lazy(
  () => import('./desktop/product-preview.desktop.component')
);
const ProductPreviewMobileComponent = React.lazy(
  () => import('./mobile/product-preview.mobile.component')
);

export interface ProductPreviewProps {
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  pricedProduct: HttpTypes.StoreProduct | null;
  likesMetadata: ProductLikesMetadataResponse;
  isLoading: boolean;
  purchasable: boolean;
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  type?: HttpTypes.StoreProductType;
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
  formatNumberCompact: (value: number) => string;
  formatDescription: (markdown: string) => string;
}

function ProductPreviewComponent({
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
  const {
    DeepLService,
    ProductController,
    AccountController,
    StoreController,
    MedusaService,
  } = React.useContext(DIContext);
  const { account } = AccountController.model;
  const { selectedRegion } = StoreController.model;
  const { suspense } = ProductController.model;
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
        await DeepLService.translateAsync(description, i18n.language);
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
  }, [likesMetadata, account]);

  React.useEffect(() => {
    const purchasableVariants = pricedProduct?.variants?.filter(
      (value) => value.inventory_quantity && value.inventory_quantity > 0
    );

    if (purchasableVariants && purchasableVariants.length > 0) {
      const cheapestVariant =
        ProductController.getCheapestPrice(purchasableVariants);
      if (cheapestVariant && selectedRegion) {
        setSelectedVariantId(cheapestVariant.id);
        setOriginalPrice(
          MedusaService.formatAmount(
            cheapestVariant.calculated_price?.original_amount ?? 0,
            selectedRegion.currency_code,
            i18n.language
          )
        );
        setCalculatedPrice(
          MedusaService.formatAmount(
            cheapestVariant.calculated_price?.calculated_amount ?? 0,
            selectedRegion.currency_code,
            i18n.language
          )
        );
      }
    } else {
      setSelectedVariantId(undefined);
      setOriginalPrice('');
      setCalculatedPrice('');
    }
  }, [pricedProduct, addedToCartCount, selectedRegion]);

  const suspenceComponent = (
    <>
      <ProductPreviewSuspenseDesktopComponent />
      <ProductPreviewSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ProductPreviewDesktopComponent
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
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
        formatDescription={formatDescription}
      />
      <ProductPreviewMobileComponent
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
        onAddToCart={onAddToCart}
        onLikeChanged={onLikeChangedOverride}
        formatNumberCompact={formatNumberCompact}
        formatDescription={formatDescription}
      />
    </React.Suspense>
  );
}

export default observer(ProductPreviewComponent);
