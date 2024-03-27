import { useObservable } from '@ngneat/use-observable';
import ProductController from '../controllers/product.controller';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { Suspense, useEffect, useRef, useState } from 'react';
import { RouteObject, useParams } from 'react-router-dom';
import {
  ProductOptions,
  ProductState,
  ProductTabType,
} from '../models/product.model';
import {
  ProductOptionValue,
  ProductOption,
  ProductType,
  ProductTag,
} from '@medusajs/medusa';
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
import { DeepLTranslationsResponse } from '../protobuf/deepl_pb';
import { ProductMetadataResponse } from '../protobuf/product_pb';
import SupabaseService from '../services/supabase.service';
import { Line } from '@fuoco.appdev/core-ui';
import { InventoryLocation } from '../models/explore.model';
import ExploreController from '../controllers/explore.controller';

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
  metadata?: ProductMetadataResponse;
}

export interface ProductResponsiveProps {
  productProps: ProductState;
  storeProps: StoreState;
  accountProps: AccountState;
  remarkPlugins: any[];
  translatedDescription: string;
  description: string;
  sideBarTabs: TabProps[];
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
  type: ProductType | undefined;
  tags: ProductTag[];
  uvc: string | undefined;
  vintage: string | undefined;
  quantity: number;
  isLiked: boolean;
  likeCount: number;
  selectedStockLocation: InventoryLocation | null;
  setActiveDetails: (value: string | undefined) => void;
  setDescription: (value: string) => void;
  setQuantity: (value: number) => void;
  setSelectedStockLocation: (value: InventoryLocation | null) => void;
  onAddToCart: () => void;
  onLikeChanged: (isLiked: boolean) => void;
  formatNumberCompact: (value: number) => string;
  onStockLocationClicked: (stockLocation: InventoryLocation | null) => void;
  onSideBarScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onSideBarLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onSelectLocation: () => void;
  onCancelLocation: () => void;
}

