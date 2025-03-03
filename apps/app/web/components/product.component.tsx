import { Line } from '@fuoco.appdev/web-components';
import { TabProps } from '@fuoco.appdev/web-components/dist/cjs/src/components/tabs/tabs';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { RouteObject, useParams } from 'react-router-dom';
import { InventoryLocation } from '../../shared/models/explore.model';
import {
  ProductOptions,
  ProductTabType,
} from '../../shared/models/product.model';
import { DeepLTranslationsResponse } from '../../shared/protobuf/deepl_pb';
import { ProductMetadataResponse } from '../../shared/protobuf/product_pb';
import { DIContainer, DIContext } from './app.component';
import { ProductSuspenseDesktopComponent } from './desktop/suspense/product.suspense.desktop.component';
import { ProductSuspenseMobileComponent } from './mobile/suspense/product.suspense.mobile.component';

const ProductDesktopComponent = React.lazy(
  () => import('./desktop/product.desktop.component')
);
const ProductMobileComponent = React.lazy(
  () => import('./mobile/product.mobile.component')
);

export interface ProductProps {
  metadata?: ProductMetadataResponse;
}

export interface ProductResponsiveProps {
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
  type: HttpTypes.StoreProductType | undefined;
  tags: HttpTypes.StoreProductTag[];
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

function ProductComponent({}: ProductProps): JSX.Element {
  const {
    ProductController,
    StoreController,
    AccountController,
    ExploreController,
    DeepLService,
  } = React.useContext(DIContext);
  const {
    suspense,
    searchedStockLocationScrollPosition,
    selectedVariant,
    metadata,
    variants,
    likesMetadata,
  } = ProductController.model;
  const { account } = AccountController.model;
  const { selectedSalesChannel } = StoreController.model;
  const { id } = useParams();
  const [translatedDescription, setTranslatedDescription] =
    React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [tabs, setTabs] = React.useState<TabProps[]>([]);
  const [activeVariantId, setActiveVariantId] = React.useState<
    string | undefined
  >();
  const [activeDetails, setActiveDetails] = React.useState<string | undefined>(
    'information'
  );
  const [alcohol, setAlcohol] = React.useState<string | undefined>('');
  const [brand, setBrand] = React.useState<string | undefined>('');
  const [varietals, setVarietals] = React.useState<string | undefined>('');
  const [producerBottler, setProducerBottler] = React.useState<
    string | undefined
  >('');
  const [format, setFormat] = React.useState<string | undefined>('');
  const [region, setRegion] = React.useState<string | undefined>('');
  const [residualSugar, setResidualSugar] = React.useState<string | undefined>(
    ''
  );
  const [type, setType] = React.useState<
    HttpTypes.StoreProductType | undefined
  >(undefined);
  const [tags, setTags] = React.useState<HttpTypes.StoreProductTag[]>([]);
  const [uvc, setUVC] = React.useState<string | undefined>('');
  const [vintage, setVintage] = React.useState<string | undefined>('');
  const [remarkPlugins, setRemarkPlugins] = React.useState<any[]>([]);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(0);
  const [sideBarTabs, setSideBarTabs] = React.useState<TabProps[]>([]);
  const [selectedStockLocation, setSelectedStockLocation] =
    React.useState<InventoryLocation | null>(null);
  const renderCountRef = React.useRef<number>(0);
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
      if (searchedStockLocationScrollPosition) {
        e.currentTarget.scrollTop =
          searchedStockLocationScrollPosition as number;
        ProductController.updateSearchedStockLocationScrollPosition(undefined);
      }
    }
  };

  const onAddToCart = () => {
    ProductController.addToCartAsync(
      selectedVariant?.id ?? '',
      quantity,
      () => {
        // WindowController.addToast({
        //   key: `add-to-cart-${Math.random()}`,
        //   message: t('addedToCart') ?? '',
        //   description:
        //     t('addedToCartDescription', {
        //       item: productProps.metadata?.title,
        //     }) ?? '',
        //   type: 'success',
        // });
      },
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
    if (!metadata) {
      return;
    }

    const type = JSON.parse(metadata?.type) as HttpTypes.StoreProductType;
    setType(type);
    setTags(
      metadata?.tags.map(
        (value: string) => JSON.parse(value) as HttpTypes.StoreProductTag
      )
    );

    updateTranslatedDescriptionAsync(metadata.description);
  }, [metadata]);

  React.useEffect(() => {
    const tabs: TabProps[] = [];
    if (
      selectedSalesChannel &&
      metadata?.salesChannelIds.includes(selectedSalesChannel?.id ?? '')
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
  }, [metadata, selectedSalesChannel]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!variants) {
      return;
    }

    let tabProps: TabProps[] = [];
    for (const variant of variants) {
      tabProps.push({ id: variant.id, label: variant.title });
    }
    tabProps = tabProps.sort((n1, n2) => {
      if (n1.label && n2.label) {
        return n1.label > n2.label ? 1 : -1;
      }

      return 1;
    });
    setTabs(tabProps);
  }, [variants]);

  React.useEffect(() => {
    setActiveVariantId(selectedVariant?.id);
  }, [selectedVariant]);

  React.useEffect(() => {
    setIsLiked(Boolean(likesMetadata?.didAccountLike));
    setLikeCount(likesMetadata?.totalLikeCount ?? 0);
  }, [likesMetadata, account]);

  React.useEffect(() => {
    if (!ProductController.model.metadata) {
      return;
    }

    const options = ProductController.model.metadata.options.map(
      (value) => JSON.parse(value) as HttpTypes.StoreProductOption
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

    const variant = selectedVariant;
    if (variant && variant?.options) {
      const alcoholValue = variant.options.find(
        (value: HttpTypes.AdminProductOptionValue) =>
          value.option_id === alcoholOption?.id
      );
      const formatValue = variant.options.find(
        (value: HttpTypes.AdminProductOptionValue) =>
          value.option_id === formatOption?.id
      );
      const residualSugarValue = variant.options.find(
        (value: HttpTypes.AdminProductOptionValue) =>
          value.option_id === residualSugarOption?.id
      );
      const uvcValue = variant.options.find(
        (value: HttpTypes.AdminProductOptionValue) =>
          value.option_id === uvcOption?.id
      );
      const vintageValue = variant.options.find(
        (value: HttpTypes.AdminProductOptionValue) =>
          value.option_id === vintageOption?.id
      );

      const childMetadata = JSON.parse(metadata?.metadata ?? '{}') as Record<
        string,
        any
      >;
      setBrand(childMetadata?.['brand'] as string);
      setRegion(childMetadata?.['region'] as string);
      setVarietals(childMetadata?.['varietals'] as string);
      setProducerBottler(childMetadata?.['producer_bottler'] as string);
      setAlcohol(alcoholValue?.value);
      setFormat(formatValue?.value);
      setResidualSugar(residualSugarValue?.value);
      setUVC(uvcValue?.value);
      setVintage(vintageValue?.value);
    }
  }, [selectedVariant, metadata]);

  const suspenceComponent = (
    <>
      <ProductSuspenseDesktopComponent />
      <ProductSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  const fullNameMetadata = `${formatName(
    metadata?.title ?? '',
    metadata?.subtitle ?? ''
  )} | fuoco.appdev`;
  const descriptionMetadata =
    formatDescription(metadata?.description ?? '').substring(0, 255) ?? '';
  return (
    <>
      <Helmet>
        <title>{fullNameMetadata}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={fullNameMetadata} />
        <meta name="description" content={descriptionMetadata} />
        <meta property="og:image" content={metadata?.thumbnail} />
        <meta property="og:image:secure_url" content={metadata?.thumbnail} />
        <meta property="og:title" content={fullNameMetadata} />
        <meta property="og:description" content={descriptionMetadata} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="twitter:title" content={fullNameMetadata} />
        <meta property="twitter:image" content={metadata?.thumbnail} />
        <meta property="twitter:description" content={descriptionMetadata} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <ProductDesktopComponent
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
  _route: RouteObject,
  request: Request,
  _result: Response
): Promise<ProductProps> => {
  const supabaseService = DIContainer.get('SupabaseService');
  const medusaService = DIContainer.get('MedusaService');
  const productController = DIContainer.get('ProductController');
  supabaseService.initializeSupabase();

  const url = new URL(
    `${(request as any).protocol}://${(request as any).hostname}${request.url}`
  );
  const id = url.pathname.split('/').at(-1) ?? '';
  if (!id.startsWith('prod_')) {
    return Promise.resolve({});
  }
  try {
    const productMetadata = await medusaService.requestProductMetadataAsync(id);
    productController.updateMetadata(productMetadata);
    return Promise.resolve({ metadata: productMetadata });
  } catch (error: any) {
    console.error(error as Error);
    return Promise.resolve({});
  }
};

export default observer(ProductComponent);
