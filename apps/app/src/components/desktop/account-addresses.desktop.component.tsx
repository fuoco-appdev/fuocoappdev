import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-addresses.module.scss';
import { Alert, Button, Dropdown, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import { Customer, Address } from '@medusajs/medusa';
import AddressItemComponent from '../address-item.component';
import AddressFormComponent from '../address-form.component';
import { AccountAddressResponsiveProps } from '../account-addresses.component';
import { ResponsiveDesktop } from '../responsive.component';
import { createPortal } from 'react-dom';

export default function AccountAddressesDesktopComponent({
  accountProps,
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
  const { t, i18n } = useTranslation();

  const customer = accountProps.customer as Customer | undefined;
  const selectedAddress = accountProps.selectedAddress as Address | undefined;
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['addresses-text-container'],
            styles['addresses-text-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['addresses-text'],
              styles['addresses-text-desktop'],
            ].join(' ')}
          >
            {t('addresses')}
          </div>
          <div>
            <Button
              classNames={{
                button: styles['button'],
              }}
              rounded={true}
              icon={<Line.Add size={24} color={'#2A2A5F'} />}
              type={'text'}
              floatingLabel={t('addAddress') ?? ''}
              rippleProps={{
                color: 'rgba(42, 42, 95, .35)',
              }}
              onClick={() => setOpenAddDropdown(true)}
            />
          </div>
        </div>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-desktop'],
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
                styles['no-addresses-text-desktop'],
              ].join(' ')}
            >
              {t('noAddresses')}
            </div>
          )}
        </div>
        {createPortal(
          <>
            <Modal
              classNames={{
                overlay: [
                  styles['modal-overlay'],
                  styles['modal-overlay-desktop'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-desktop']].join(' '),
                title: [
                  styles['modal-title'],
                  styles['modal-title-desktop'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-desktop'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-desktop'],
                  styles['modal-address-footer-button-container-desktop'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-desktop'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-desktop'],
                  ].join(' '),
                },
              }}
              visible={openAddDropdown}
              hideFooter={true}
              onCancel={() => setOpenAddDropdown(false)}
            >
              <div
                className={[
                  styles['add-address-container'],
                  styles['add-address-container-desktop'],
                ].join(' ')}
              >
                <AddressFormComponent
                  isAuthenticated={true}
                  values={accountProps.shippingForm}
                  errors={accountProps.shippingFormErrors}
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
                    country: (id, value) =>
                      AccountController.updateShippingAddress({
                        countryCode: id,
                      }),
                    region: (id, value) =>
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
                    styles['add-address-button-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['add-address-button'],
                    }}
                    rippleProps={{
                      color: 'rgba(233, 33, 66, .35)',
                    }}
                    block={true}
                    size={'large'}
                    onClick={onAddAddressAsync}
                  >
                    {t('addAddress')}
                  </Button>
                </div>
              </div>
            </Modal>
            <Modal
              classNames={{
                overlay: [
                  styles['modal-overlay'],
                  styles['modal-overlay-desktop'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-desktop']].join(' '),
                title: [
                  styles['modal-title'],
                  styles['modal-title-desktop'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-desktop'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-desktop'],
                  styles['modal-address-footer-button-container-desktop'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-desktop'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-desktop'],
                  ].join(' '),
                },
              }}
              visible={openEditDropdown}
              onCancel={() => setOpenEditDropdown(false)}
              hideFooter={true}
            >
              <div
                className={[
                  styles['edit-address-container'],
                  styles['edit-address-container-desktop'],
                ].join(' ')}
              >
                <AddressFormComponent
                  isAuthenticated={true}
                  values={accountProps.editShippingForm}
                  errors={accountProps.editShippingFormErrors}
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
                    country: (id, value) =>
                      AccountController.updateEditShippingAddress({
                        countryCode: id,
                      }),
                    region: (id, value) =>
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
                    styles['edit-address-button-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: [
                        styles['edit-address-button'],
                        styles['edit-address-button-desktop'],
                      ].join(' '),
                    }}
                    rippleProps={{
                      color: 'rgba(233, 33, 66, .35)',
                    }}
                    block={true}
                    size={'large'}
                    onClick={onEditAddressAsync}
                  >
                    {t('applyChanges')}
                  </Button>
                </div>
              </div>
            </Modal>
            <Modal
              classNames={{
                overlay: [
                  styles['modal-overlay'],
                  styles['modal-overlay-desktop'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-desktop']].join(' '),
                text: [styles['modal-text'], styles['modal-text-desktop']].join(
                  ' '
                ),
                title: [
                  styles['modal-title'],
                  styles['modal-title-desktop'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-desktop'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-desktop'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-desktop'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-desktop'],
                  ].join(' '),
                },
              }}
              confirmText={t('remove') ?? ''}
              visible={deleteModalVisible}
              onConfirm={onDeleteAddressConfirmedAsync}
              onCancel={onDeleteAddressCanceledAsync}
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
          </>,
          document.body
        )}
      </div>
    </ResponsiveDesktop>
  );
}
