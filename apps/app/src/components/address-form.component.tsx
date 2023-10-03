import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import styles from './address-form.module.scss';
import {
  Button,
  Input,
  InputPhoneNumber,
  Line,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import { useTranslation } from 'react-i18next';
import StoreController from '../controllers/store.controller';
import { Region, Country } from '@medusajs/medusa';
import ReactCountryFlag from 'react-country-flag';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';
import { lazy } from '@loadable/component';

const AddressFormDesktopComponent = lazy(
  () => import('./desktop/address-form.desktop.component')
);
const AddressFormMobileComponent = lazy(
  () => import('./mobile/address-form.mobile.component')
);

export interface AddressFormOnChangeCallbacks {
  email?: (event: ChangeEvent<HTMLInputElement>) => void;
  firstName?: (event: ChangeEvent<HTMLInputElement>) => void;
  lastName?: (event: ChangeEvent<HTMLInputElement>) => void;
  company?: (event: ChangeEvent<HTMLInputElement>) => void;
  address?: (event: ChangeEvent<HTMLInputElement>) => void;
  apartments?: (event: ChangeEvent<HTMLInputElement>) => void;
  postalCode?: (event: ChangeEvent<HTMLInputElement>) => void;
  city?: (event: ChangeEvent<HTMLInputElement>) => void;
  country?: (id: string, value: string) => void;
  region?: (id: string, value: string) => void;
  phoneNumber?: (
    value: string,
    data: {} | CountryDataProps,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    formattedValue: string
  ) => void;
}

export interface AddressFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  apartments?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  region?: string;
  phoneNumber?: string;
}

export interface AddressFormValues {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address?: string;
  apartments?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
  phoneNumber?: string;
}

export interface AddressFormProps {
  isAuthenticated?: boolean;
  values?: AddressFormValues;
  errors?: AddressFormErrors;
  onChangeCallbacks?: AddressFormOnChangeCallbacks;
  isComplete?: boolean;
  onEdit?: () => void;
}

export interface AddressFormResponsiveProps extends AddressFormProps {
  countryOptions: OptionProps[];
  regionOptions: OptionProps[];
  selectedCountryId: string;
  setSelectedCountryId: (value: string) => void;
  selectedRegionId: string;
  setSelectedRegionId: (value: string) => void;
  fullName: string;
  location: string;
  company: string;
  phoneNumber: string;
  email: string;
}

export default function AddressFormComponent({
  isAuthenticated = false,
  values,
  errors,
  onChangeCallbacks,
  isComplete = false,
  onEdit,
}: AddressFormProps): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (countryOptions.length > 0) {
      const country = countryOptions.find(
        (value) => value.id === selectedCountryId
      );
      if (country) {
        onChangeCallbacks?.country?.(country?.id ?? '', country?.value ?? '');
      }
    }

    if (regionOptions.length > 0) {
      const region = regionOptions.find(
        (value) => value.id === selectedRegionId
      );
      if (region) {
        onChangeCallbacks?.region?.(region?.id ?? '', region?.value ?? '');
      }
    }
  }, [countryOptions, regionOptions]);

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
  }, [storeProps.regions]);

  useEffect(() => {
    if (!storeProps.selectedRegion || !countryOptions) {
      return;
    }

    const selectedCountry = storeProps.selectedRegion.countries[0];
    setSelectedCountryId(selectedCountry.id);
    setSelectedCountry(selectedCountry?.iso_2);
    setSelectedRegionId('');
  }, [countryOptions, storeProps.selectedRegion]);

  useEffect(() => {
    if (countryOptions.length <= 0) {
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
    const country = countryOptions.find(
      (value) => value.id === values?.countryCode
    );
    const region = regionOptions.find(
      (value) => value.value === values?.region
    );

    if (country) {
      setSelectedCountryId(country.id);
    }

    if (region) {
      setSelectedRegionId(region.id);
    }

    setLocation(getLocationText());
  }, [values, countryOptions, regionOptions]);

  const getLocationText = (): string => {
    let locationValue = `${values?.address}`;
    if (values?.apartments) {
      locationValue += `, ${values?.apartments}`;
    }
    locationValue += `, ${values?.postalCode}, ${values?.city}`;

    const region = regionOptions.find(
      (value) => value.value === values?.region
    );
    locationValue += `, ${region?.value}`;

    const country = countryOptions.find(
      (value) => value.id === values?.countryCode
    );
    locationValue += `, ${country?.value}`;
    return locationValue;
  };

  useEffect(() => {
    if (isComplete) {
      setFullName(`${values?.firstName} ${values?.lastName}`);

      setLocation(getLocationText());

      setCompany(values?.company ?? '');
      setPhoneNumber(values?.phoneNumber ?? '');
      setEmail(values?.email ?? '');
    }
  }, [isComplete]);

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <div />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <ResponsiveDesktop>
        <AddressFormDesktopComponent
          isAuthenticated={isAuthenticated}
          values={values}
          errors={errors}
          onChangeCallbacks={onChangeCallbacks}
          isComplete={isComplete}
          onEdit={onEdit}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          fullName={fullName}
          location={location}
          company={company}
          phoneNumber={phoneNumber}
          email={email}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AddressFormMobileComponent
          isAuthenticated={isAuthenticated}
          values={values}
          errors={errors}
          onChangeCallbacks={onChangeCallbacks}
          isComplete={isComplete}
          onEdit={onEdit}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
          selectedCountryId={selectedCountryId}
          selectedRegionId={selectedRegionId}
          fullName={fullName}
          location={location}
          company={company}
          phoneNumber={phoneNumber}
          email={email}
          setSelectedCountryId={setSelectedCountryId}
          setSelectedRegionId={setSelectedRegionId}
        />
      </ResponsiveMobile>
    </React.Suspense>
  );
}