function ProductComponent({ metadata }: ProductProps): JSX.Element {
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
  const [type, setType] = useState<ProductType | undefined>(undefined);
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [uvc, setUVC] = useState<string | undefined>('');
  const [vintage, setVintage] = useState<string | undefined>('');
  const [remarkPlugins, setRemarkPlugins] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [sideBarTabs, setSideBarTabs] = useState<TabProps[]>([]);
  const [selectedStockLocation, setSelectedStockLocation] =
    useState<InventoryLocation | null>(null);
  const renderCountRef = useRef<number>(0);
  const { t, i18n } = useTranslation();

  const formatName = (title: string, subtitle?: string | null) => {
    let name = title;
    if (subtitle && subtitle.length > 0) {
      name += `, ${subtitle}`;
    }
    return name;
  };

  const formatDescription = (markdown: string): string => {
    const toText = markdown
      .replace(/^### (.*$)/gim, '$1') // h3 tag
      .replace(/^## (.*$)/gim, '$1') // h2 tag
      .replace(/^# (.*$)/gim, '$1') // h1 tag
      .replace(/\*\*(.*)\*\*/gim, '$1') // bold text
      .replace(/\*(.*)\*/gim, '$1'); // italic text
    return toText.trim();
  };

  const onStockLocationClicked = (stockLocation: InventoryLocation | null) => {
    if (
      ExploreController.model.selectedInventoryLocationId !== stockLocation?.id
    ) {
      setSelectedStockLocation(stockLocation);
    }
  };

  const onSelectLocation = () => {
    ExploreController.updateSelectedInventoryLocationId(
      selectedStockLocation?.id
    );
    setSelectedStockLocation(null);
  };

  const onCancelLocation = () => {
    setSelectedStockLocation(null);
  };

  const onSideBarScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (ProductController.model.activeTabId === ProductTabType.Locations) {
      if (
        scrollOffset > 16 ||
        !ProductController.model.hasMoreSearchedStockLocations
      ) {
        return;
      }

      ProductController.onStockLocationsNextScrollAsync();
    }
  };

  const onSideBarLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (ProductController.model.activeTabId === ProductTabType.Locations) {
      if (productProps.searchedStockLocationScrollPosition) {
        e.currentTarget.scrollTop =
          productProps.searchedStockLocationScrollPosition as number;
        ProductController.updateSearchedStockLocationScrollPosition(undefined);
      }
    }
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
              item: productProps.metadata?.title,
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
    if (!productProps.metadata) {
      return;
    }

    const type = JSON.parse(productProps.metadata?.type) as ProductType;
    setType(type);
    setTags(
      productProps.metadata?.tags.map(
        (value: string) => JSON.parse(value) as ProductTag
      )
    );

    updateTranslatedDescriptionAsync(productProps.metadata.description);
  }, [productProps.metadata]);

  useEffect(() => {
    let tabs: TabProps[] = [];
    if (
      storeProps.selectedSalesChannel &&
      productProps.metadata?.salesChannelIds.includes(
        storeProps.selectedSalesChannel?.id ?? ''
      )
    ) {
      tabs.push({
        id: ProductTabType.Price,
        icon: <Line.PriceCheck size={24} />,
      });
      ProductController.updateActiveTabId(ProductTabType.Price);
    } else {
      ProductController.updateActiveTabId(ProductTabType.Locations);
    }

    tabs.push({
      id: ProductTabType.Locations,
      icon: <Line.LocationOn size={24} />,
    });

    setSideBarTabs(tabs);
  }, [productProps.metadata, storeProps.selectedSalesChannel]);

  useEffect(() => {
    renderCountRef.current += 1;
    ProductController.updateProductId(id);
    ProductController.load(renderCountRef.current);

    import('remark-gfm').then((plugin) => {
      setRemarkPlugins([plugin.default]);
    });

    return () => {
      ProductController.disposeLoad(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    if (!productProps.variants) {
      return;
    }

    let tabProps: TabProps[] = [];
    for (const variant of productProps.variants) {
      tabProps.push({ id: variant.id, label: variant.title });
    }
    tabProps = tabProps.sort((n1, n2) => {
      if (n1.label && n2.label) {
        return n1.label > n2.label ? 1 : -1;
      }

      return 1;
    });
    setTabs(tabProps);
  }, [productProps.variants]);

  useEffect(() => {
    setActiveVariantId(productProps.selectedVariant?.id);
  }, [productProps.selectedVariant]);

  useEffect(() => {
    setIsLiked(Boolean(productProps.likesMetadata?.didAccountLike));
    setLikeCount(productProps.likesMetadata?.totalLikeCount ?? 0);
  }, [productProps.likesMetadata, accountProps.account]);

  useEffect(() => {
    if (!ProductController.model.metadata) {
      return;
    }

    const options = ProductController.model.metadata.options.map(
      (value) => JSON.parse(value) as ProductOption
    );
    const alcoholOption = options.find(
      (value) => value.title === ProductOptions.Alcohol
    );
    const formatOption = options.find(
      (value) => value.title === ProductOptions.Format
    );
    const residualSugarOption = options.find(
      (value) => value.title === ProductOptions.ResidualSugar
    );
    const uvcOption = options.find(
      (value) => value.title === ProductOptions.UVC
    );
    const vintageOption = options.find(
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

      const metadata = JSON.parse(productProps.metadata?.metadata) as Record<
        string,
        any
      >;
      setBrand(metadata?.['brand'] as string);
      setRegion(metadata?.['region'] as string);
      setVarietals(metadata?.['varietals'] as string);
      setProducerBottler(metadata?.['producer_bottler'] as string);
      setAlcohol(alcoholValue?.value);
      setFormat(formatValue?.value);
      setResidualSugar(residualSugarValue?.value);
      setUVC(uvcValue?.value);
      setVintage(vintageValue?.value);
    }
  }, [productProps.selectedVariant, productProps.metadata]);

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

  const fullNameMetadata = `${formatName(
    productProps.metadata?.title ?? '',
    productProps.metadata?.subtitle ?? ''
  )} | Cruthology`;
  const descriptionMetadata =
    formatDescription(productProps.metadata?.description ?? '').substring(
      0,
      255
    ) ?? '';
  return (
    <>
      <Helmet>
        <title>{fullNameMetadata}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={fullNameMetadata} />
        <meta name="description" content={descriptionMetadata} />
        <meta property="og:image" content={productProps.metadata?.thumbnail} />
        <meta
          property="og:image:secure_url"
          content={productProps.metadata?.thumbnail}
        />
        <meta property="og:title" content={fullNameMetadata} />
        <meta property="og:description" content={descriptionMetadata} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="twitter:title" content={fullNameMetadata} />
        <meta
          property="twitter:image"
          content={productProps.metadata?.thumbnail}
        />
        <meta property="twitter:description" content={descriptionMetadata} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ProductDesktopComponent
          productProps={productProps}
          storeProps={storeProps}
          accountProps={accountProps}
          remarkPlugins={remarkPlugins}
          translatedDescription={translatedDescription}
          description={description}
          sideBarTabs={sideBarTabs}
          tabs={tabs}
          tags={tags}
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
          selectedStockLocation={selectedStockLocation}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
          setSelectedStockLocation={setSelectedStockLocation}
          onAddToCart={onAddToCart}
          onLikeChanged={onLikeChanged}
          formatNumberCompact={formatNumberCompact}
          onStockLocationClicked={onStockLocationClicked}
          onSideBarScroll={onSideBarScroll}
          onSideBarLoad={onSideBarLoad}
          onSelectLocation={onSelectLocation}
          onCancelLocation={onCancelLocation}
        />
        <ProductTabletComponent
          productProps={productProps}
          storeProps={storeProps}
          accountProps={accountProps}
          remarkPlugins={remarkPlugins}
          translatedDescription={translatedDescription}
          description={description}
          sideBarTabs={sideBarTabs}
          tabs={tabs}
          tags={tags}
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
          selectedStockLocation={selectedStockLocation}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
          setSelectedStockLocation={setSelectedStockLocation}
          onAddToCart={onAddToCart}
          onLikeChanged={onLikeChanged}
          formatNumberCompact={formatNumberCompact}
          onStockLocationClicked={onStockLocationClicked}
          onSideBarScroll={onSideBarScroll}
          onSideBarLoad={onSideBarLoad}
          onSelectLocation={onSelectLocation}
          onCancelLocation={onCancelLocation}
        />
        <ProductMobileComponent
          productProps={productProps}
          storeProps={storeProps}
          accountProps={accountProps}
          remarkPlugins={remarkPlugins}
          translatedDescription={translatedDescription}
          description={description}
          sideBarTabs={sideBarTabs}
          tabs={tabs}
          tags={tags}
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
          selectedStockLocation={selectedStockLocation}
          setActiveDetails={setActiveDetails}
          setDescription={setDescription}
          setQuantity={setQuantity}
          setSelectedStockLocation={setSelectedStockLocation}
          onAddToCart={onAddToCart}
          onLikeChanged={onLikeChanged}
          formatNumberCompact={formatNumberCompact}
          onStockLocationClicked={onStockLocationClicked}
          onSideBarScroll={onSideBarScroll}
          onSideBarLoad={onSideBarLoad}
          onSelectLocation={onSelectLocation}
          onCancelLocation={onCancelLocation}
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
  SupabaseService.initializeSupabase();

  const url = new URL(
    `${(request as any).protocol}://${(request as any).hostname}${request.url}`
  );
  const id = url.pathname.split('/').at(-1) ?? '';
  if (!id.startsWith('prod_')) {
    return Promise.resolve({});
  }
  try {
    const productMetadata = await MedusaService.requestProductMetadataAsync(id);
    ProductController.updateMetadata(productMetadata);
    return Promise.resolve({ metadata: productMetadata });
  } catch (error: any) {
    console.error(error as Error);
    return Promise.resolve({});
  }
};

export default ProductComponent;
