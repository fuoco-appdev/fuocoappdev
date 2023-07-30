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

function StoreDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(StoreController.model.store);

  return <></>;
}

function StoreMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const previewsContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [cellarOptions, setCellarOptions] = useState<OptionProps[]>([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(0);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [selectedCellarIndex, setSelectedCellarIndex] = useState<number>(0);
  const [props] = useObservable(StoreController.model.store);
  const [homeProps] = useObservable(HomeController.model.store);
  const { t, i18n } = useTranslation();

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
              className={styles['country-flag-mobile']}
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
    <div ref={rootRef} className={styles['root-mobile']}>
      <div className={styles['top-bar-container-mobile']}>
        <div className={styles['search-container-mobile']}>
          <div className={styles['search-input-root']}>
            <Input
              value={props.input}
              classNames={{
                container: styles['search-input-container-mobile'],
                input: styles['search-input-mobile'],
              }}
              placeholder={t('search') ?? ''}
              icon={<Line.Search size={24} color={'#2A2A5F'} />}
              onChange={(event) =>
                StoreController.updateInput(event.target.value)
              }
            />
          </div>
          <div>
            <Button
              classNames={{
                container: styles['filter-container'],
                button: styles['filter-button'],
              }}
              onClick={() => setOpenFilter(true)}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              block={true}
              icon={<Line.FilterList size={24} color={'#fff'} />}
              rounded={true}
            />
          </div>
        </div>
        <div className={styles['tab-container-mobile']}>
          <Tabs
            classNames={{
              tabButton: styles['tab-button'],
              selectedTabButton: styles['selected-tab-button'],
              tabSliderPill: styles['tab-slider-pill'],
            }}
            removable={true}
            type={'pills'}
            activeId={props.selectedTab}
            onChange={(id) =>
              StoreController.updateSelectedTabAsync(
                id.length > 0 ? (id as ProductTabs) : undefined
              )
            }
            tabs={[
              {
                id: ProductTabs.New,
                label: t('new') ?? 'New',
              },
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
                label: t('rose') ?? 'Rosé',
              },
              {
                id: ProductTabs.Spirits,
                label: t('spirits') ?? 'Spirits',
              },
            ]}
          />
        </div>
      </div>
      <div
        className={styles['scroll-container-mobile']}
        ref={previewsContainerRef}
      >
        <InfiniteScroll
          dataLength={props.previews.length}
          next={() => StoreController.onNextScrollAsync()}
          className={styles['scroll-mobile']}
          hasMore={props.hasMorePreviews}
          height={previewsContainerRef.current?.clientHeight ?? 0 - 8}
          loader={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
        >
          {props.previews.map((preview: Product, index: number) => (
            <ProductPreviewComponent
              parentRef={rootRef}
              key={index}
              preview={preview}
              onClick={() => {
                StoreController.updateSelectedPreview(preview);
              }}
              onRest={() => {
                navigate(`${RoutePaths.Store}/${preview.id}`);
              }}
            />
          ))}
        </InfiniteScroll>
      </div>
      <Dropdown
        open={openFilter}
        touchScreen={true}
        onClose={() => setOpenFilter(false)}
      >
        <div className={styles['filter-content-mobile']}>
          <Listbox
            classNames={{
              formLayout: {
                label: styles['listbox-form-layout-label'],
              },
              listbox: styles['listbox'],
              chevron: styles['listbox-chevron'],
              label: styles['listbox-label'],
            }}
            touchScreen={true}
            label={t('country') ?? ''}
            options={countryOptions}
            defaultIndex={selectedCountryIndex}
            onChange={(index: number) => setSelectedCountryIndex(index)}
          />
          <Listbox
            classNames={{
              formLayout: {
                label: styles['listbox-form-layout-label'],
              },
              listbox: styles['listbox'],
              chevron: styles['listbox-chevron'],
              label: styles['listbox-label'],
            }}
            touchScreen={true}
            label={t('region') ?? ''}
            options={regionOptions}
            defaultIndex={selectedRegionIndex}
            onChange={(index: number) => setSelectedRegionIndex(index)}
          />
          <Listbox
            classNames={{
              formLayout: {
                label: styles['listbox-form-layout-label'],
              },
              listbox: styles['listbox'],
              chevron: styles['listbox-chevron'],
              label: styles['listbox-label'],
            }}
            touchScreen={true}
            label={t('cellar') ?? ''}
            options={cellarOptions}
            defaultIndex={selectedCellarIndex}
            onChange={(index: number) => setSelectedCellarIndex(index)}
          />
          <Button
            classNames={{
              container: styles['apply-button-container-mobile'],
              button: styles['apply-button'],
            }}
            rippleProps={{
              color: 'rgba(233, 33, 66, .35)',
            }}
            block={true}
            size={'large'}
            onClick={() => {
              StoreController.applyFilterAsync(
                regionOptions[selectedRegionIndex].id ?? '',
                cellarOptions[selectedCellarIndex].id ?? ''
              );
              setTimeout(() => setOpenFilter(false), 250);
            }}
          >
            {t('apply')}
          </Button>
        </div>
      </Dropdown>
    </div>
  );
}

export default function StoreComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <StoreDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <StoreMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
