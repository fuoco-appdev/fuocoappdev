import { OptionProps } from '@fuoco.appdev/core-ui';
import { TabProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/tabs/tabs';
import { lazy } from '@loadable/component';
import { Country, Product, Region } from '@medusajs/medusa';
import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { Store } from '@ngneat/elf';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import ExploreController from '../controllers/explore.controller';
import ProductController from '../controllers/product.controller';
import StoreController from '../controllers/store.controller';
import WindowController from '../controllers/window.controller';
import { WindowState } from '../models';
import { AccountState } from '../models/account.model';
import {
  ExploreLocalState,
  ExploreState,
  InventoryLocation,
  InventoryLocationType,
} from '../models/explore.model';
import { ProductTabs, StoreState } from '../models/store.model';
import { ProductLikesMetadataResponse } from '../protobuf/product-like_pb';
import { RoutePathsType, useQuery } from '../route-paths';
import { StoreSuspenseDesktopComponent } from './desktop/suspense/store.suspense.desktop.component';
import { StoreSuspenseMobileComponent } from './mobile/suspense/store.suspense.mobile.component';
import styles from './store.module.scss';
import { StoreSuspenseTabletComponent } from './tablet/suspense/store.suspense.tablet.component';

const StoreDesktopComponent = lazy(
  () => import('./desktop/store.desktop.component')
);
const StoreTabletComponent = lazy(
  () => import('./tablet/store.tablet.component')
);
const StoreMobileComponent = lazy(
  () => import('./mobile/store.mobile.component')
);

export interface StoreResponsiveProps {
  windowProps: WindowState;
  storeProps: StoreState;
  exploreProps: ExploreState;
  accountProps: AccountState;
  exploreLocalProps: ExploreLocalState;
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
    product: PricedProduct | undefined,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewRest: (product: Product | undefined) => void;
  onProductPreviewAddToCart: (
    product: PricedProduct | undefined,
    productLikesMetadata: ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewLikeChanged: (
    isLiked: boolean,
    product: PricedProduct | undefined
  ) => void;
  onRemoveSalesChannel: () => void;
}

export default function StoreComponent(): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const [windowProps] = useObservable(WindowController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [exploreProps] = useObservable(ExploreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [exploreLocalProps] = useObservable(
    ExploreController.model.localStore ?? Store.prototype
  );
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
    product: PricedProduct | undefined,
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

  const onProductPreviewRest = (product: Product | undefined) => {
    navigate({
      pathname: `${RoutePathsType.Store}/${product?.id}`,
      search: query.toString(),
    });
  };

  const onProductPreviewAddToCart = (
    product: PricedProduct | undefined,
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

    const variants: PricedVariant[] = product?.variants;
    const quantities: Record<string, number> = {};
    for (const variant of variants) {
      if (!variant?.id) {
        continue;
      }
      quantities[variant?.id] = 0;
    }

    const purchasableVariants = variants.filter(
      (value: PricedVariant) => value.purchasable === true
    );

    if (purchasableVariants.length > 0) {
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
    product: PricedProduct | undefined
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
          WindowController.addToast({
            key: `add-to-cart-${Math.random()}`,
            message: t('addedToCart') ?? '',
            description:
              t('addedToCartDescription', {
                item: storeProps.selectedPricedProduct?.title,
              }) ?? '',
            type: 'success',
          });
          setIsPreviewLoading(false);
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
      await WindowController.updateQueryInventoryLocationAsync(undefined, query);
      await StoreController.reloadProductsAsync();
      navigate({ pathname: RoutePathsType.Store, search: query.toString() });
    }, 150);
  }

  React.useEffect(() => {
    renderCountRef.current += 1;
    StoreController.load(renderCountRef.current);
    const search = query.get('search');
    if (search && search !== storeProps.input) {
      StoreController.updateInput(search);
    }

    return () => {
      StoreController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    const countries: OptionProps[] = [];
    for (const region of storeProps.regions as Region[]) {
      for (const country of region.countries as Country[]) {
        const duplicate = countries.filter(
          (value) => value.id === country.iso_2
        );
        if (duplicate.length > 0) {
          continue;
        }

        countries.push({
          id: country.iso_2,
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
  }, [storeProps.regions]);

  React.useEffect(() => {
    if (
      !exploreProps.inventoryLocations ||
      !storeProps.selectedRegion ||
      !exploreProps.selectedInventoryLocation
    ) {
      return;
    }

    const inventoryLocationsInRegion = exploreProps.inventoryLocations?.filter(
      (value: InventoryLocation) =>
        value.region === storeProps.selectedRegion.name
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
  }, [exploreProps.inventoryLocations, storeProps.selectedRegion]);

  React.useEffect(() => {
    if (salesLocationOptions.length <= 0) {
      return;
    }

    setSelectedSalesLocationId(exploreLocalProps.selectedInventoryLocationId);
  }, [exploreLocalProps.selectedInventoryLocationId, salesLocationOptions]);

  React.useEffect(() => {
    if (!storeProps.selectedRegion || countryOptions.length <= 0) {
      return;
    }

    const region = storeProps.selectedRegion as Region;
    const country = region.countries[0];
    const selectedCountry = countryOptions.find(
      (value) => value.id === country?.iso_2
    );

    setSelectedCountryId(selectedCountry?.id ?? '');
    setSelectedRegionId('');
  }, [countryOptions, storeProps.selectedRegion]);

  React.useEffect(() => {
    if (countryOptions.length <= 0 || selectedCountryId.length <= 0) {
      return;
    }

    const regions: OptionProps[] = [];
    const selectedCountryOption = countryOptions.find(
      (value) => value.id === selectedCountryId
    );
    for (const region of storeProps.regions as Region[]) {
      const countries = region.countries as Country[];
      const validCountries = countries.filter(
        (value) => value.iso_2 === selectedCountryOption?.id
      );

      if (validCountries.length <= 0) {
        continue;
      }

      regions.push({
        id: region?.id ?? '',
        value: region?.name ?? '',
        children: () => (
          <div className={styles['option-name']}>{region?.name}</div>
        ),
      });
    }

    setRegionOptions(regions);
  }, [selectedCountryId, countryOptions]);

  React.useEffect(() => {
    if (!storeProps.selectedRegion || regionOptions.length <= 0) {
      return;
    }

    setSelectedRegionId(storeProps.selectedRegion.id);
  }, [regionOptions, storeProps.selectedRegion]);

  React.useEffect(() => {
    if (
      exploreProps.selectedInventoryLocation?.type ===
      InventoryLocationType.Cellar
    ) {
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
      exploreProps.selectedInventoryLocation?.type ===
      InventoryLocationType.Restaurant
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
    }
    else {
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
  }, [exploreProps.selectedInventoryLocation]);

  const suspenceComponent = (
    <>
      <StoreSuspenseDesktopComponent />
      <StoreSuspenseTabletComponent />
      <StoreSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Store | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Store | Cruthology'} />
        <meta
          name="description"
          content={`Elevate your wine journey to the next level. Explore, select, and savor the extraordinary with Cruthology's exclusive wine selection.`}
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Store | Cruthology'} />
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
          windowProps={windowProps}
          storeProps={storeProps}
          exploreProps={exploreProps}
          accountProps={accountProps}
          exploreLocalProps={exploreLocalProps}
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
        <StoreTabletComponent
          windowProps={windowProps}
          storeProps={storeProps}
          accountProps={accountProps}
          exploreProps={exploreProps}
          exploreLocalProps={exploreLocalProps}
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
          windowProps={windowProps}
          storeProps={storeProps}
          accountProps={accountProps}
          exploreProps={exploreProps}
          exploreLocalProps={exploreLocalProps}
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
