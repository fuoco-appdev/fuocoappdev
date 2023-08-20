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
import { AccountAddressesDesktopComponent } from './desktop/account-addresses.desktop.component';
import { AccountAddressesMobileComponent } from './mobile/account-addresses.mobile.component';

export default function AccountAddressesComponent(): JSX.Element {
  const { t, i18n } = useTranslation();

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
