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
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import { Customer, Address } from '@medusajs/medusa';
import AddressItemComponent from '../address-item.component';
import AddressFormComponent from '../address-form.component';

export function AccountAddressesDesktopComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();
  const [openAddDropdown, setOpenAddDropdown] = useState<boolean>(false);
  const [openEditDropdown, setOpenEditDropdown] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const customer = props.customer as Customer | undefined;
  const selectedAddress = props.selectedAddress as Address | undefined;
  return (
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
      <Modal
        classNames={{
          overlay: [
            styles['modal-overlay'],
            styles['modal-overlay-desktop'],
          ].join(' '),
          title: [styles['modal-title'], styles['modal-title-desktop']].join(
            ' '
          ),
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
        visible={openAddDropdown}
        confirmText={t('add') ?? ''}
        cancelText={t('cancel') ?? ''}
        onCancel={() => setOpenAddDropdown(false)}
        onConfirm={async () => {
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
        <div
          className={[
            styles['add-address-container'],
            styles['add-address-container-desktop'],
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
        </div>
      </Modal>
      <Modal
        classNames={{
          overlay: [
            styles['modal-overlay'],
            styles['modal-overlay-desktop'],
          ].join(' '),
          title: [styles['modal-title'], styles['modal-title-desktop']].join(
            ' '
          ),
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
        confirmText={t('apply') ?? ''}
        cancelText={t('cancel') ?? ''}
        visible={openEditDropdown}
        onCancel={() => setOpenEditDropdown(false)}
        onConfirm={async () => {
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
        <div
          className={[
            styles['edit-address-container'],
            styles['edit-address-container-desktop'],
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
        </div>
      </Modal>
      <Modal
        classNames={{
          overlay: [
            styles['modal-overlay'],
            styles['modal-overlay-desktop'],
          ].join(' '),
          title: [styles['modal-title'], styles['modal-title-desktop']].join(
            ' '
          ),
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
