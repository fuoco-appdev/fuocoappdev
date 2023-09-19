import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../../controllers/window.controller';
import styles from '../window.module.scss';
import {
  Alert,
  Avatar,
  Button,
  Dropdown,
  LanguageSwitch,
  Line,
  ToastOverlay,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../../protobuf/core_pb';
import LoadingComponent from '../loading.component';
import { Store } from '@ngneat/elf';
import { Customer } from '@medusajs/medusa';
import AccountController from '../../controllers/account.controller';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import e from 'express';
import { WindowResponsiveProps } from '../window.component';

export function WindowTabletComponent({
  openMore,
  isLanguageOpen,
  setOpenMore,
  setIsLanguageOpen,
}: WindowResponsiveProps): JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles['root-tablet']}>
      <div className={styles['content-container-tablet']}>
        <img src={'../assets/svg/logo.svg'} className={styles['logo-tablet']} />
        <div className={styles['not-supported-text-tablet']}>
          {t('tabletNotSupported')}
        </div>
      </div>
    </div>
  );
}
