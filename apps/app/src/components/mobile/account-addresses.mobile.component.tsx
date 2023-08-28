import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-addresses.module.scss';
import { Alert, Button, Dropdown, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import { Customer, Address } from '@medusajs/medusa';
import AddressItemComponent from '../address-item.component';
import AddressFormComponent from '../address-form.component';
import { AccountAddressResponsiveProps } from '../account-addresses.component';

export function AccountAddressesMobileComponent({
  onAddAddressAsync,
  onEditAddressAsync,
  onDeleteAddressConfirmedAsync,
  onDeleteAddressCanceledAsync,
  onEditAddressButtonClicked,
  onDeleteAddressButtonClicked,
  openAddDropdown,
  openEditDropdown,
  deleteModalVisible,
  setOpenAddDropdown,
  setOpenEditDropdown,
}: AccountAddressResponsiveProps): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  const customer = props.customer as Customer | undefined;
  const selectedAddress = props.selectedAddress as Address | undefined;
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div
        className={[
          styles['addresses-text-container'],
          styles['addresses-text-container-mobile'],
        ].join(' ')}
      >
        <div
          className={[
            styles['addresses-text'],
            styles['addresses-text-mobile'],
          ].join(' ')}
        >
          {t('addresses')}
        </div>
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
      <div
        className={[
          styles['address-list-container'],
          styles['address-list-container-mobile'],
        ].join(' ')}
      >
        {customer && customer?.shipping_addresses?.length > 0 ? (
          customer?.shipping_addresses?.map((value: Address) => (
            <AddressItemComponent
              key={value.id}
              address={value}
              onEdit={() => onEditAddressButtonClicked(value)}
              onDelete={() => onDeleteAddressButtonClicked(value)}
            />
          ))
        ) : (
          <div
            className={[
              styles['no-addresses-text'],
              styles['no-addresses-text-mobile'],
            ].join(' ')}
          >
            {t('noAddresses')}
          </div>
        )}
      </div>
      <Dropdown
        open={openAddDropdown}
        touchScreen={true}
        onClose={() => setOpenAddDropdown(false)}
      >
        <div
          className={[
            styles['add-address-container'],
            styles['add-address-container-mobile'],
          ].join(' ')}
        >
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
          <div
            className={[
              styles['add-address-button-container'],
              styles['add-address-button-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: [
                  styles['add-address-button'],
                  styles['add-address-button-mobile'],
                ].join(' '),
              }}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              touchScreen={true}
              block={true}
              size={'large'}
              onClick={onAddAddressAsync}
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
        <div
          className={[
            styles['edit-address-container'],
            styles['edit-address-container-mobile'],
          ].join(' ')}
        >
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
          <div
            className={[
              styles['edit-address-button-container'],
              styles['edit-address-button-container-mobile'],
            ].join(' ')}
          >
            <Button
              classNames={{
                button: [
                  styles['edit-address-button'],
                  styles['edit-address-button-mobile'],
                ].join(' '),
              }}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              touchScreen={true}
              block={true}
              size={'large'}
              onClick={onEditAddressAsync}
            >
              {t('applyChanges')}
            </Button>
          </div>
        </div>
      </Dropdown>
      <Modal
        classNames={{
          overlay: [
            styles['modal-overlay'],
            styles['modal-overlay-mobile'],
          ].join(' '),
          title: [styles['modal-title'], styles['modal-title-mobile']].join(
            ' '
          ),
          description: [
            styles['modal-description'],
            styles['modal-description-mobile'],
          ].join(' '),
          cancelButton: {
            button: [
              styles['modal-cancel-button'],
              styles['modal-cancel-button-mobile'],
            ].join(' '),
          },
          confirmButton: {
            button: [
              styles['modal-confirm-button'],
              styles['modal-confirm-button-mobile'],
            ].join(' '),
          },
        }}
        visible={deleteModalVisible}
        onConfirm={onDeleteAddressConfirmedAsync}
        onCancel={onDeleteAddressCanceledAsync}
        title={t('removeAddress') ?? ''}
        confirmText={t('remove') ?? ''}
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