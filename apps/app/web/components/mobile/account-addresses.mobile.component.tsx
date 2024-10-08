import { Button, Dropdown, Line, Modal } from '@fuoco.appdev/web-components';
import { Address, Customer } from '@medusajs/medusa';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import AccountController from '../../../shared/controllers/account.controller';
import styles from '../../modules/account-addresses.module.scss';
import { AccountAddressResponsiveProps } from '../account-addresses.component';
import AddressFormComponent from '../address-form.component';
import AddressItemComponent from '../address-item.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountAddressesMobileComponent({
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
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
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
        {ReactDOM.createPortal(
          <>
            <div
              className={[
                styles['addresses-add-button-container'],
                styles['addresses-add-button-container-mobile'],
              ].join(' ')}
              style={{
                height: window.innerHeight,
                width: window.innerWidth,
              }}
            >
              <Button
                rounded={true}
                classNames={{
                  container: [
                    styles['floating-button-container'],
                    styles['floating-button-container-mobile'],
                  ].join(' '),
                  button: [
                    styles['floating-button'],
                    styles['floating-button-mobile'],
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
            <Dropdown
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
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
              classNames={{
                touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
              }}
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
                title: [
                  styles['modal-title'],
                  styles['modal-title-mobile'],
                ].join(' '),
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
          </>,
          document.body
        )}
      </div>
    </ResponsiveMobile>
  );
}
