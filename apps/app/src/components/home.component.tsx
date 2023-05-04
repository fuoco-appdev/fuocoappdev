import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import HomeController from '../controllers/home.controller';
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

function HomeDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(HomeController.model.store);

  return <></>;
}

function HomeMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(HomeController.model.store);
  const { t, i18n } = useTranslation();

  return <></>;
}

export default function HomeComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <HomeDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <HomeMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
