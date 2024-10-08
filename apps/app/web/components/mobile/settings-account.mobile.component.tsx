import {
  Accordion,
  AccordionItemClasses,
  Auth,
  Button,
  LanguageSwitch,
  Line,
} from '@fuoco.appdev/web-components';
import { AuthError, User } from '@supabase/supabase-js';
import { LanguageCode } from 'iso-639-1';
import ReactCountryFlag from 'react-country-flag';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Ripples from 'react-ripples';
import AccountController from '../../../shared/controllers/account.controller';
import WindowController from '../../../shared/controllers/window.controller';
import SupabaseService from '../../../shared/services/supabase.service';
import styles from '../../modules/settings-account.module.scss';
import AccountProfileFormComponent from '../account-profile-form.component';
import { ResponsiveMobile } from '../responsive.component';
import { SettingsAccountResponsiveProps } from '../settings-account.component';

export default function SettingsAccountMobileComponent({
  storeProps,
  accountProps,
  windowLocalProps,
  updatePasswordError,
  setUpdatePasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
  isLanguageOpen,
  setIsLanguageOpen,
  onGeneralInformationSaveAsync,
}: SettingsAccountResponsiveProps): JSX.Element {
  const { t } = useTranslation();

  const accordionItemClassNames: AccordionItemClasses = {
    topBar: [
      styles['accordion-top-bar'],
      styles['accordion-top-bar-mobile'],
    ].join(' '),
    panel: styles['accordion-panel'],
    topBarLabel: styles['accordion-top-bar-label'],
    button: {
      button: styles['button'],
    },
  };

  const user = accountProps.user as User | null;
  const provider = user?.app_metadata['provider'];
  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[
            styles['setting-container'],
            styles['setting-container-mobile'],
          ].join(' ')}
        >
          <Ripples
            className={[
              styles['setting-button-container'],
              styles['setting-button-container-mobile'],
            ].join(' ')}
            color={'rgba(42, 42, 95, .35)'}
            onClick={() => setIsLanguageOpen(true)}
          >
            <div
              className={[
                styles['setting-button-content'],
                styles['setting-button-content-mobile'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['setting-icon'],
                  styles['setting-icon-mobile'],
                ].join(' ')}
              >
                <Line.Language size={24} />
              </div>
              <div
                className={[
                  styles['setting-text'],
                  styles['setting-text-mobile'],
                ].join(' ')}
              >
                {t('language')}
              </div>
              <div
                className={[
                  styles['setting-icon-right'],
                  styles['setting-icon-right-mobile'],
                ].join(' ')}
              >
                <ReactCountryFlag
                  countryCode={
                    windowLocalProps.languageInfo?.info?.countryCode ?? ''
                  }
                  style={{ width: 24 }}
                  svg
                />
              </div>
            </div>
          </Ripples>
        </div>
        <div
          className={[
            styles['setting-container'],
            styles['setting-container-mobile'],
          ].join(' ')}
        >
          <Accordion
            defaultActiveId={['general-information', 'password-reset']}
          >
            <Accordion.Item
              key={'general-information'}
              id={'general-information'}
              label={t('generalInformation')}
              classNames={accordionItemClassNames}
              touchScreen={true}
            >
              <>
                <div
                  className={[
                    styles['profile-form-container'],
                    styles['profile-form-container-mobile'],
                  ].join(' ')}
                >
                  <AccountProfileFormComponent
                    storeProps={storeProps}
                    values={accountProps.profileForm}
                    errors={accountProps.profileFormErrors}
                    onChangeCallbacks={{
                      firstName: (event) =>
                        AccountController.updateProfile({
                          firstName: event.target.value,
                        }),
                      lastName: (event) =>
                        AccountController.updateProfile({
                          lastName: event.target.value,
                        }),
                      username: (event) =>
                        AccountController.updateProfile({
                          username: event.target.value,
                        }),
                      phoneNumber: (value, _event, _formattedValue) =>
                        AccountController.updateProfile({
                          phoneNumber: value,
                        }),
                    }}
                  />
                </div>
                <div
                  className={[
                    styles['save-button-container'],
                    styles['save-button-container-mobile'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['save-button'],
                    }}
                    rippleProps={{
                      color: 'rgba(233, 33, 66, .35)',
                    }}
                    block={true}
                    size={'large'}
                    onClick={onGeneralInformationSaveAsync}
                    loading={accountProps.isUpdateGeneralInfoLoading}
                    loadingComponent={
                      <img
                        src={'../assets/svg/ring-resize-light.svg'}
                        style={{ height: 24 }}
                        className={[
                          styles['loading-ring'],
                          styles['loading-ring-mobile'],
                        ].join(' ')}
                      />
                    }
                  >
                    {t('save')}
                  </Button>
                </div>
              </>
            </Accordion.Item>
            {provider === 'email' && (
              <Accordion.Item
                id={'password-reset'}
                label={t('passwordReset')}
                classNames={accordionItemClassNames}
                touchScreen={true}
              >
                {SupabaseService.supabaseClient && (
                  <Auth.UpdatePassword
                    supabaseClient={SupabaseService.supabaseClient}
                    passwordErrorMessage={updatePasswordError}
                    confirmPasswordErrorMessage={confirmPasswordError}
                    classNames={{
                      input: {
                        formLayout: {
                          label: styles['auth-input-form-layout-label'],
                        },
                        input: styles['auth-input'],
                        container: styles['auth-input-container'],
                      },
                      button: {
                        button: styles['auth-button'],
                      },
                    }}
                    strings={{
                      newPassword: t('newPassword') ?? '',
                      enterYourNewPassword: t('enterYourNewPassword') ?? '',
                      updatePassword: t('updatePassword') ?? '',
                      confirmNewPassword: t('confirmPassword') ?? '',
                    }}
                    onUpdatePasswordError={(error: AuthError) => {
                      if (error.status === 422) {
                        setUpdatePasswordError(t('passwordLengthError') ?? '');
                      } else if (error.status === 401) {
                        setConfirmPasswordError(
                          t('confirmPasswordErrorMessage') ?? ''
                        );
                      }
                    }}
                    onPasswordUpdated={() => {
                      WindowController.addToast({
                        key: `update-password-${Math.random()}`,
                        message: t('successfullyUpdatedPassword') ?? '',
                        description:
                          t('successfullyUpdatedPasswordDescription') ?? '',
                        type: 'success',
                      });
                    }}
                  />
                )}
              </Accordion.Item>
            )}
          </Accordion>
        </div>
        {ReactDOM.createPortal(
          <>
            <LanguageSwitch
              dropdownProps={{
                classNames: {
                  touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
                },
              }}
              type={'none'}
              touchScreen={true}
              language={windowLocalProps.languageCode as LanguageCode}
              open={isLanguageOpen}
              supportedLanguages={[
                { isoCode: 'en', countryCode: 'GB' },
                { isoCode: 'fr', countryCode: 'FR' },
              ]}
              onChange={(code, info) =>
                AccountController.updateAccountLanguageAsync(code, info)
              }
              onOpen={() => setIsLanguageOpen(true)}
              onClose={() => setIsLanguageOpen(false)}
            />
          </>,
          document.body
        )}
      </div>
    </ResponsiveMobile>
  );
}
