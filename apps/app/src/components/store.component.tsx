import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { Country, Region, WinePreview } from '../models/store.model';
import ProductPreviewComponent from './product-preview.component';
import ReactCountryFlag from 'react-country-flag';

function StoreDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(StoreController.model.store);

  return <></>;
}

function StoreMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(0);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [props] = useObservable(StoreController.model.store);
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
            tabs={[
              {
                id: 'best',
                label: 'Best of',
              },
              {
                id: 'new',
                label: 'New',
              },
              {
                id: 'white',
                label: 'White',
              },
              {
                id: 'red',
                label: 'Red',
              },
              {
                id: 'rose',
                label: 'Rosé',
              },
              {
                id: 'spirits',
                label: 'Spirits',
              },
            ]}
          />
        </div>
      </div>
      <div className={styles['wine-previews-container-mobile']}>
        {props.previews.map((preview: WinePreview, index: number) => (
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
          <Button
            classNames={{
              container: styles['apply-button-mobile'],
            }}
            block={true}
            size={'large'}
            onClick={() => {
              StoreController.applyFilterAsync(
                regionOptions[selectedRegionIndex].id ?? ''
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
