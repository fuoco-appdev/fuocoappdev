import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StoreController from '../controllers/store.controller';
import styles from './window.module.scss';
import { Alert } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';

function StoreDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(StoreController.model.store);

  return <></>;
}

function StoreMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(StoreController.model.store);
  const { t, i18n } = useTranslation();

  return <></>;
}

export default function StoreComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <StoreDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <StoreMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
