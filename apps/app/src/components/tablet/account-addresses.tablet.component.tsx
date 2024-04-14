import { Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { Address, Customer } from '@medusajs/medusa';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import AccountController from '../../controllers/account.controller';
import { AccountAddressResponsiveProps } from '../account-addresses.component';
import styles from '../account-addresses.module.scss';
import AddressFormComponent from '../address-form.component';
import AddressItemComponent from '../address-item.component';
import { ResponsiveTablet } from '../responsive.component';

export default function AccountAddressesTabletComponent({
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
  const { t } = useTranslation();

  const customer = accountProps.customer as Customer | undefined;
  const selectedAddress = accountProps.selectedAddress as Address | undefined;
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['address-list-container'],
            styles['address-list-container-tablet'],
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
                styles['no-addresses-text-tablet'],
              ].join(' ')}
            >
              {t('noAddresses')}
            </div>
          )}
        </div>
        <div
          className={[
            styles['addresses-add-button-container'],
            styles['addresses-add-button-container-tablet'],
          ].join(' ')}
        >
          <Button
            rounded={true}
            classNames={{
              container: [
                styles['floating-button-container'],
                styles['floating-button-container-tablet'],
              ].join(' '),
              button: [
                styles['floating-button'],
                styles['floating-button-tablet'],
              ].join(' '),
            }}
            icon={<Line.Add size={24} color={'#2A2A5F'} />}
            type={'primary'}
            size={'small'}
            rippleProps={{
              color: 'rgba(42, 42, 95, .35)',
            }}
            touchScreen={true}
            onClick={() => setOpenAddDropdown(true)}
          />
        </div>
        {ReactDOM.createPortal(
          <>
            <Modal
              classNames={{
                overlay: [
                  styles['modal-overlay'],
                  styles['modal-overlay-tablet'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-tablet']].join(' '),
                title: [
                  styles['modal-title'],
                  styles['modal-title-tablet'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-tablet'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-tablet'],
                  styles['modal-address-footer-button-container-tablet'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-tablet'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-tablet'],
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
                  styles['add-address-container-tablet'],
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
                    country: (id, _value) =>
                      AccountController.updateShippingAddress({
                        countryCode: id,
                      }),
                    region: (_id, value) =>
                      AccountController.updateShippingAddress({
                        region: value,
                      }),
                    phoneNumber: (value, _event, _formattedValue) =>
                      AccountController.updateShippingAddress({
                        phoneNumber: value,
                      }),
                  }}
                />
                <div
                  className={[
                    styles['add-address-button-container'],
                    styles['add-address-button-container-tablet'],
                  ].join(' ')}
                >
                  <Button
                    touchScreen={true}
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
                  styles['modal-overlay-tablet'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-tablet']].join(' '),
                title: [
                  styles['modal-title'],
                  styles['modal-title-tablet'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-tablet'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-tablet'],
                  styles['modal-address-footer-button-container-tablet'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-tablet'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-tablet'],
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
                  styles['edit-address-container-tablet'],
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
                    country: (id, _value) =>
                      AccountController.updateEditShippingAddress({
                        countryCode: id,
                      }),
                    region: (_id, value) =>
                      AccountController.updateEditShippingAddress({
                        region: value,
                      }),
                    phoneNumber: (value, _event, _formattedValue) =>
                      AccountController.updateEditShippingAddress({
                        phoneNumber: value,
                      }),
                  }}
                />
                <div
                  className={[
                    styles['edit-address-button-container'],
                    styles['edit-address-button-container-tablet'],
                  ].join(' ')}
                >
                  <Button
                    touchScreen={true}
                    classNames={{
                      button: [
                        styles['edit-address-button'],
                        styles['edit-address-button-tablet'],
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
                  styles['modal-overlay-tablet'],
                ].join(' '),
                modal: [styles['modal'], styles['modal-tablet']].join(' '),
                text: [styles['modal-text'], styles['modal-text-tablet']].join(
                  ' '
                ),
                title: [
                  styles['modal-title'],
                  styles['modal-title-tablet'],
                ].join(' '),
                description: [
                  styles['modal-description'],
                  styles['modal-description-tablet'],
                ].join(' '),
                footerButtonContainer: [
                  styles['modal-footer-button-container'],
                  styles['modal-footer-button-container-tablet'],
                ].join(' '),
                cancelButton: {
                  button: [
                    styles['modal-cancel-button'],
                    styles['modal-cancel-button-tablet'],
                  ].join(' '),
                },
                confirmButton: {
                  button: [
                    styles['modal-confirm-button'],
                    styles['modal-confirm-button-tablet'],
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
    </ResponsiveTablet>
  );
}
