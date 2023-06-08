import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import styles from './checkout.module.scss';
import {
  Button,
  Card,
  Checkbox,
  Input,
  InputPhoneNumber,
  Listbox,
  OptionProps,
  Line,
} from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Region, Country } from '@medusajs/medusa';
import ReactCountryFlag from 'react-country-flag';
import { useObservable } from '@ngneat/use-observable';
import StoreController from '../controllers/store.controller';
import CheckoutController from '../controllers/checkout.controller';

function CheckoutDesktopComponent(): JSX.Element {
  return <></>;
}

function CheckoutMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [countryOptions, setCountryOptions] = useState<OptionProps[]>([]);
  const [regionOptions, setRegionOptions] = useState<OptionProps[]>([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(0);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [props] = useObservable(CheckoutController.model.store);
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

  return (
    <div ref={rootRef} className={styles['root']}>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['step-count']}>1</div>
            <div className={styles['header-title']}>{t('shippingAddress')}</div>
          </div>
          <form>
            <Input
              classNames={{
                formLayout: { label: styles['input-form-layout-label'] },
                input: styles['input'],
                container: styles['input-container'],
              }}
              label={t('email') ?? ''}
              onChange={() => {}}
            />
            <div className={styles['horizontal-input-container']}>
              <Input
                classNames={{
                  formLayout: { label: styles['input-form-layout-label'] },
                  input: styles['input'],
                  container: styles['input-container'],
                }}
                label={t('firstName') ?? ''}
                onChange={() => {}}
              />
              <Input
                classNames={{
                  formLayout: { label: styles['input-form-layout-label'] },
                  input: styles['input'],
                  container: styles['input-container'],
                }}
                label={t('lastName') ?? ''}
                onChange={() => {}}
              />
            </div>
            <Input
              classNames={{
                formLayout: { label: styles['input-form-layout-label'] },
                input: styles['input'],
                container: styles['input-container'],
              }}
              label={t('company') ?? ''}
              onChange={() => {}}
            />
            <Input
              classNames={{
                formLayout: { label: styles['input-form-layout-label'] },
                input: styles['input'],
                container: styles['input-container'],
              }}
              label={t('address') ?? ''}
              onChange={() => {}}
            />
            <Input
              classNames={{
                formLayout: { label: styles['input-form-layout-label'] },
                input: styles['input'],
                container: styles['input-container'],
              }}
              label={t('appartments') ?? ''}
              onChange={() => {}}
            />
            <div className={styles['horizontal-input-container']}>
              <Input
                classNames={{
                  formLayout: { label: styles['input-form-layout-label'] },
                  input: styles['input'],
                  container: styles['input-container'],
                }}
                label={t('postalCode') ?? ''}
                onChange={() => {}}
              />
              <Input
                classNames={{
                  formLayout: { label: styles['input-form-layout-label'] },
                  input: styles['input'],
                  container: styles['input-container'],
                }}
                label={t('city') ?? ''}
                onChange={() => {}}
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
            <InputPhoneNumber
              parentRef={rootRef}
              classNames={{
                formLayout: { label: styles['input-form-layout-label'] },
                inputPhoneNumber: styles['input'],
                inputContainer: styles['input-container'],
                countryName: styles['option-name'],
              }}
              iconColor={'#2A2A5F'}
              label={t('phoneNumber') ?? ''}
              touchScreen={true}
              country={selectedCountry}
            />
            <Checkbox
              classNames={{
                container: styles['checkbox-container'],
                labelContainerLabelSpan: styles['checkbox-label'],
              }}
              label={t('sameAsBillingAddress') ?? ''}
              checked={props.sameAsBillingAddress}
            />
            <Button
              classNames={{ button: styles['submit-button'] }}
              block={true}
              size={'large'}
              icon={<Line.DeliveryDining size={24} />}
            >
              {t('continueToDelivery')}
            </Button>
          </form>
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['step-count']}>2</div>
            <div className={styles['header-title']}>{t('delivery')}</div>
          </div>
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('giftCard')}</div>
          </div>
        </div>
      </div>
      <div className={styles['card-container']}>
        <div className={styles['card-content-container']}>
          <div className={styles['header-container']}>
            <div className={styles['header-title']}>{t('discount')}</div>
          </div>
        </div>
      </div>
      <div className={styles['card-container']}></div>
    </div>
  );
}

export default function CheckoutComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CheckoutDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CheckoutMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
