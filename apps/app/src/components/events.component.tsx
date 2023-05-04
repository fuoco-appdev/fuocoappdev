import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import EventsController from '../controllers/events.controller';
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

function EventsDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(EventsController.model.store);

  return <></>;
}

function EventsMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(EventsController.model.store);
  const { t, i18n } = useTranslation();

  return <></>;
}

export default function EventsComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <EventsDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <EventsMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
