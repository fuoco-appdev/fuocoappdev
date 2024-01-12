import {
  ReactNode,
  Suspense,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StoreController from '../controllers/store.controller';
import styles from './store.module.scss';
import {
  Alert,
  Button,
  Dropdown,
  Input,
  Line,
  Tabs,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { ProductTabs, StoreState } from '../models/store.model';
import { Country, Region, Product, SalesChannel } from '@medusajs/medusa';
import ProductPreviewComponent from './product-preview.component';
import ReactCountryFlag from 'react-country-flag';
import ExploreController from '../controllers/explore.controller';
import {
  ExploreLocalState,
  ExploreState,
  InventoryLocation,
} from '../models/explore.model';
import { center } from '@turf/turf';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import React from 'react';
import { StoreSuspenseDesktopComponent } from './desktop/suspense/store.suspense.desktop.component';
import { StoreSuspenseMobileComponent } from './mobile/suspense/store.suspense.mobile.component';
import { lazy } from '@loadable/component';
import { timeout } from 'promise-timeout';
import {
  PricedVariant,
  PricedProduct,
} from '@medusajs/medusa/dist/types/pricing';
import ProductController from '../controllers/product.controller';
import WindowController from '../controllers/window.controller';
import { StoreSuspenseTabletComponent } from './tablet/suspense/store.suspense.tablet.component';
import { useQuery } from '../route-paths';
import { WindowState } from '../models';
import AccountController from '../controllers/account.controller';
import { AccountState } from '../models/account.model';

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
  cellarOptions: OptionProps[];
  selectedCountryId: string;
  selectedRegionId: string;
  selectedCellarId: string;
  variantQuantities: Record<string, number>;
  setOpenFilter: (value: boolean) => void;
  setOpenCartVariants: (value: boolean) => void;
  setSelectedCountryId: (value: string) => void;
  setSelectedRegionId: (value: string) => void;
  setSelectedCellarId: (value: string) => void;
  setVariantQuantities: (value: Record<string, number>) => void;
  onPreviewsScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onPreviewsLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
  onAddToCart: () => void;
  onProductPreviewClick: (
    scrollTop: number,
    product: PricedProduct,
    productLikesMetadata: core.ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewRest: (product: PricedProduct) => void;
  onProductPreviewAddToCart: (
    product: PricedProduct,
    productLikesMetadata: core.ProductLikesMetadataResponse | null
  ) => void;
  onProductPreviewLikeChanged: (
    isLiked: boolean,
    product: PricedProduct
  ) => void;
}

export default function StoreComponent(): JSX.Element {
  const navigate = useNavigate();
  const [windowProps] = useObservable(WindowController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [exploreProps] = useObservable(ExploreController.model.store);
  const [accountProps] = useObservable(AccountController.model.store);
  const [exploreLocalProps] = useObservable(
    ExploreController.model.localStore ?? Store.prototype
  );
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openCartVariants, setOpenCartVariants] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [cellarOptions, setCellarOptions] = useState<OptionProps[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('');
  const [selectedCellarId, setSelectedCellarId] = useState<string>('');
  const [variantQuantities, setVariantQuantities] = useState<
    Record<string, number>
  >({});
  const { t, i18n } = useTranslation();
  const query = useQuery();

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget?.scrollTop ?? 0;
    const scrollHeight = e.currentTarget?.scrollHeight ?? 0;
    const clientHeight = e.currentTarget?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;

    if (scrollOffset > 16 || !StoreController.model.hasMorePreviews) {
      return;
    }

    StoreController.onNextScrollAsync();
  };

  const onLoad = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    if (storeProps.scrollPosition) {
      e.currentTarget.scrollTop = storeProps.scrollPosition as number;
      StoreController.updateScrollPosition(undefined);
    }
  };

  const onProductPreviewClick = (
    scrollTop: number,
    product: PricedProduct,
    productLikesMetadata: core.ProductLikesMetadataResponse | null
  ) => {
    StoreController.updateScrollPosition(scrollTop);
    StoreController.updateSelectedPreview(product);
    StoreController.updateSelectedProductLikesMetadata(productLikesMetadata);
  };

  const onProductPreviewRest = (product: PricedProduct) => {
    navigate(`${RoutePathsType.Store}/${product.id}`);
  };

  const onProductPreviewAddToCart = (
    product: PricedProduct,
    productLikesMetadata: core.ProductLikesMetadataResponse | null
  ) => {
    StoreController.updateSelectedPreview(product);
    StoreController.updateSelectedProductLikesMetadata(productLikesMetadata);
    setOpenCartVariants(true);
  };

  const onProductPreviewLikeChanged = (
    isLiked: boolean,
    product: PricedProduct
  ) => {
    ProductController.requestProductLike(isLiked, product.id ?? '');
  };

  const onAddToCart = () => {
    for (const id in variantQuantities) {
      const quantity = variantQuantities[id];
      ProductController.addToCartAsync(
        id,
        quantity,
        () =>
          WindowController.addToast({
            key: `add-to-cart-${Math.random()}`,
            message: t('addedToCart') ?? '',
            description:
              t('addedToCartDescription', {
                item: storeProps.selectedPreview?.title,
              }) ?? '',
            type: 'success',
          }),
        (error) => console.error(error)
      );
    }

    setOpenCartVariants(false);
    setVariantQuantities({});
  };

  useEffect(() => {
    const search = query.get('search');
    if (search && search !== storeProps.input) {
      StoreController.updateInput(search);
    }

    StoreController.loadProductsAsync();
  }, []);

  useEffect(() => {
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

  useEffect(() => {
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

    setCellarOptions(cellars);
  }, [exploreProps.inventoryLocations, storeProps.selectedRegion]);

  useEffect(() => {
    if (cellarOptions.length <= 0) {
      return;
    }

    setSelectedCellarId(exploreLocalProps.selectedInventoryLocationId);
  }, [exploreLocalProps.selectedInventoryLocationId, cellarOptions]);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
    if (!storeProps.selectedRegion || regionOptions.length <= 0) {
      return;
    }

    setSelectedRegionId(storeProps.selectedRegion.id);
  }, [regionOptions, storeProps.selectedRegion]);

  useEffect(() => {
    if (!storeProps.selectedPreview) {
      return;
    }

    const variants: PricedVariant[] = storeProps.selectedPreview?.variants;
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
  }, [storeProps.selectedPreview]);

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
          cellarOptions={cellarOptions}
          variantQuantities={variantQuantities}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedCellarId={selectedCellarId}
          setOpenFilter={setOpenFilter}
          setOpenCartVariants={setOpenCartVariants}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedCellarId={setSelectedCellarId}
          setVariantQuantities={setVariantQuantities}
          onPreviewsScroll={onScroll}
          onPreviewsLoad={onLoad}
          onAddToCart={onAddToCart}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
          onProductPreviewRest={onProductPreviewRest}
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
          cellarOptions={cellarOptions}
          variantQuantities={variantQuantities}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedCellarId={selectedCellarId}
          setOpenFilter={setOpenFilter}
          setOpenCartVariants={setOpenCartVariants}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedCellarId={setSelectedCellarId}
          setVariantQuantities={setVariantQuantities}
          onPreviewsScroll={onScroll}
          onPreviewsLoad={onLoad}
          onAddToCart={onAddToCart}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
          onProductPreviewRest={onProductPreviewRest}
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
          cellarOptions={cellarOptions}
          variantQuantities={variantQuantities}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedCellarId={selectedCellarId}
          setOpenFilter={setOpenFilter}
          setOpenCartVariants={setOpenCartVariants}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedCellarId={setSelectedCellarId}
          setVariantQuantities={setVariantQuantities}
          onPreviewsScroll={onScroll}
          onPreviewsLoad={onLoad}
          onAddToCart={onAddToCart}
          onProductPreviewAddToCart={onProductPreviewAddToCart}
          onProductPreviewClick={onProductPreviewClick}
          onProductPreviewLikeChanged={onProductPreviewLikeChanged}
          onProductPreviewRest={onProductPreviewRest}
        />
      </React.Suspense>
    </>
  );
}
