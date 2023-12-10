import styles from '../account-profile-form.module.scss';
import { Input, InputPhoneNumber } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { AccountProfileFormResponsiveProps } from '../account-profile-form.component';
import { ResponsiveDesktop } from '../responsive.component';

export default function AccountProfileFormDesktopComponent({
  values,
  errors,
  onChangeCallbacks,
  selectedCountry,
}: AccountProfileFormResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveDesktop>
      <div
        className={[
          styles['horizontal-input-container'],
          styles['horizontal-input-container-desktop'],
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
        country={selectedCountry}
        onChange={onChangeCallbacks?.phoneNumber}
      />
    </ResponsiveDesktop>
  );
}
