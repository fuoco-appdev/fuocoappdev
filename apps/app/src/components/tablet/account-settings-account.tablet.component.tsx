import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-settings-account.module.scss';
import {
  Accordion,
  Alert,
  Auth,
  Button,
  Line,
  Modal,
  AccordionItemClasses,
  LanguageSwitch,
} from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import { Store } from '@ngneat/elf';
import Ripples from 'react-ripples';
import { AuthError, User } from '@supabase/supabase-js';
import WindowController from '../../controllers/window.controller';
import ReactCountryFlag from 'react-country-flag';
import { Observable } from 'rxjs';
import { AccountSettingsAccountResponsiveProps } from '../account-settings-account.component';
import { ResponsiveDesktop, ResponsiveTablet } from '../responsive.component';
import { createPortal } from 'react-dom';
import AccountProfileFormComponent from '../account-profile-form.component';

export default function AccountSettingsAccountTabletComponent({
  storeProps,
  accountProps,
  windowLocalProps,
  updatePasswordError,
  setUpdatePasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
  showDeleteModal,
  setShowDeleteModal,
  isLanguageOpen,
  setIsLanguageOpen,
  onGeneralInformationSaveAsync,
}: AccountSettingsAccountResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  const accordionItemClassNames: AccordionItemClasses = {
    topBar: [
      styles['accordion-top-bar'],
      styles['accordion-top-bar-tablet'],
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
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[
            styles['setting-container'],
            styles['setting-container-tablet'],
          ].join(' ')}
        >
          <div
            className={[
              styles['setting-button-content'],
              styles['setting-button-content-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['setting-icon'],
                styles['setting-icon-tablet'],
              ].join(' ')}
            >
              <Line.Language size={24} />
            </div>
            <div
              className={[
                styles['setting-text'],
                styles['setting-text-tablet'],
              ].join(' ')}
            >
              {t('language')}
            </div>
            <div
              className={[
                styles['setting-icon-right'],
                styles['setting-icon-right-tablet'],
              ].join(' ')}
            >
              <LanguageSwitch
                type={'button'}
                classNames={{
                  button: {
                    button: styles['button'],
                  },
                }}
                language={windowLocalProps.languageCode}
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
            </div>
          </div>
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
                    styles['profile-form-container-tablet'],
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
                      phoneNumber: (value, event, formattedValue) =>
                        AccountController.updateProfile({
                          phoneNumber: value,
                        }),
                    }}
                  />
                </div>
                <div
                  className={[
                    styles['save-button-container'],
                    styles['save-button-container-tablet'],
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
                    defaultIconColor={'#2A2A5F'}
                    litIconColor={'#2A2A5F'}
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
        <div
          className={[
            styles['bottom-content-container'],
            styles['bottom-content-container-tablet'],
          ].join(' ')}
        >
          <Button
            block={true}
            size={'large'}
            classNames={{
              container: styles['delete-button-container'],
              button: styles['delete-button'],
            }}
            rippleProps={{
              color: 'rgba(133, 38, 122, .35)',
            }}
            onClick={() => setShowDeleteModal(true)}
          >
            {t('deleteAccount')}
          </Button>
        </div>
        {createPortal(
          <Modal
            title={t('deleteYourAccount') ?? ''}
            description={t('deleteYourAccountDescription') ?? ''}
            confirmText={t('delete') ?? ''}
            cancelText={t('cancel') ?? ''}
            variant={'danger'}
            size={'small'}
            classNames={{
              modal: styles['delete-modal'],
            }}
            visible={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={async () => {
              await AccountController.deleteAsync();
              setShowDeleteModal(false);
            }}
          ></Modal>,
          document.body
        )}
      </div>
    </ResponsiveTablet>
  );
}
