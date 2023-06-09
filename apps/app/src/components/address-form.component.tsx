import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './address-form.module.scss';
import {
  Button,
  Input,
  InputPhoneNumber,
  Line,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import { useTranslation } from 'react-i18next';
import StoreController from '../controllers/store.controller';
import { Region, Country } from '@medusajs/medusa';
import ReactCountryFlag from 'react-country-flag';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';

export interface AddressFormOnChangeCallbacks {
  email?: (event: ChangeEvent<HTMLInputElement>) => void;
  firstName?: (event: ChangeEvent<HTMLInputElement>) => void;
  lastName?: (event: ChangeEvent<HTMLInputElement>) => void;
  company?: (event: ChangeEvent<HTMLInputElement>) => void;
  address?: (event: ChangeEvent<HTMLInputElement>) => void;
  apartments?: (event: ChangeEvent<HTMLInputElement>) => void;
  postalCode?: (event: ChangeEvent<HTMLInputElement>) => void;
  city?: (event: ChangeEvent<HTMLInputElement>) => void;
  country?: (index: number, id: string, value: string) => void;
  region?: (index: number, id: string, value: string) => void;
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
  countryIndex?: number;
  regionIndex?: number;
  phoneNumber?: string;
}

export interface AddressFormProps {
  values?: AddressFormValues;
  errors?: AddressFormErrors;
  onChangeCallbacks?: AddressFormOnChangeCallbacks;
  isComplete?: boolean;
  onEdit?: () => void;
}

function AddressFormDesktopComponent({}: AddressFormProps): JSX.Element {
  return <div></div>;
}

function AddressFormMobileComponent({
  values,
  errors,
  onChangeCallbacks,
  isComplete = false,
  onEdit,
}: AddressFormProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(
    values?.countryIndex ?? 0
  );
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(
    values?.regionIndex ?? 0
  );
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [fullName, setFullName] = useState<string>('Lucas Fuoco');
  const [location, setLocation] = useState<string>(
    '1112 rue Estelle, J8E 2N9, Mont Tremblant, Quebec, Canada'
  );
  const [company, setCompany] = useState<string>('Cruthology');
  const [phoneNumber, setPhoneNumber] = useState<string>('+1-5148893132');
  const [email, setEmail] = useState<string>('lucasfuoco@gmail.com');
  const [storeProps] = useObservable(StoreController.model.store);
  const { t } = useTranslation();

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

    for (const country of storeProps.selectedRegion.countries) {
      const selectedCountryIndex = countryOptions.findIndex(
        (value) => value.id === country?.iso_2
      );
      if (selectedCountryIndex < 0) {
        continue;
      }

      setSelectedCountryIndex(selectedCountryIndex);
      console.log(selectedCountryIndex);
      setSelectedCountry(country?.iso_2);
      setSelectedRegionIndex(0);
      return;
    }
  }, [countryOptions, storeProps.selectedRegion]);

  useEffect(() => {
    if (countryOptions.length <= 0) {
      return;
    }

    const regions: OptionProps[] = [];
    const selectedCountryOption = countryOptions[selectedCountryIndex];
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
  }, [selectedCountryIndex, countryOptions]);

  useEffect(() => {
    if (isComplete) {
      setFullName(`${values?.firstName} ${values?.lastName}`);

      let locationValue = `${values?.address}`;
      if (values?.apartments) {
        locationValue += `, ${values?.apartments}`;
      }
      locationValue += `, ${values?.postalCode}, ${values?.city}`;

      const region = regionOptions.at(values?.regionIndex ?? 0);
      locationValue += `, ${region?.value}`;

      const country = countryOptions.at(values?.countryIndex ?? 0);
      locationValue += `, ${country?.value}`;
      setLocation(locationValue);

      setCompany(values?.company ?? '');
      setPhoneNumber(values?.phoneNumber ?? '');
      setEmail(values?.email ?? '');
    }
  }, [isComplete]);

  return !isComplete ? (
    <>
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={t('email') ?? ''}
        value={values?.email}
        error={errors?.email}
        onChange={onChangeCallbacks?.email}
      />
      <div className={styles['horizontal-input-container']}>
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('firstName') ?? ''}
          value={values?.firstName}
          error={errors?.firstName}
          onChange={onChangeCallbacks?.firstName}
        />
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('lastName') ?? ''}
          value={values?.lastName}
          error={errors?.lastName}
          onChange={onChangeCallbacks?.lastName}
        />
      </div>
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={`${t('company') ?? ''} (${t('optional') ?? ''})`}
        value={values?.company}
        error={errors?.company}
        onChange={onChangeCallbacks?.company}
      />
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={t('address') ?? ''}
        value={values?.address}
        error={errors?.address}
        onChange={onChangeCallbacks?.address}
      />
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={`${t('apartments') ?? ''} (${t('optional') ?? ''})`}
        value={values?.apartments}
        error={errors?.apartments}
        onChange={onChangeCallbacks?.apartments}
      />
      <div className={styles['horizontal-input-container']}>
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('postalCode') ?? ''}
          value={values?.postalCode}
          error={errors?.postalCode}
          onChange={onChangeCallbacks?.postalCode}
        />
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('city') ?? ''}
          value={values?.city}
          error={errors?.city}
          onChange={onChangeCallbacks?.city}
        />
      </div>
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
        error={errors?.country}
        options={countryOptions}
        defaultIndex={selectedCountryIndex}
        onChange={(index: number, id: string, value: string) => {
          setSelectedCountryIndex(index);
          onChangeCallbacks?.country?.(index, id, value);
        }}
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
        error={errors?.region}
        defaultIndex={selectedRegionIndex}
        onChange={(index: number, id: string, value: string) => {
          setSelectedRegionIndex(index);
          onChangeCallbacks?.region?.(index, id, value);
        }}
      />
      <InputPhoneNumber
        defaultValue={values?.phoneNumber}
        parentRef={rootRef}
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          inputPhoneNumber: styles['input'],
          inputContainer: styles['input-container'],
          countryName: styles['option-name'],
        }}
        iconColor={'#2A2A5F'}
        label={t('phoneNumber') ?? ''}
        error={errors?.phoneNumber}
        touchScreen={true}
        country={selectedCountry}
        onChange={onChangeCallbacks?.phoneNumber}
      />
    </>
  ) : (
    <div className={styles['completed-container']}>
      <div className={styles['completed-details-container']}>
        <Line.CheckCircle size={24} />
        <div className={styles['completed-details']}>
          <div className={styles['completed-details-text']}>{fullName}</div>
          <div className={styles['completed-details-text']}>{location}</div>
          <div className={styles['completed-details-text']}>{company}</div>
          <div className={styles['completed-details-text']}>{phoneNumber}</div>
          <div className={styles['completed-details-text']}>{email}</div>
        </div>
      </div>
      <div className={styles['edit-button-container']}>
        <Button
          classNames={{
            button: styles['edit-button'],
          }}
          rippleProps={{
            color: 'rgba(133, 38, 122, .35)',
          }}
          size={'small'}
          type={'outline'}
          icon={<Line.Edit size={24} />}
          onClick={onEdit}
        >
          {t('edit')}
        </Button>
      </div>
    </div>
  );
}

export default function AddressFormComponent(
  props: AddressFormProps
): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AddressFormDesktopComponent {...props} />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AddressFormMobileComponent {...props} />
      </ResponsiveMobile>
    </>
  );
}
