import { useObservable } from '@ngneat/use-observable';
import ProductController from '../controllers/product.controller';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Suspense, useEffect, useRef, useState } from 'react';
import { RouteObject, useParams } from 'react-router-dom';
import { ProductOptions, ProductState } from '../models/product.model';
import { ProductOptionValue, ProductOption } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import { Helmet } from 'react-helmet';
import MedusaService from '../services/medusa.service';
import StoreController from '../controllers/store.controller';
import { StoreState } from '../models/store.model';
import { lazy } from '@loadable/component';
import { timeout } from 'promise-timeout';
import React from 'react';
import { ProductSuspenseDesktopComponent } from './desktop/suspense/product.suspense.desktop.component';
import { ProductSuspenseMobileComponent } from './mobile/suspense/product.suspense.mobile.component';
import WindowController from '../controllers/window.controller';
import { useTranslation } from 'react-i18next';
import { ProductSuspenseTabletComponent } from './tablet/suspense/product.suspense.tablet.component';
import AccountController from '../controllers/account.controller';
import { AccountState } from '../models/account.model';
import { MedusaProductTypeNames } from '../types/medusa.type';
import DeeplService from '../services/deepl.service';
import { DeepLTranslationsResponse } from '../protobuf/core_pb';

const ProductDesktopComponent = lazy(
  () => import('./desktop/product.desktop.component')
);
const ProductTabletComponent = lazy(
  () => import('./tablet/product.tablet.component')
);
const ProductMobileComponent = lazy(
  () => import('./mobile/product.mobile.component')
);

export interface ProductProps {
  product?: PricedProduct | undefined;
}

export interface ProductResponsiveProps {
  productProps: ProductState;
  storeProps: StoreState;
  accountProps: AccountState;
  remarkPlugins: any[];
  translatedDescription: string;
  description: string;
  tabs: TabProps[];
  activeVariantId: string | undefined;
  activeDetails: string | undefined;
  alcohol: string | undefined;
  brand: string | undefined;
  varietals: string | undefined;
  producerBottler: string | undefined;
  format: string | undefined;
  region: string | undefined;
  residualSugar: string | undefined;
  type: string | undefined;
  uvc: string | undefined;
  vintage: string | undefined;
  quantity: number;
  isLiked: boolean;
  likeCount: number;
  setActiveDetails: (value: string | undefined) => void;
  setDescription: (value: string) => void;
  setQuantity: (value: number) => void;
  onAddToCart: () => void;
  onLikeChanged: (isLiked: boolean) => void;
  formatNumberCompact: (value: number) => string;
}

