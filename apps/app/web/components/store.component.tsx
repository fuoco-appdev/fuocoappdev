import { OptionProps } from '@fuoco.appdev/web-components';
import { TabProps } from '@fuoco.appdev/web-components/dist/cjs/src/components/tabs/tabs';
import { HttpTypes } from '@medusajs/types';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  InventoryLocation,
  InventoryLocationType,
} from '../../shared/models/explore.model';
import { ProductTabs } from '../../shared/models/store.model';
import { ProductLikesMetadataResponse } from '../../shared/protobuf/product-like_pb';
import { RoutePathsType } from '../../shared/route-paths-type';
import styles from '../modules/store.module.scss';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { StoreSuspenseDesktopComponent } from './desktop/suspense/store.suspense.desktop.component';
import { StoreSuspenseMobileComponent } from './mobile/suspense/store.suspense.mobile.component';

const StoreDesktopComponent = React.lazy(
  () => import('./desktop/store.desktop.component')
);
const StoreMobileComponent = React.lazy(
  () => import('./mobile/store.mobile.component')
);

export interface StoreResponsiveProps {
  openFilter: boolean;
  openCartVariants: boolean;
  countryOptions: OptionProps[];
  regionOptions: OptionProps[];
  salesLocationOptions: OptionProps[];
  selectedCountryId: string;
  selectedRegionId: string;
  selectedSalesLocationId: string;
  variantQuantities: Record<string, number>;
  tabs: TabProps[];
  isPreviewLoading: boolean;
  setIsPreviewLoading: (value: boolean) => void;
  setOpenFilter: (value: boolean) => void;
  setOpenCartVariants: (value: boolean) => void;
  setSelectedCountryId: (value: string) => void;
  setSelectedRegionId: (value: string) => void;
  setSelectedSalesLocationId: (value: string) => void;
  setVariantQuantities: (value: Record<string, number>) => void;
  onPreviewsLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onAddToCart: () => void;
  onProductPreviewClick: (
    scrollTop: number,
    product: HttpTypes.StoreProduct | undefined,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewRest: (product: HttpTypes.StoreProduct | undefined) => void;
  onProductPreviewAddToCart: (
    product: HttpTypes.StoreProduct | undefined,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewLikeChanged: (
    isLiked: boolean,
    product: HttpTypes.StoreProduct | undefined
  ) => void;
  onRemoveSalesChannel: () => void;
}

function StoreComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const {
    ExploreController,
    WindowController,
    StoreController,
    ProductController,
  } = React.useContext(DIContext);
  const { input, regions, selectedRegion, suspense } = StoreController.model;
  const {
    inventoryLocations,
    selectedInventoryLocation,
    selectedInventoryLocationId,
  } = ExploreController.model;
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [openCartVariants, setOpenCartVariants] =
    React.useState<boolean>(false);
  const [countryOptions, setCountryOptions] = React.useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = React.useState<OptionProps[]>([]);
  const [salesLocationOptions, setSalesLocationOptions] = React.useState<
    OptionProps[]
  >([]);
  const [selectedCountryId, setSelectedCountryId] = React.useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = React.useState<string>('');
  const [selectedSalesLocationId, setSelectedSalesLocationId] =
    React.useState<string>('');
  const [variantQuantities, setVariantQuantities] = React.useState<
    Record<string, number>
  >({});
  const [tabs, setTabs] = React.useState<TabProps[]>([]);
  const [isPreviewLoading, setIsPreviewLoading] =
    React.useState<boolean>(false);
  const renderCountRef = React.useRef<number>(0);
  const { t } = useTranslation();

  const onLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (StoreController.model.scrollPosition) {
      e.currentTarget.scrollTop = StoreController.model
        .scrollPosition as number;
      StoreController.updateScrollPosition(undefined);
    }
  };

