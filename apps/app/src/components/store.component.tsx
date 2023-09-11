import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { ProductTabs } from '../models/store.model';
import { Country, Region, Product, SalesChannel } from '@medusajs/medusa';
import ProductPreviewComponent from './product-preview.component';
import ReactCountryFlag from 'react-country-flag';
import HomeController from '../controllers/home.controller';
import { InventoryLocation } from '../models/home.model';
import { center } from '@turf/turf';
import { StoreDesktopComponent } from './desktop/store.desktop.component';
import { StoreMobileComponent } from './mobile/store.mobile.component';

export interface StoreResponsiveProps {
  previewsContainerRef: React.MutableRefObject<HTMLDivElement | null>;
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
}

export default function StoreComponent(): JSX.Element {
  const previewsContainerRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(StoreController.model.store);
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

  const onScroll = () => {
    const scrollTop = previewsContainerRef.current?.scrollTop ?? 0;
    const scrollHeight = previewsContainerRef.current?.scrollHeight ?? 0;
    const clientHeight = previewsContainerRef.current?.clientHeight ?? 0;
    const scrollOffset = scrollHeight - scrollTop - clientHeight;
    if (scrollOffset > 0) {
      return;
    }

    if (StoreController.model.hasMorePreviews) {
      StoreController.onNextScrollAsync();
    }
  };

  useEffect(() => {
    previewsContainerRef.current?.addEventListener('scroll', onScroll);
    return () =>
      previewsContainerRef.current?.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    if (props.scrollPosition) {
      previewsContainerRef.current?.scrollTo(0, props.scrollPosition);
      StoreController.updateScrollPosition(undefined);
    }
  }, [previewsContainerRef.current]);

  useEffect(() => {
    const countries: OptionProps[] = [];
    for (const region of props.regions as Region[]) {
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
  }, [props.regions]);

  useEffect(() => {
    if (
      !homeProps.inventoryLocations ||
      !props.selectedRegion ||
      !homeProps.selectedInventoryLocation
    ) {
      return;
    }

    const inventoryLocationsInRegion = homeProps.inventoryLocations?.filter(
      (value: InventoryLocation) => value.region === props.selectedRegion.name
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
  }, [homeProps.inventoryLocations, props.selectedRegion]);

  useEffect(() => {
    if (cellarOptions.length <= 0) {
      return;
    }

    setSelectedCellarId(homeLocalProps.selectedInventoryLocationId);
  }, [homeLocalProps.selectedInventoryLocationId, cellarOptions]);

  useEffect(() => {
    if (!props.selectedRegion || countryOptions.length <= 0) {
      return;
    }

    const region = props.selectedRegion as Region;
    const country = region.countries[0];
    const selectedCountry = countryOptions.find(
      (value) => value.id === country?.iso_2
    );

    setSelectedCountryId(selectedCountry?.id ?? '');
    setSelectedRegionId('');
  }, [countryOptions, props.selectedRegion]);

  useEffect(() => {
    if (countryOptions.length <= 0 || selectedCountryId.length <= 0) {
      return;
    }

    const regions: OptionProps[] = [];
    const selectedCountryOption = countryOptions.find(
      (value) => value.id === selectedCountryId
    );
    for (const region of props.regions as Region[]) {
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
    if (!props.selectedRegion || regionOptions.length <= 0) {
      return;
    }

    setSelectedRegionId(props.selectedRegion.id);
  }, [regionOptions, props.selectedRegion]);

  return (
    <>
      <ResponsiveDesktop>
        <StoreDesktopComponent
          previewsContainerRef={previewsContainerRef}
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
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <StoreMobileComponent
          previewsContainerRef={previewsContainerRef}
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
        />
      </ResponsiveMobile>
    </>
  );
}
