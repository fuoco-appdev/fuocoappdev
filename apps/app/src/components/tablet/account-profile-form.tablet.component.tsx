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
import {
  Alert,
  Button,
  FormLayout,
  Input,
  InputPhoneNumber,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import StoreController from '../../controllers/store.controller';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';
import { AccountProfileFormResponsiveProps } from '../account-profile-form.component';
import { ResponsiveMobile, ResponsiveTablet } from '../responsive.component';

export default function AccountProfileFormTabletComponent({
  values,
  errors,
  onChangeCallbacks,
  selectedCountry,
}: AccountProfileFormResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveTablet>
      <div
        className={[
          styles['horizontal-input-container'],
          styles['horizontal-input-container-tablet'],
        ].join(' ')}
      >
        <Input
          classNames={{
            root: styles['input-root'],
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
            root: styles['input-root'],
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
      <Input
        classNames={{
          root: styles['input-root'],
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={t('username') ?? ''}
        value={values?.username}
        error={errors?.username}
        onChange={onChangeCallbacks?.username}
      />
      <Input
        classNames={{
          root: styles['input-root'],
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={t('birthday') ?? ''}
        type={'date'}
        value={values?.birthday}
        error={errors?.birthday}
        onChange={onChangeCallbacks?.birthday}
      />
      <FormLayout
        classNames={{ label: styles['input-form-layout-label'] }}
        label={t('sex') ?? undefined}
        error={errors?.sex}
      >
        <div
          className={[styles['sex-options'], styles['sex-options-tablet']].join(
            ' '
          )}
        >
          <Button
            block={true}
            classNames={{
              button: [
                styles['button'],
                values?.sex === 'male' && styles['button-selected'],
              ].join(' '),
            }}
            type={'primary'}
            size={'large'}
            rippleProps={{
              color: 'rgba(133, 38, 122, 0.35)',
            }}
            onClick={() => onChangeCallbacks?.sex?.('male')}
          >
            {t('male')}
          </Button>
          <Button
            block={true}
            classNames={{
              button: [
                styles['button'],
                values?.sex === 'female' && styles['button-selected'],
              ].join(' '),
            }}
            type={'primary'}
            size={'large'}
            rippleProps={{
              color: 'rgba(133, 38, 122, 0.35)',
            }}
            onClick={() => onChangeCallbacks?.sex?.('female')}
          >
            {t('female')}
          </Button>
        </div>
      </FormLayout>
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
        touchScreen={false}
        country={selectedCountry}
        onChange={onChangeCallbacks?.phoneNumber}
      />
    </ResponsiveTablet>
  );
}
