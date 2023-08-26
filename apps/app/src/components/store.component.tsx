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
import InfiniteScroll from 'react-infinite-scroll-component';
import { center } from '@turf/turf';
import { StoreDesktopComponent } from './desktop/store.desktop.component';
import { StoreMobileComponent } from './mobile/store.mobile.component';

export interface StoreResponsiveProps {
  openFilter: boolean;
  countryOptions: OptionProps[];
  regionOptions: OptionProps[];
  cellarOptions: OptionProps[];
  selectedCountryIndex: number;
  selectedRegionIndex: number;
  selectedCellarIndex: number;
  setOpenFilter: (value: boolean) => void;
  setSelectedCountryIndex: (value: number) => void;
  setSelectedRegionIndex: (value: number) => void;
  setSelectedCellarIndex: (value: number) => void;
}

export default function StoreComponent(): JSX.Element {
  const [props] = useObservable(StoreController.model.store);
  const [homeProps] = useObservable(HomeController.model.store);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [cellarOptions, setCellarOptions] = useState<OptionProps[]>([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(0);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [selectedCellarIndex, setSelectedCellarIndex] = useState<number>(0);

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
        id: location.placeName ?? '',
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

    const locationIndex = cellarOptions.findIndex(
      (value) => value.id === homeProps.selectedInventoryLocation?.placeName
    );
    if (locationIndex > -1 && locationIndex !== selectedCellarIndex) {
      setSelectedCellarIndex(locationIndex);
    }
  }, [homeProps.selectedInventoryLocation, cellarOptions]);

  useEffect(() => {
    if (!props.selectedRegion || !countryOptions) {
      return;
    }

    for (const country of props.selectedRegion.countries) {
      const selectedCountryIndex = countryOptions.findIndex(
        (value) => value.id === country?.iso_2
      );
      if (selectedCountryIndex < 0) {
        continue;
      }

      setSelectedCountryIndex(selectedCountryIndex);
      setSelectedRegionIndex(0);
      return;
    }
  }, [countryOptions, props.selectedRegion]);

  useEffect(() => {
    if (countryOptions.length <= 0) {
      return;
    }

    const regions: OptionProps[] = [];
    const selectedCountryOption = countryOptions[selectedCountryIndex];
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
  }, [selectedCountryIndex, countryOptions]);

  return (
    <>
      <ResponsiveDesktop>
        <StoreDesktopComponent
          openFilter={openFilter}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          cellarOptions={cellarOptions}
          selectedCountryIndex={selectedCountryIndex}
          selectedRegionIndex={selectedRegionIndex}
          selectedCellarIndex={selectedCellarIndex}
          setOpenFilter={setOpenFilter}
          setSelectedCountryIndex={setSelectedCountryIndex}
          setSelectedRegionIndex={setSelectedRegionIndex}
          setSelectedCellarIndex={setSelectedCellarIndex}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <StoreMobileComponent
          openFilter={openFilter}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          cellarOptions={cellarOptions}
          selectedCountryIndex={selectedCountryIndex}
          selectedRegionIndex={selectedRegionIndex}
          selectedCellarIndex={selectedCellarIndex}
          setOpenFilter={setOpenFilter}
          setSelectedCountryIndex={setSelectedCountryIndex}
          setSelectedRegionIndex={setSelectedRegionIndex}
          setSelectedCellarIndex={setSelectedCellarIndex}
        />
      </ResponsiveMobile>
    </>
  );
}
