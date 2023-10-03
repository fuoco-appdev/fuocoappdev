import {
  Button,
  Input,
  InputPhoneNumber,
  Line,
  Listbox,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useObservable } from '@ngneat/use-observable';
import { useTranslation } from 'react-i18next';
import StoreController from '../../controllers/store.controller';
import { Region, Country } from '@medusajs/medusa';
import ReactCountryFlag from 'react-country-flag';
import { CountryDataProps } from '@fuoco.appdev/core-ui/dist/cjs/src/components/input-phone-number/country-data';
import { AddressFormResponsiveProps } from '../address-form.component';
import styles from '../address-form.module.scss';

export default function AddressFormMobileComponent({
  isAuthenticated,
  values,
  errors,
  onChangeCallbacks,
  isComplete,
  onEdit,
  countryOptions,
  regionOptions,
  selectedCountryId,
  setSelectedCountryId,
  selectedRegionId,
  setSelectedRegionId,
  fullName,
  location,
  company,
  phoneNumber,
  email,
}: AddressFormResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  return !isComplete ? (
    <>
      {!isAuthenticated && (
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('email') ?? ''}
          value={values?.email}
          error={errors?.email}
          onChange={onChangeCallbacks?.email}
        />
      )}
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
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={`${t('company') ?? ''} (${t('optional') ?? ''})`}
        value={values?.company}
        error={errors?.company}
        onChange={onChangeCallbacks?.company}
      />
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={t('address') ?? ''}
        value={values?.address}
        error={errors?.address}
        onChange={onChangeCallbacks?.address}
      />
      <Input
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          input: styles['input'],
          container: styles['input-container'],
        }}
        label={`${t('apartments') ?? ''} (${t('optional') ?? ''})`}
        value={values?.apartments}
        error={errors?.apartments}
        onChange={onChangeCallbacks?.apartments}
      />
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
          label={t('postalCode') ?? ''}
          value={values?.postalCode}
          error={errors?.postalCode}
          onChange={onChangeCallbacks?.postalCode}
        />
        <Input
          classNames={{
            formLayout: { label: styles['input-form-layout-label'] },
            input: styles['input'],
            container: styles['input-container'],
          }}
          label={t('city') ?? ''}
          value={values?.city}
          error={errors?.city}
          onChange={onChangeCallbacks?.city}
        />
      </div>
      <Listbox
        classNames={{
          formLayout: {
            label: styles['listbox-form-layout-label'],
          },
          listbox: styles['listbox'],
          chevron: styles['listbox-chevron'],
          label: styles['listbox-label'],
        }}
        touchScreen={true}
        label={t('country') ?? ''}
        error={errors?.country}
        options={countryOptions}
        selectedId={selectedCountryId}
        onChange={(index: number, id: string, value?: string) => {
          setSelectedCountryId(id);
          onChangeCallbacks?.country?.(id, value ?? '');
        }}
      />
      <Listbox
        classNames={{
          formLayout: {
            label: styles['listbox-form-layout-label'],
          },
          listbox: styles['listbox'],
          chevron: styles['listbox-chevron'],
          label: styles['listbox-label'],
        }}
        touchScreen={true}
        label={t('region') ?? ''}
        options={regionOptions}
        error={errors?.region}
        selectedId={selectedRegionId}
        onChange={(index: number, id: string, value?: string) => {
          setSelectedRegionId(id);
          onChangeCallbacks?.region?.(id, value ?? '');
        }}
      />
      <InputPhoneNumber
        defaultValue={values?.phoneNumber}
        classNames={{
          formLayout: { label: styles['input-form-layout-label'] },
          inputPhoneNumber: styles['input'],
          inputContainer: styles['input-container'],
          countryName: styles['option-name'],
        }}
        iconColor={'#2A2A5F'}
        label={t('phoneNumber') ?? ''}
        error={errors?.phoneNumber}
        touchScreen={true}
        country={'ca'}
        onChange={onChangeCallbacks?.phoneNumber}
      />
    </>
  ) : (
    <div
      className={[
        styles['completed-container'],
        styles['completed-container-mobile'],
      ].join(' ')}
    >
      <div
        className={[
          styles['completed-details-container'],
          styles['completed-details-container-mobile'],
        ].join(' ')}
      >
        <Line.CheckCircle size={24} />
        <div
          className={[
            styles['completed-details'],
            styles['completed-details-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['completed-details-text'],
              styles['completed-details-text-mobile'],
            ].join(' ')}
          >
            {fullName}
          </div>
          <div
            className={[
              styles['completed-details-text'],
              styles['address-text'],
              styles['completed-details-text-mobile'],
              styles['address-text-mobile'],
            ].join(' ')}
          >
            {location}
          </div>
          <div
            className={[
              styles['completed-details-text'],
              styles['completed-details-text-mobile'],
            ].join(' ')}
          >
            {company}
          </div>
          <div
            className={[
              styles['completed-details-text'],
              styles['completed-details-text-mobile'],
            ].join(' ')}
          >
            {phoneNumber}
          </div>
          <div
            className={[
              styles['completed-details-text'],
              styles['completed-details-text-mobile'],
            ].join(' ')}
          >
            {email}
          </div>
        </div>
      </div>
      <div
        className={[
          styles['edit-button-container'],
          styles['edit-button-container-mobile'],
        ].join(' ')}
      >
        <Button
          classNames={{
            button: [styles['edit-button'], styles['edit-button-mobile']].join(
              ' '
            ),
          }}
          rippleProps={{
            color: 'rgba(133, 38, 122, .35)',
          }}
          size={'small'}
          type={'outline'}
          icon={<Line.Edit size={24} />}
          onClick={onEdit}
        >
          {t('edit')}
        </Button>
      </div>
    </div>
  );
}
