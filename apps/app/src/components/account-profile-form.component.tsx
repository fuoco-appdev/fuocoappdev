import { useEffect, ChangeEvent, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import StoreController from '../controllers/store.controller';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';
import { AccountProfileFormDesktopComponent } from './desktop/account-profile-form.desktop.component';
import { AccountProfileFormMobileComponent } from './mobile/account-profile-form.mobile.component';

export interface ProfileFormOnChangeCallbacks {
  firstName?: (event: ChangeEvent<HTMLInputElement>) => void;
  lastName?: (event: ChangeEvent<HTMLInputElement>) => void;
  phoneNumber?: (
    value: string,
    data: {} | CountryDataProps,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    formattedValue: string
  ) => void;
}

export interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface AccountProfileFormProps {
  values?: ProfileFormValues;
  errors?: ProfileFormErrors;
  onChangeCallbacks?: ProfileFormOnChangeCallbacks;
}

export interface AccountProfileFormResponsiveProps
  extends AccountProfileFormProps {
  selectedCountry: string;
}

export default function AccountProfileFormComponent({
  values,
  errors,
  onChangeCallbacks,
}: AccountProfileFormProps): JSX.Element {
  const [storeProps] = useObservable(StoreController.model.store);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    if (!storeProps.selectedRegion) {
      return;
    }

    for (const country of storeProps.selectedRegion.countries) {
      setSelectedCountry(country?.iso_2);
    }
  }, [storeProps.selectedRegion]);

  return (
    <>
      <ResponsiveDesktop>
        <AccountProfileFormDesktopComponent
          values={values}
          errors={errors}
          onChangeCallbacks={onChangeCallbacks}
          selectedCountry={selectedCountry}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountProfileFormMobileComponent
          values={values}
          errors={errors}
          onChangeCallbacks={onChangeCallbacks}
          selectedCountry={selectedCountry}
        />
      </ResponsiveMobile>
    </>
  );
}
