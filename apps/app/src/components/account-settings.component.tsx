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
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles['root']}>
        <Ripples
          className={styles['setting-button-container']}
          color={'rgba(42, 42, 95, .35)'}
          onClick={() =>
            setTimeout(() => navigate(RoutePaths.AccountSettingsAccount), 150)
          }
        >
          <div className={styles['setting-button-content']}>
            <div className={styles['setting-icon']}>
              <Line.Person size={24} />
            </div>
            <div className={styles['setting-text']}>{t('account')}</div>
          </div>
        </Ripples>
        <div className={styles['bottom-content-container']}>
          <Button
            block={true}
            size={'large'}
            classNames={{
              container: styles['logout-button-container'],
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
