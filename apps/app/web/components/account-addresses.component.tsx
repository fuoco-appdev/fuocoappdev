import { HttpTypes } from '@medusajs/types';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DIContext } from './app.component';
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
  onAddAddressAsync: () => void;
  onEditAddressAsync: () => void;
  onDeleteAddressConfirmedAsync: () => void;
  onDeleteAddressCanceledAsync: () => void;
  onEditAddressButtonClicked: (value: HttpTypes.AdminCustomerAddress) => void;
  onDeleteAddressButtonClicked: (value: HttpTypes.AdminCustomerAddress) => void;
  openAddDropdown: boolean;
  setOpenAddDropdown: (value: boolean) => void;
  openEditDropdown: boolean;
  setOpenEditDropdown: (value: boolean) => void;
  deleteModalVisible: boolean;
}

export default function AccountAddressesComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const { AccountController, BucketService } = React.useContext(DIContext);
  const { shippingForm, selectedAddress, suspense } = AccountController.model;
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

    const errors = AccountController.getAddressFormErrors(shippingForm);
    if (errors) {
      AccountController.updateShippingAddressErrors(errors);
      return;
    }

    await AccountController.addAddressAsync(shippingForm);
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
    AccountController.deleteAddressAsync(selectedAddress?.id);
    setDeleteModalVisible(false);
  };

  const onDeleteAddressCanceledAsync = async () => {
    AccountController.updateSelectedAddress(undefined);
    setDeleteModalVisible(false);
  };

  const onEditAddressButtonClicked = (
    value: HttpTypes.AdminCustomerAddress
  ) => {
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

  const onDeleteAddressButtonClicked = (
    value: HttpTypes.AdminCustomerAddress
  ) => {
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

  if (suspense) {
    return suspenceComponent;
  }

  return (
    <React.Suspense fallback={suspenceComponent}>
      <AuthenticatedComponent>
        <AccountAddressesDesktopComponent
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
