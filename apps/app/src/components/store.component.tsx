import {
  ReactNode,
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
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { ProductTabs, StoreState } from '../models/store.model';
import { Country, Region, Product, SalesChannel } from '@medusajs/medusa';
import ProductPreviewComponent from './product-preview.component';
import ReactCountryFlag from 'react-country-flag';
import HomeController from '../controllers/home.controller';
import {
  HomeLocalState,
  HomeState,
  InventoryLocation,
} from '../models/home.model';
import { center } from '@turf/turf';
import { StoreDesktopComponent } from './desktop/store.desktop.component';
import { StoreMobileComponent } from './mobile/store.mobile.component';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';

export interface StoreResponsiveProps {
  storeProps: StoreState;
  homeProps: HomeState;
  homeLocalProps: HomeLocalState;
  openFilter: boolean;
  countryOptions: OptionProps[];
  regionOptions: OptionProps[];
  cellarOptions: OptionProps[];
  selectedCountryId: string;
  selectedRegionId: string;
  selectedCellarId: string;
  setOpenFilter: (value: boolean) => void;
  setSelectedCountryId: (value: string) => void;
  setSelectedRegionId: (value: string) => void;
  setSelectedCellarId: (value: string) => void;
  onPreviewsScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onPreviewsLoad: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void;
}

export default function StoreComponent(): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const [homeProps] = useObservable(HomeController.model.store);
  const [homeLocalProps] = useObservable(
    HomeController.model.localStore ?? Store.prototype
  );
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [cellarOptions, setCellarOptions] = useState<OptionProps[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('');
  const [selectedCellarId, setSelectedCellarId] = useState<string>('');

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
      !homeProps.inventoryLocations ||
      !storeProps.selectedRegion ||
      !homeProps.selectedInventoryLocation
    ) {
      return;
    }

    const inventoryLocationsInRegion = homeProps.inventoryLocations?.filter(
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
  }, [homeProps.inventoryLocations, storeProps.selectedRegion]);

  useEffect(() => {
    if (cellarOptions.length <= 0) {
      return;
    }

    setSelectedCellarId(homeLocalProps.selectedInventoryLocationId);
  }, [homeLocalProps.selectedInventoryLocationId, cellarOptions]);

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
      <ResponsiveDesktop>
        <StoreDesktopComponent
          storeProps={storeProps}
          homeProps={homeProps}
          homeLocalProps={homeLocalProps}
          openFilter={openFilter}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          cellarOptions={cellarOptions}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedCellarId={selectedCellarId}
          setOpenFilter={setOpenFilter}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedCellarId={setSelectedCellarId}
          onPreviewsScroll={onScroll}
          onPreviewsLoad={onLoad}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <StoreMobileComponent
          storeProps={storeProps}
          homeProps={homeProps}
          homeLocalProps={homeLocalProps}
          openFilter={openFilter}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          cellarOptions={cellarOptions}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          selectedCellarId={selectedCellarId}
          setOpenFilter={setOpenFilter}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
          setSelectedCellarId={setSelectedCellarId}
          onPreviewsScroll={onScroll}
          onPreviewsLoad={onLoad}
        />
      </ResponsiveMobile>
    </>
  );
}
