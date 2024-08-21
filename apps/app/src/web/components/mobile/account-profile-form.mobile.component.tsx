import {
  Button,
  FormLayout,
  Input,
  InputPhoneNumber,
} from '@fuoco.appdev/web-components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { AccountProfileFormResponsiveProps } from '../account-profile-form.component';
import styles from '../account-profile-form.module.scss';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountProfileFormMobileComponent({
  values,
  errors,
  onChangeCallbacks,
  selectedCountry,
}: AccountProfileFormResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <ResponsiveMobile>
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
        label={t('username') ?? ''}
        value={values?.username}
        error={errors?.lastName}
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
        value={values?.birthday && values.birthday.length > 0 ? values.birthday : moment(new Date(Date.now())).format("YYYY-MM-DD")}
        error={errors?.birthday}
        onChange={onChangeCallbacks?.birthday}
      />
      <FormLayout
        classNames={{ label: styles['input-form-layout-label'] }}
        label={t('sex') ?? undefined}
        error={errors?.sex}
      >
        <div
          className={[styles['sex-options'], styles['sex-options-mobile']].join(
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
        touchScreen={true}
        country={selectedCountry}
        onChange={onChangeCallbacks?.phoneNumber}
      />
    </ResponsiveMobile>
  );
}
