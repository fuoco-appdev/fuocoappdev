import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-addresses.module.scss';
import { Alert, Button, Dropdown, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { Customer, Address } from '@medusajs/medusa';
import AddressItemComponent from './address-item.component';
import AddressFormComponent from './address-form.component';
import { AccountState } from '../models/account.model';
import { AuthenticatedComponent } from './authenticated.component';
import { lazy } from '@loadable/component';
import { AccountAddressesSuspenseDesktopComponent } from './desktop/suspense/account-addresses.suspense.desktop.component';
import React from 'react';
import { AccountAddressesSuspenseMobileComponent } from './mobile/suspense/account-addresses.suspense.mobile.component';
import { AccountAddressesSuspenseTabletComponent } from './tablet/suspense/account-addresses.suspense.tablet.component';

const AccountAddressesDesktopComponent = lazy(
  () => import('./desktop/account-addresses.desktop.component')
);
const AccountAddressesTabletComponent = lazy(
  () => import('./tablet/account-addresses.tablet.component')
);
const AccountAddressesMobileComponent = lazy(
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
  const [openAddDropdown, setOpenAddDropdown] = useState<boolean>(false);
  const [openEditDropdown, setOpenEditDropdown] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

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

  useEffect(() => {
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
      <AccountAddressesSuspenseTabletComponent />
      <AccountAddressesSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
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
        <AccountAddressesTabletComponent
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
