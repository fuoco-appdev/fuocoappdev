import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-addresses.module.scss';
import { Alert, Button, Dropdown, Line } from '@fuoco.appdev/core-ui';
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
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

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
            onClick={() => setOpenAddModal(true)}
          />
        </div>
      </div>
      <div className={styles['address-list-container']}>
        {customer?.shipping_addresses?.map((value: Address) => (
          <AddressItemComponent key={value.id} address={value} />
        ))}
      </div>
      <Dropdown
        open={openAddModal}
        touchScreen={true}
        onClose={() => setOpenAddModal(false)}
      >
        <div className={styles['add-address-container']}>
          <AddressFormComponent
            values={props.shippingForm}
            errors={props.shippingFormErrors}
            onChangeCallbacks={{
              email: (event) =>
                AccountController.updateShippingAddress({
                  email: event.target.value,
                }),
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
                  AccountController.model.shippingForm
                );
                if (errors) {
                  AccountController.updateShippingAddressErrors(errors);
                  return;
                }

                await AccountController.addAddressAsync();
                setOpenAddModal(false);
              }}
            >
              {t('addAddress')}
            </Button>
          </div>
        </div>
      </Dropdown>
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
