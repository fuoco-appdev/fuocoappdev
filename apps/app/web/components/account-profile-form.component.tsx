import { CountryDataProps } from '@fuoco.appdev/web-components/dist/cjs/src/components/input-phone-number/country-data';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { DIContext } from './app.component';
import { AccountProfileFormSuspenseDesktopComponent } from './desktop/suspense/account-profile-form.suspense.desktop.component';
import { AccountProfileFormSuspenseMobileComponent } from './mobile/suspense/account-profile-form.suspense.mobile.component';

const AccountProfileFormDesktopComponent = React.lazy(
  () => import('./desktop/account-profile-form.desktop.component')
);
const AccountProfileFormMobileComponent = React.lazy(
  () => import('./mobile/account-profile-form.mobile.component')
);

export interface ProfileFormOnChangeCallbacks {
  firstName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lastName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  username?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  birthday?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sex?: (value: 'male' | 'female') => void;
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
  username?: string;
  birthday?: string;
  sex?: string;
  phoneNumber?: string;
}

export interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  username?: string;
  birthday?: string;
  sex?: 'male' | 'female';
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

function AccountProfileFormComponent({
  values,
  errors,
  onChangeCallbacks,
}: AccountProfileFormProps): JSX.Element {
  const { StoreController } = React.useContext(DIContext);
  const { suspense, selectedRegion } = StoreController.model;
  const [selectedCountry, setSelectedCountry] = React.useState<string>('');
  React.useEffect(() => {
    if (!selectedRegion) {
      return;
    }

    for (const country of selectedRegion.countries ?? []) {
      setSelectedCountry(country?.iso_2 ?? '');
    }
  }, [selectedRegion]);

  const suspenceComponent = (
    <>
      <AccountProfileFormSuspenseDesktopComponent />
      <AccountProfileFormSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AccountProfileFormDesktopComponent
        values={values}
        errors={errors}
        onChangeCallbacks={onChangeCallbacks}
        selectedCountry={selectedCountry}
      />
      <AccountProfileFormMobileComponent
        values={values}
        errors={errors}
        onChangeCallbacks={onChangeCallbacks}
        selectedCountry={selectedCountry}
      />
    </React.Suspense>
  );
}

export default observer(AccountProfileFormComponent);
