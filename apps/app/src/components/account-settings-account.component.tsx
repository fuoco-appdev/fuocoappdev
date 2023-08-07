import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-settings-account.module.scss';
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
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import Ripples from 'react-ripples';
import { AuthError } from '@supabase/supabase-js';
import WindowController from '../controllers/window.controller';
import ReactCountryFlag from 'react-country-flag';
import { Observable } from 'rxjs';
import { WindowLocalState } from '../models';

function AccountSettingsAccountDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);

  return <></>;
}

function AccountSettingsAccountMobileComponent(): JSX.Element {
  const [props] = useObservable(AccountController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [windowLocalProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const [updatePasswordError, setUpdatePasswordError] = useState<
    string | undefined
  >(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const accordionItemClassNames: AccordionItemClasses = {
    topBar: styles['accordion-top-bar'],
    panel: styles['accordion-panel'],
    topBarLabel: styles['accordion-top-bar-label'],
    button: {
      button: styles['accordion-button'],
    },
  };

  return (
    <div className={styles['root']}>
      <Ripples
        className={styles['setting-button-container']}
        color={'rgba(42, 42, 95, .35)'}
        onClick={() => setIsLanguageOpen(true)}
      >
        <div className={styles['setting-button-content']}>
          <div className={styles['setting-icon']}>
            <Line.Language size={24} />
          </div>
          <div className={styles['setting-text']}>{t('language')}</div>
          <div className={styles['setting-icon-right']}>
            <ReactCountryFlag
              countryCode={windowLocalProps.languageInfo?.info?.countryCode}
              style={{ width: 24 }}
              svg
            />
          </div>
        </div>
      </Ripples>
      <Accordion defaultActiveId={['password-reset']}>
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
      </Accordion>
      <div className={styles['bottom-content-container']}>
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
          touchScreen={true}
          onClick={() => setShowDeleteModal(true)}
        >
          {t('deleteAccount')}
        </Button>
      </div>
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
      ></Modal>
      <LanguageSwitch
        type={'none'}
        touchScreen={true}
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
  );
}

export default function AccountSettingsAccountComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountSettingsAccountDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountSettingsAccountMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
