import {
  useEffect,
  useLayoutEffect,
  useRef,
  ChangeEvent,
  useState,
} from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-profile-form.module.scss';
import { Alert, Input, InputPhoneNumber } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from '../responsive.component';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import StoreController from '../../controllers/store.controller';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';
import { AccountProfileFormResponsiveProps } from '../account-profile-form.component';

export function AccountProfileFormMobileComponent({
  values,
  errors,
  onChangeCallbacks,
  selectedCountry,
}: AccountProfileFormResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div
        className={[
          styles['horizontal-input-container'],
          styles['horizontal-input-container-mobile'],
        ].join(' ')}
      >
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('firstName') ?? ''}
          value={values?.firstName}
          error={errors?.firstName}
          onChange={onChangeCallbacks?.firstName}
        />
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('lastName') ?? ''}
          value={values?.lastName}
          error={errors?.lastName}
          onChange={onChangeCallbacks?.lastName}
        />
      </div>
      <InputPhoneNumber
        defaultValue={values?.phoneNumber}
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          inputPhoneNumber: styles['input'],
          inputContainer: styles['input-container'],
          countryName: styles['option-name'],
          dropdown: styles['input-phone-number-dropdown'],
        }}
        iconColor={'#2A2A5F'}
        label={t('phoneNumber') ?? ''}
        error={errors?.phoneNumber}
        touchScreen={true}
        country={selectedCountry}
        onChange={onChangeCallbacks?.phoneNumber}
      />
    </>
  );
}
