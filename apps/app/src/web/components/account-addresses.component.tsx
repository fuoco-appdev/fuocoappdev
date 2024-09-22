import { Address } from '@medusajs/medusa';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import AccountController from '../../controllers/account.controller';
import { AccountState } from '../../models/account.model';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountAddressesSuspenseDesktopComponent } from './desktop/suspense/account-addresses.suspense.desktop.component';
import { AccountAddressesSuspenseMobileComponent } from './mobile/suspense/account-addresses.suspense.mobile.component';

const AccountAddressesDesktopComponent = React.lazy(
  () => import('./desktop/account-addresses.desktop.component')
);
const AccountAddressesMobileComponent = React.lazy(
  () => import('./mobile/account-addresses.mobile.component')
);

export interface AccountAddressResponsiveProps {
  accountProps: AccountState;
  onAddAddressAsync: () => void;
  onEditAddressAsync: () => void;
  onDeleteAddressConfirmedAsync: () => void;
  onDeleteAddressCanceledAsync: () => void;
  onEditAddressButtonClicked: (value: Address) => void;
  onDeleteAddressButtonClicked: (value: Address) => void;
  openAddDropdown: boolean;
  setOpenAddDropdown: (value: boolean) => void;
  openEditDropdown: boolean;
  setOpenEditDropdown: (value: boolean) => void;
  deleteModalVisible: boolean;
}

export default function AccountAddressesComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [accountProps] = useObservable(AccountController.model.store);
  const [accountDebugProps] = useObservable(AccountController.model.debugStore);
  const [openAddDropdown, setOpenAddDropdown] = React.useState<boolean>(false);
  const [openEditDropdown, setOpenEditDropdown] =
    React.useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] =
    React.useState<boolean>(false);

  const onAddAddressAsync = async () => {
    AccountController.updateShippingAddressErrors({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      address: undefined,
      apartments: undefined,
      postalCode: undefined,
      city: undefined,
      region: undefined,
      phoneNumber: undefined,
    });

    const errors = AccountController.getAddressFormErrors(
      accountProps.shippingForm
    );
    if (errors) {
      AccountController.updateShippingAddressErrors(errors);
      return;
    }

    await AccountController.addAddressAsync(accountProps.shippingForm);
    setOpenAddDropdown(false);
  };

  const onEditAddressAsync = async () => {
    AccountController.updateEditShippingAddressErrors({
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      company: undefined,
      address: undefined,
      apartments: undefined,
      postalCode: undefined,
      city: undefined,
      region: undefined,
      phoneNumber: undefined,
    });

    const errors = AccountController.getAddressFormErrors(
      AccountController.model.editShippingForm
    );
    if (errors) {
      AccountController.updateEditShippingAddressErrors(errors);
      return;
    }

    await AccountController.updateAddressAsync(
      AccountController.model.selectedAddress?.id
    );
    AccountController.updateSelectedAddress(undefined);
    setOpenEditDropdown(false);
  };

  const onDeleteAddressConfirmedAsync = async () => {
    const selectedAddress = accountProps.selectedAddress as Address | undefined;
    AccountController.deleteAddressAsync(selectedAddress?.id);
    setDeleteModalVisible(false);
  };

  const onDeleteAddressCanceledAsync = async () => {
    AccountController.updateSelectedAddress(undefined);
    setDeleteModalVisible(false);
  };

  const onEditAddressButtonClicked = (value: Address) => {
    AccountController.updateSelectedAddress(value);
    AccountController.updateEditShippingAddress({
      firstName: value.first_name ?? '',
      lastName: value.last_name ?? '',
      company: value.company ?? '',
      address: value.address_1 ?? '',
      apartments: value.address_2 ?? '',
      postalCode: value.postal_code ?? '',
      city: value.city ?? '',
      countryCode: value.country_code ?? '',
      region: value.province ?? '',
      phoneNumber: value.phone ?? '',
    });
    setOpenEditDropdown(true);
  };

  const onDeleteAddressButtonClicked = (value: Address) => {
    AccountController.updateSelectedAddress(value);
    setDeleteModalVisible(true);
  };

  React.useEffect(() => {
    AccountController.updateAddressErrorStrings({
      email: t('fieldEmptyError') ?? '',
      firstName: t('fieldEmptyError') ?? '',
      lastName: t('fieldEmptyError') ?? '',
      address: t('fieldEmptyError') ?? '',
      postalCode: t('fieldEmptyError') ?? '',
      city: t('fieldEmptyError') ?? '',
      phoneNumber: t('fieldEmptyError') ?? '',
    });
  }, [i18n.language]);

  const suspenceComponent = (
    <>
      <AccountAddressesSuspenseDesktopComponent />
      <AccountAddressesSuspenseMobileComponent />
    </>
  );

  if (accountDebugProps.suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountAddressesDesktopComponent
          accountProps={accountProps}
          onAddAddressAsync={onAddAddressAsync}
          onEditAddressAsync={onEditAddressAsync}
          onDeleteAddressConfirmedAsync={onDeleteAddressConfirmedAsync}
          onDeleteAddressCanceledAsync={onDeleteAddressCanceledAsync}
          onEditAddressButtonClicked={onEditAddressButtonClicked}
          onDeleteAddressButtonClicked={onDeleteAddressButtonClicked}
          openAddDropdown={openAddDropdown}
          openEditDropdown={openEditDropdown}
          deleteModalVisible={deleteModalVisible}
          setOpenAddDropdown={setOpenAddDropdown}
          setOpenEditDropdown={setOpenEditDropdown}
        />
        <AccountAddressesMobileComponent
          accountProps={accountProps}
          onAddAddressAsync={onAddAddressAsync}
          onEditAddressAsync={onEditAddressAsync}
          onDeleteAddressConfirmedAsync={onDeleteAddressConfirmedAsync}
          onDeleteAddressCanceledAsync={onDeleteAddressCanceledAsync}
          onEditAddressButtonClicked={onEditAddressButtonClicked}
          onDeleteAddressButtonClicked={onDeleteAddressButtonClicked}
          openAddDropdown={openAddDropdown}
          openEditDropdown={openEditDropdown}
          deleteModalVisible={deleteModalVisible}
          setOpenAddDropdown={setOpenAddDropdown}
          setOpenEditDropdown={setOpenEditDropdown}
        />
      </AuthenticatedComponent>
    </React.Suspense>
  );
}
