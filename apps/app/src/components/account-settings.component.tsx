import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../controllers/account.controller';
import styles from './account-settings.module.scss';
import { Alert, Button, Line, Modal } from '@fuoco.appdev/core-ui';
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

function AccountSettingsDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);

  return <></>;
}

function AccountSettingsMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles['root']}>
        <Ripples
          className={styles['setting-button-container']}
          color={'rgba(42, 42, 95, .35)'}
        >
          <div className={styles['setting-button-content']}>
            <div className={styles['setting-icon']}>
              <Line.Security size={24} />
            </div>
            <div className={styles['setting-text']}>{t('security')}</div>
          </div>
        </Ripples>
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
          <Button
            block={true}
            size={'large'}
            classNames={{
              button: styles['logout-button'],
            }}
            rippleProps={{
              color: 'rgba(233, 33, 66, .35)',
            }}
            touchScreen={true}
            onClick={() => AccountController.logoutAsync()}
          >
            {t('logout')}
          </Button>
        </div>
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
    </>
  );
}

export default function AccountSettingsComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <AccountSettingsDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AccountSettingsMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
