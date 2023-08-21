import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-settings.module.scss';
import { Alert, Button, Line, Modal } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';

export function AccountSettingsDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(AccountController.model.store);
  const { t, i18n } = useTranslation();

  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <div
        className={[styles['side-bar'], styles['side-bar-desktop']].join(' ')}
      ></div>
    </div>
  );
}