function ProductComponent({ product }: ProductProps): JSX.Element {
  const [productProps] = useObservable(ProductController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const { id } = useParams();
  const [translatedDescription, setTranslatedDescription] =
    useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tabs, setTabs] = useState<TabProps[]>([]);
  const [activeVariantId, setActiveVariantId] = useState<string | undefined>();
  const [activeDetails, setActiveDetails] = useState<string | undefined>(
    'information'
  );
  const [alcohol, setAlcohol] = useState<string | undefined>('');
  const [brand, setBrand] = useState<string | undefined>('');
  const [varietals, setVarietals] = useState<string | undefined>('');
  const [producerBottler, setProducerBottler] = useState<string | undefined>(
    ''
  );
  const [format, setFormat] = useState<string | undefined>('');
  const [region, setRegion] = useState<string | undefined>('');
  const [residualSugar, setResidualSugar] = useState<string | undefined>('');
  const [type, setType] = useState<string | undefined>('');
  const [uvc, setUVC] = useState<string | undefined>('');
  const [vintage, setVintage] = useState<string | undefined>('');
  const [remarkPlugins, setRemarkPlugins] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const renderCountRef = useRef<number>(0);
  const { t, i18n } = useTranslation();

  const formatName = (title: string, subtitle?: string | null) => {
    let name = title;
    if (subtitle && subtitle.length > 0) {
      name += `, ${subtitle}`;
    }
    return name;
  };

  const formatDescription = (description: string): string => {
    const regex = /\*\*(.*?)\*\*/g;
    const cleanDescription = description.trim();
    const descriptionWithoutTitles = cleanDescription.replace(regex, '');
    return descriptionWithoutTitles.trim();
  };

  const onAddToCart = () => {
    ProductController.addToCartAsync(
      productProps.selectedVariant?.id ?? '',
      quantity,
      () =>
        WindowController.addToast({
          key: `add-to-cart-${Math.random()}`,
          message: t('addedToCart') ?? '',
          description:
            t('addedToCartDescription', {
              item: productProps.product?.title,
            }) ?? '',
          type: 'success',
        }),
      (error) => console.error(error)
    );
  };

  const onLikeChanged = (isLiked: boolean) => {
    setIsLiked(isLiked);

    if (isLiked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    ProductController.requestProductLike(isLiked, id ?? '');
  };

  const formatNumberCompact = (value: number): string => {
    const formatter = Intl.NumberFormat(i18n.language, { notation: 'compact' });
    return formatter.format(value);
  };

  const [fullName, setFullName] = useState<string>(
    formatName(product?.title ?? '', product?.subtitle) ?? ''
  );
  const [shortDescription, setShortDescription] = useState<string>(
    formatDescription(`${productProps.product?.description?.slice(0, 205)}...`)
  );

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

  useEffect(() => {
    if (!productProps.product) {
      return;
    }

    const formattedName = formatName(
      productProps.product.title,
      productProps.product.subtitle
    );
    setFullName(formattedName);
  }, [productProps.product]);

  useEffect(() => {
    if (!productProps.product) {
      return;
    }

    updateTranslatedDescriptionAsync(productProps.product.description);
  }, [productProps.product]);

  useEffect(() => {
    const formattedDescription = formatDescription(
      `${translatedDescription?.slice(0, 205)}...`
    );
    setShortDescription(formatDescription);
  }, [translatedDescription]);

  useEffect(() => {
    renderCountRef.current += 1;
    ProductController.load(renderCountRef.current);

    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });

    ProductController.updateProductId(id);

    return () => {
      ProductController.disposeLoad(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    if (!productProps.product) {
      return;
    }

    let tabProps: TabProps[] = [];
    for (const variant of productProps.product.variants) {
      tabProps.push({ id: variant.id, label: variant.title });
    }
    tabProps = tabProps.sort((n1, n2) => {
      if (n1.label && n2.label) {
        return n1.label > n2.label ? 1 : -1;
      }

      return 1;
    });
    setTabs(tabProps);
  }, [productProps.product]);

  useEffect(() => {
    setActiveVariantId(productProps.selectedVariant?.id);
  }, [productProps.selectedVariant]);

  useEffect(() => {
    setIsLiked(Boolean(productProps.likesMetadata?.didAccountLike));
    setLikeCount(productProps.likesMetadata?.totalLikeCount ?? 0);
  }, [productProps.likesMetadata, accountProps.account]);

  useEffect(() => {
    if (
      !ProductController.model.product ||
      !ProductController.model.product.options
    ) {
      return;
    }

    const alcoholOption = ProductController.model.product.options.find(
      (value) => value.title === ProductOptions.Alcohol
    );
    const formatOption = ProductController.model.product.options.find(
      (value) => value.title === ProductOptions.Format
    );
    const residualSugarOption = ProductController.model.product.options.find(
      (value) => value.title === ProductOptions.ResidualSugar
    );
    const uvcOption = ProductController.model.product.options.find(
      (value) => value.title === ProductOptions.UVC
    );
    const vintageOption = ProductController.model.product.options.find(
      (value) => value.title === ProductOptions.Vintage
    );

    const variant = productProps.selectedVariant as PricedVariant;
    if (variant && variant?.options) {
      const alcoholValue = variant.options.find(
        (value: ProductOptionValue) => value.option_id === alcoholOption?.id
      );
      const formatValue = variant.options.find(
        (value: ProductOptionValue) => value.option_id === formatOption?.id
      );
      const residualSugarValue = variant.options.find(
        (value: ProductOptionValue) =>
          value.option_id === residualSugarOption?.id
      );
      const uvcValue = variant.options.find(
        (value: ProductOptionValue) => value.option_id === uvcOption?.id
      );
      const vintageValue = variant.options.find(
        (value: ProductOptionValue) => value.option_id === vintageOption?.id
      );

      setBrand(productProps.product?.metadata?.['brand'] as string);
      setRegion(productProps.product?.metadata?.['region'] as string);
      setVarietals(productProps.product?.metadata?.['varietals'] as string);
      setProducerBottler(
        productProps.product?.metadata?.['producer_bottler'] as string
      );
      const metadataType = productProps.product?.type.value as string;
      if (metadataType === MedusaProductTypeNames.Wine) {
        setType(t('wine') ?? '');
      } else if (metadataType === MedusaProductTypeNames.MenuItem) {
        setType(t('menuItem') ?? '');
      }
      setAlcohol(alcoholValue?.value);
      setFormat(formatValue?.value);
      setResidualSugar(residualSugarValue?.value);
      setUVC(uvcValue?.value);
      setVintage(vintageValue?.value);
    }
  }, [productProps.selectedVariant, productProps.product]);

  const suspenceComponent = (
    <>
      <ProductSuspenseDesktopComponent />
      <ProductSuspenseTabletComponent />
      <ProductSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>
          {fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'}
        </title>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="title"
          content={
            fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'
          }
        />
        <meta name="description" content={shortDescription} />
        <meta property="og:image" content={productProps.product?.thumbnail} />
        <meta
          property="og:image:secure_url"
          content={productProps.product?.thumbnail}
        />
        <meta
          property="og:title"
          content={
            fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'
          }
        />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="twitter:title"
          content={
            fullName.length > 0 ? `${fullName} | Cruthology` : 'Cruthology'
          }
        />
        <meta
          property="twitter:image"
          content={productProps.product?.thumbnail}
        />
        <meta property="twitter:description" content={shortDescription} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ProductDesktopComponent
          productProps={productProps}
          storeProps={storeProps}
          accountProps={accountProps}
          remarkPlugins={remarkPlugins}
          translatedDescription={translatedDescription}
          description={description}
          tabs={tabs}
          activeVariantId={activeVariantId}
          activeDetails={activeDetails}
          alcohol={alcohol}
          brand={brand}
          varietals={varietals}
          producerBottler={producerBottler}
          format={format}
          region={region}
          residualSugar={residualSugar}
          type={type}
          uvc={uvc}
          vintage={vintage}
          quantity={quantity}
          isLiked={isLiked}
          likeCount={likeCount}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
          onAddToCart={onAddToCart}
          onLikeChanged={onLikeChanged}
          formatNumberCompact={formatNumberCompact}
        />
        <ProductTabletComponent
          productProps={productProps}
          storeProps={storeProps}
          accountProps={accountProps}
          remarkPlugins={remarkPlugins}
          translatedDescription={translatedDescription}
          description={description}
          tabs={tabs}
          activeVariantId={activeVariantId}
          activeDetails={activeDetails}
          alcohol={alcohol}
          brand={brand}
          varietals={varietals}
          producerBottler={producerBottler}
          format={format}
          region={region}
          residualSugar={residualSugar}
          type={type}
          uvc={uvc}
          vintage={vintage}
          quantity={quantity}
          isLiked={isLiked}
          likeCount={likeCount}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
          onAddToCart={onAddToCart}
          onLikeChanged={onLikeChanged}
          formatNumberCompact={formatNumberCompact}
        />
        <ProductMobileComponent
          productProps={productProps}
          storeProps={storeProps}
          accountProps={accountProps}
          remarkPlugins={remarkPlugins}
          translatedDescription={translatedDescription}
          description={description}
          tabs={tabs}
          activeVariantId={activeVariantId}
          activeDetails={activeDetails}
          alcohol={alcohol}
          brand={brand}
          varietals={varietals}
          producerBottler={producerBottler}
          format={format}
          region={region}
          residualSugar={residualSugar}
          type={type}
          uvc={uvc}
          vintage={vintage}
          quantity={quantity}
          isLiked={isLiked}
          likeCount={likeCount}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
          onAddToCart={onAddToCart}
          onLikeChanged={onLikeChanged}
          formatNumberCompact={formatNumberCompact}
        />
      </React.Suspense>
    </>
  );
}

ProductComponent.getServerSidePropsAsync = async (
  route: RouteObject,
  request: Request,
  result: Response
): Promise<ProductProps> => {
  const id = request.url.split('/').at(-1) ?? '';
  const product = await MedusaService.requestProductAsync(id);
  ProductController.updateProduct(product);
  return Promise.resolve({
    product: product,
  });
};

export default ProductComponent;