  const onProductPreviewClick = (
    scrollTop: number,
    product: HttpTypes.StoreProduct | undefined,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => {
    StoreController.updateScrollPosition(scrollTop);

    if (!product || !productLikesMetadata) {
      StoreController.updateSelectedPricedProduct(undefined);
      StoreController.updateSelectedProductLikesMetadata(null);
      return;
    }

    StoreController.updateSelectedPricedProduct(product);
    StoreController.updateSelectedProductLikesMetadata(productLikesMetadata);
  };

  const onProductPreviewRest = (
    product: HttpTypes.StoreProduct | undefined
  ) => {
    navigate({
      pathname: `${RoutePathsType.Store}/${product?.id}`,
      search: query.toString(),
    });
  };

  const onProductPreviewAddToCart = (
    product: HttpTypes.StoreProduct | undefined,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => {
    if (!product) {
      StoreController.updateSelectedPricedProduct(undefined);
      StoreController.updateSelectedProductLikesMetadata(null);
      return;
    }

    StoreController.updateSelectedPricedProduct(product);
    StoreController.updateSelectedProductLikesMetadata(productLikesMetadata);

    setIsPreviewLoading(true);

    const variants = product?.variants;
    const quantities: Record<string, number> = {};
    for (const variant of variants ?? []) {
      if (!variant?.id) {
        continue;
      }
      quantities[variant?.id] = 0;
    }

    const purchasableVariants = variants?.filter(
      (value: HttpTypes.StoreProductVariant) =>
        value.inventory_quantity && value.inventory_quantity > 0
    );

    if (purchasableVariants && purchasableVariants.length > 0) {
      const cheapestVariant =
        ProductController.getCheapestPrice(purchasableVariants);
      if (cheapestVariant?.id && quantities[cheapestVariant.id] <= 0) {
        quantities[cheapestVariant.id] = 1;
      }
    }

    setVariantQuantities(quantities);
    setOpenCartVariants(true);
  };

  const onProductPreviewLikeChanged = (
    isLiked: boolean,
    product: HttpTypes.StoreProduct | undefined
  ) => {
    if (!product) {
      return;
    }

    ProductController.requestProductLike(isLiked, product.id ?? '');
  };

  const onAddToCart = () => {
    for (const id in variantQuantities) {
      const quantity = variantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () => {
          // WindowController.addToast({
          //   key: `add-to-cart-${Math.random()}`,
          //   message: t('addedToCart') ?? '',
          //   description:
          //     t('addedToCartDescription', {
          //       item: storeProps.selectedPricedProduct?.title,
          //     }) ?? '',
          //   type: 'success',
          // });
          // setIsPreviewLoading(false);
        },
        (error) => console.error(error)
      );
    }

    setOpenCartVariants(false);
    setVariantQuantities({});
  };

  const onRemoveSalesChannel = () => {
    setTimeout(async () => {
      ExploreController.updateSelectedInventoryLocationId(undefined);
      await WindowController.updateQueryInventoryLocationAsync(
        undefined,
        query
      );
      await StoreController.reloadProductsAsync();
      navigate({ pathname: RoutePathsType.Store, search: query.toString() });
    }, 150);
  };

  React.useEffect(() => {
    renderCountRef.current += 1;
    StoreController.load(renderCountRef.current);
    const search = query.get('search');
    if (search && search !== input) {
      StoreController.updateInput(search);
    }

    return () => {
      StoreController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    const countries: OptionProps[] = [];
    for (const region of regions) {
      for (const country of region.countries ?? []) {
        const duplicate = countries.filter(
          (value) => value.id === country.iso_2
        );
        if (duplicate.length > 0) {
          continue;
        }

        countries.push({
          id: country.iso_2 ?? '',
          value: country.name?.toLowerCase() ?? '',
          addOnBefore: () => (
            <ReactCountryFlag
              className={styles['country-flag']}
              countryCode={country.iso_2?.toUpperCase() ?? ''}
              svg={true}
              style={{ width: 18, height: 18 }}
            />
          ),
          children: () => (
            <div className={styles['option-name']}>
              {country.name?.toLowerCase()}
            </div>
          ),
        });
      }
    }

    setCountryOptions(countries);
  }, [regions]);

  React.useEffect(() => {
    if (!inventoryLocations || !selectedRegion || !selectedInventoryLocation) {
      return;
    }

    const inventoryLocationsInRegion = inventoryLocations?.filter(
      (value: InventoryLocation) => value.region === selectedRegion.name
    );

    const cellars: OptionProps[] = [];
    for (const location of inventoryLocationsInRegion as InventoryLocation[]) {
      cellars.push({
        id: location.id ?? '',
        value: location.placeName ?? '',
        children: () => (
          <div className={styles['option-name']}>
            {location.placeName.toLowerCase()}
          </div>
        ),
      });
    }

    setSalesLocationOptions(cellars);
  }, [inventoryLocations, selectedRegion]);

  React.useEffect(() => {
    if (!selectedInventoryLocationId || salesLocationOptions.length <= 0) {
      return;
    }

    setSelectedSalesLocationId(selectedInventoryLocationId);
  }, [selectedInventoryLocationId, salesLocationOptions]);

  React.useEffect(() => {
    if (!selectedRegion || countryOptions.length <= 0) {
      return;
    }

    const country = selectedRegion.countries?.[0];
    const selectedCountry = countryOptions.find(
      (value) => value.id === country?.iso_2
    );

    setSelectedCountryId(selectedCountry?.id ?? '');
    setSelectedRegionId('');
  }, [countryOptions, selectedRegion]);

  React.useEffect(() => {
    if (countryOptions.length <= 0 || selectedCountryId.length <= 0) {
      return;
    }

    const regionOptions: OptionProps[] = [];
    const selectedCountryOption = countryOptions.find(
      (value) => value.id === selectedCountryId
    );
    for (const region of regions) {
      const validCountries = region.countries?.filter(
        (value) => value.iso_2 === selectedCountryOption?.id
      );

      if (!validCountries || validCountries?.length <= 0) {
        continue;
      }

      regionOptions.push({
        id: region?.id ?? '',
        value: region?.name ?? '',
        children: () => (
          <div className={styles['option-name']}>{region?.name}</div>
        ),
      });
    }

    setRegionOptions(regionOptions);
  }, [selectedCountryId, countryOptions]);

  React.useEffect(() => {
    if (!selectedRegion || regionOptions.length <= 0) {
      return;
    }

    setSelectedRegionId(selectedRegion.id);
  }, [regionOptions, selectedRegion]);

  React.useEffect(() => {
    if (selectedInventoryLocation?.type === InventoryLocationType.Cellar) {
      setTabs([
        {
          id: ProductTabs.White,
          label: t('white') ?? 'White',
        },
        {
          id: ProductTabs.Red,
          label: t('red') ?? 'Red',
        },
        {
          id: ProductTabs.Rose,
          label: t('rose') ?? 'Rose',
        },
        {
          id: ProductTabs.Spirits,
          label: t('spirits') ?? 'Spirits',
        },
      ]);
    } else if (
      selectedInventoryLocation?.type === InventoryLocationType.Restaurant
    ) {
      setTabs([
        {
          id: ProductTabs.Appetizers,
          label: t('appetizers') ?? 'Appetizers',
        },
        {
          id: ProductTabs.MainCourses,
          label: t('mainCourses') ?? 'Main Courses',
        },
        {
          id: ProductTabs.Desserts,
          label: t('desserts') ?? 'Desserts',
        },
        {
          id: ProductTabs.Extras,
          label: t('extras') ?? 'Extras',
        },
        {
          id: ProductTabs.Wines,
          label: t('wines') ?? 'Wines',
        },
      ]);
    } else {
      setTabs([
        {
          id: ProductTabs.White,
          label: t('white') ?? 'White',
        },
        {
          id: ProductTabs.Red,
          label: t('red') ?? 'Red',
        },
        {
          id: ProductTabs.Rose,
          label: t('rose') ?? 'Rose',
        },
        {
          id: ProductTabs.Spirits,
          label: t('spirits') ?? 'Spirits',
        },
      ]);
    }
  }, [selectedInventoryLocation]);

  const suspenceComponent = (
    <>
      <StoreSuspenseDesktopComponent />
      <StoreSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Store | fuoco.appdev</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Store | fuoco.appdev'} />
        <meta
          name="description"
          content={`Elevate your wine journey to the next level. Explore, select, and savor the extraordinary with Cruthology's exclusive wine selection.`}
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Store | fuoco.appdev'} />
        <meta
          property="og:description"
          content={`Elevate your wine journey to the next level. Explore, select, and savor the extraordinary with Cruthology's exclusive wine selection.`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <StoreDesktopComponent
          openFilter={openFilter}
          openCartVariants={openCartVariants}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          salesLocationOptions={salesLocationOptions}
          variantQuantities={variantQuantities}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedSalesLocationId={selectedSalesLocationId}
          tabs={tabs}
          isPreviewLoading={isPreviewLoading}
          setIsPreviewLoading={setIsPreviewLoading}
          setOpenFilter={setOpenFilter}
          setOpenCartVariants={setOpenCartVariants}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedSalesLocationId={setSelectedSalesLocationId}
          setVariantQuantities={setVariantQuantities}
          onPreviewsLoad={onLoad}
          onAddToCart={onAddToCart}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
          onProductPreviewRest={onProductPreviewRest}
          onRemoveSalesChannel={onRemoveSalesChannel}
        />
        <StoreMobileComponent
          openFilter={openFilter}
          openCartVariants={openCartVariants}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          salesLocationOptions={salesLocationOptions}
          variantQuantities={variantQuantities}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedSalesLocationId={selectedSalesLocationId}
          tabs={tabs}
          isPreviewLoading={isPreviewLoading}
          setIsPreviewLoading={setIsPreviewLoading}
          setOpenFilter={setOpenFilter}
          setOpenCartVariants={setOpenCartVariants}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedSalesLocationId={setSelectedSalesLocationId}
          setVariantQuantities={setVariantQuantities}
          onPreviewsLoad={onLoad}
          onAddToCart={onAddToCart}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
          onProductPreviewRest={onProductPreviewRest}
          onRemoveSalesChannel={onRemoveSalesChannel}
        />
      </React.Suspense>
    </>
  );
}

export default observer(StoreComponent);
