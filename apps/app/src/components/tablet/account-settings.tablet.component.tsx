import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import styles from '../account-settings.module.scss';
import { Alert, Button, Line, Modal, Tabs } from '@fuoco.appdev/core-ui';
import { RoutePathsType } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import { useObservable } from '@ngneat/use-observable';
import Ripples from 'react-ripples';
import WindowController from '../../controllers/window.controller';
import {
  ResponsiveDesktop,
  ResponsiveTablet,
  useDesktopEffect,
  useTabletEffect,
} from '../responsive.component';
import { AccountSettingsResponsiveProps } from '../account-settings.component';

export default function AccountSettingsTabletComponent({
  windowProps,
}: AccountSettingsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          className={[styles['side-bar'], styles['side-bar-tablet']].join(' ')}
        >
          <Tabs
            activeId={windowProps.activeRoute}
            direction={'vertical'}
            type={'underlined'}
            onChange={(id) => navigate(id)}
            classNames={{
              tabOutline: [styles['tab-outline']].join(' '),
              tabSlider: styles['tab-slider'],
              tabIcon: styles['tab-icon'],
              tabButton: styles['tab-button'],
              hoveredTabIcon: styles['hovered-tab-icon'],
              hoveredTabButton: styles['hovered-tab-button'],
            }}
            tabs={[
              {
                id: RoutePathsType.AccountSettingsAccount,
                icon: <Line.Person size={24} />,
                label: t('account') ?? '',
              },
            ]}
          />
        </div>
        <div
          className={[
            styles['outlet-container'],
            styles['outlet-container-tablet'],
          ].join(' ')}
        >
          <Outlet />
        </div>
      </div>
    </ResponsiveTablet>
  );
}
