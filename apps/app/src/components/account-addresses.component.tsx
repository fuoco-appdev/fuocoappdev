import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-addresses.module.scss';
import { Alert, Button, Dropdown, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { Customer, Address } from '@medusajs/medusa';
import AddressItemComponent from './address-item.component';
import AddressFormComponent from './address-form.component';

function AccountAddressesDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);

  return <></>;
}

function AccountAddressesMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();
  const [openAddDropdown, setOpenAddDropdown] = useState<boolean>(false);
  const [openEditDropdown, setOpenEditDropdown] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

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

  const customer = props.customer as Customer | undefined;
  const selectedAddress = props.selectedAddress as Address | undefined;
  return (
    <div className={styles['root']}>
      <div className={styles['addresses-text-container']}>
        <div className={styles['addresses-text']}>{t('addresses')}</div>
        <div>
          <Button
            rounded={true}
            icon={<Line.Add size={24} color={'#2A2A5F'} />}
            type={'text'}
            rippleProps={{
              color: 'rgba(42, 42, 95, .35)',
            }}
            touchScreen={true}
            onClick={() => setOpenAddDropdown(true)}
          />
        </div>
      </div>
      <div className={styles['address-list-container']}>
        {customer && customer?.shipping_addresses.length > 0 ? (
          customer?.shipping_addresses?.map((value: Address) => (
            <AddressItemComponent
              key={value.id}
              address={value}
              onEdit={() => {
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
              }}
              onDelete={() => {
                AccountController.updateSelectedAddress(value);
                setDeleteModalVisible(true);
              }}
            />
          ))
        ) : (
          <div className={styles['no-addresses-text']}>{t('noAddresses')}</div>
        )}
      </div>
      <Dropdown
        open={openAddDropdown}
        touchScreen={true}
        onClose={() => setOpenAddDropdown(false)}
      >
        <div className={styles['add-address-container']}>
          <AddressFormComponent
            isAuthenticated={true}
            values={props.shippingForm}
            errors={props.shippingFormErrors}
            onChangeCallbacks={{
              firstName: (event) =>
                AccountController.updateShippingAddress({
                  firstName: event.target.value,
                }),
              lastName: (event) =>
                AccountController.updateShippingAddress({
                  lastName: event.target.value,
                }),
              company: (event) =>
                AccountController.updateShippingAddress({
                  company: event.target.value,
                }),
              address: (event) =>
                AccountController.updateShippingAddress({
                  address: event.target.value,
                }),
              apartments: (event) =>
                AccountController.updateShippingAddress({
                  apartments: event.target.value,
                }),
              postalCode: (event) =>
                AccountController.updateShippingAddress({
                  postalCode: event.target.value,
                }),
              city: (event) =>
                AccountController.updateShippingAddress({
                  city: event.target.value,
                }),
              country: (index, id, value) =>
                AccountController.updateShippingAddress({
                  countryCode: id,
                }),
              region: (index, id, value) =>
                AccountController.updateShippingAddress({
                  region: value,
                }),
              phoneNumber: (value, event, formattedValue) =>
                AccountController.updateShippingAddress({
                  phoneNumber: value,
                }),
            }}
          />
          <div className={styles['add-address-button-container']}>
            <Button
              classNames={{
                button: styles['add-address-button'],
              }}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              touchScreen={true}
              block={true}
              size={'large'}
              onClick={async () => {
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
                  props.shippingForm
                );
                if (errors) {
                  AccountController.updateShippingAddressErrors(errors);
                  return;
                }

                await AccountController.addAddressAsync(props.shippingForm);
                setOpenAddDropdown(false);
              }}
            >
              {t('addAddress')}
            </Button>
          </div>
        </div>
      </Dropdown>
      <Dropdown
        open={openEditDropdown}
        touchScreen={true}
        onClose={() => setOpenEditDropdown(false)}
      >
        <div className={styles['edit-address-container']}>
          <AddressFormComponent
            isAuthenticated={true}
            values={props.editShippingForm}
            errors={props.editShippingFormErrors}
            onChangeCallbacks={{
              firstName: (event) =>
                AccountController.updateEditShippingAddress({
                  firstName: event.target.value,
                }),
              lastName: (event) =>
                AccountController.updateEditShippingAddress({
                  lastName: event.target.value,
                }),
              company: (event) =>
                AccountController.updateEditShippingAddress({
                  company: event.target.value,
                }),
              address: (event) =>
                AccountController.updateEditShippingAddress({
                  address: event.target.value,
                }),
              apartments: (event) =>
                AccountController.updateEditShippingAddress({
                  apartments: event.target.value,
                }),
              postalCode: (event) =>
                AccountController.updateEditShippingAddress({
                  postalCode: event.target.value,
                }),
              city: (event) =>
                AccountController.updateEditShippingAddress({
                  city: event.target.value,
                }),
              country: (index, id, value) =>
                AccountController.updateEditShippingAddress({
                  countryCode: id,
                }),
              region: (index, id, value) =>
                AccountController.updateEditShippingAddress({
                  region: value,
                }),
              phoneNumber: (value, event, formattedValue) =>
                AccountController.updateEditShippingAddress({
                  phoneNumber: value,
                }),
            }}
          />
          <div className={styles['edit-address-button-container']}>
            <Button
              classNames={{
                button: styles['edit-address-button'],
              }}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              touchScreen={true}
              block={true}
              size={'large'}
              onClick={async () => {
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
              }}
            >
              {t('applyChanges')}
            </Button>
          </div>
        </div>
      </Dropdown>
      <Modal
        classNames={{
          overlay: styles['overlay'],
        }}
        visible={deleteModalVisible}
        onConfirm={() => {
          AccountController.deleteAddressAsync(selectedAddress?.id);
          setDeleteModalVisible(false);
        }}
        onCancel={() => {
          AccountController.updateSelectedAddress(undefined);
          setDeleteModalVisible(false);
        }}
        title={t('removeAddress') ?? ''}
        description={
          t('removeAddressDescription', {
            address_1: selectedAddress?.address_1,
            address_2: selectedAddress?.address_2,
            postal_code: selectedAddress?.postal_code,
            city: selectedAddress?.city,
            province: selectedAddress?.province,
            country_code: selectedAddress?.country_code?.toUpperCase(),
          }) ?? ''
        }
      />
    </div>
  );
}

export default function AccountAddressesComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountAddressesDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountAddressesMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
