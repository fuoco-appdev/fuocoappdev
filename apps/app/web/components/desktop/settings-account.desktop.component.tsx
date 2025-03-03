import {
  Accordion,
  AccordionItemClasses,
  Auth,
  Button,
  LanguageSwitch,
  Line,
} from '@fuoco.appdev/web-components';
import { AuthError } from '@supabase/supabase-js';
import { LanguageCode } from 'iso-639-1';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../modules/settings-account.module.scss';
import AccountProfileFormComponent from '../account-profile-form.component';
import { DIContext } from '../app.component';
import { ResponsiveDesktop } from '../responsive.component';
import { SettingsAccountResponsiveProps } from '../settings-account.component';

function SettingsAccountDesktopComponent({
  updatePasswordError,
  setUpdatePasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
  isLanguageOpen,
  setIsLanguageOpen,
  onGeneralInformationSaveAsync,
}: SettingsAccountResponsiveProps): JSX.Element {
  const { t } = useTranslation();
  const { WindowController, AccountController, SupabaseService } =
    React.useContext(DIContext);
  const { user, profileForm, profileFormErrors, isUpdateGeneralInfoLoading } =
    AccountController.model;
  const { languageCode } = WindowController.model;

  const accordionItemClassNames: AccordionItemClasses = {
    topBar: styles['accordion-top-bar'],
    panel: styles['accordion-panel'],
    topBarLabel: styles['accordion-top-bar-label'],
    button: {
      button: styles['button'],
    },
  };

  const provider = user?.app_metadata['provider'];
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['setting-container'],
            styles['setting-container-desktop'],
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
            >
              <>
                <div
                  className={[
                    styles['profile-form-container'],
                    styles['profile-form-container-desktop'],
                  ].join(' ')}
                >
                  <AccountProfileFormComponent
                    values={profileForm}
                    errors={profileFormErrors}
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
                    styles['save-button-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    classNames={{
                      button: styles['save-button'],
                    }}
                    rippleProps={{
                      color: 'rgba(252, 245, 227, .35)',
                    }}
                    block={true}
                    size={'large'}
                    onClick={onGeneralInformationSaveAsync}
                    loading={isUpdateGeneralInfoLoading}
                    loadingComponent={
                      <img
                        src={'../assets/svg/ring-resize-light.svg'}
                        style={{
                          height: 24,
                        }}
                        className={[
                          styles['loading-ring'],
                          styles['loading-ring-desktop'],
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
                key={'password-reset'}
                id={'password-reset'}
                label={t('passwordReset')}
                classNames={accordionItemClassNames}
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
                      // WindowController.addToast({
                      //   key: `update-password-${Math.random()}`,
                      //   message: t('successfullyUpdatedPassword') ?? '',
                      //   description:
                      //     t('successfullyUpdatedPasswordDescription') ?? '',
                      //   type: 'success',
                      // });
                    }}
                  />
                )}
              </Accordion.Item>
            )}
          </Accordion>
        </div>
        <div
          className={[
            styles['setting-container'],
            styles['setting-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['setting-button-content'],
              styles['setting-button-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['setting-icon'],
                styles['setting-icon-desktop'],
              ].join(' ')}
            >
              <Line.Language size={24} />
            </div>
            <div
              className={[
                styles['setting-text'],
                styles['setting-text-desktop'],
              ].join(' ')}
            >
              {t('language')}
            </div>
            <div
              className={[
                styles['setting-icon-right'],
                styles['setting-icon-right-desktop'],
              ].join(' ')}
            >
              <LanguageSwitch
                type={'button'}
                classNames={{
                  button: {
                    button: styles['button'],
                  },
                }}
                language={languageCode as LanguageCode}
                open={isLanguageOpen}
                supportedLanguages={[
                  { isoCode: 'en', countryCode: 'GB' },
                  { isoCode: 'fr', countryCode: 'FR' },
                ]}
                onChange={(code, info) =>
                  WindowController.updateLanguageInfo(code, info)
                }
                onOpen={() => setIsLanguageOpen(true)}
                onClose={() => setIsLanguageOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </ResponsiveDesktop>
  );
}

export default observer(SettingsAccountDesktopComponent);
