import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
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

function WindowDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [props] = useObservable(WindowController.model.store);
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localProps.language);
  }, [localProps.language]);

  return <></>;
}

function WindowMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(WindowController.model.store);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation();
  const [localProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );

  useEffect(() => {
    i18n.changeLanguage(localProps.language);
  }, [localProps.language]);

  return <></>;
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [props] = useObservable(WindowController.model.store);
  const isMounted = useRef<boolean>(false);
  const { t } = useTranslation();
  const confirmEmailTransitionStyle = useSpring({
    from: { y: -200 },
    to: props.showConfirmEmailAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });
  const passwordResetTransitionStyle = useSpring({
    from: { y: -200 },
    to: props.showPasswordResetAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });

  useEffect(() => {
    if (!isMounted.current) {
      WindowController.checkUserIsAuthenticatedAsync();
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location, props.authState]);

  useEffect(() => {
    if (props.authState === 'SIGNED_IN') {
      if (props.activeRoute === RoutePaths.ResetPassword) {
        return;
      }

      navigate(RoutePaths.Account);
    } else if (props.authState === 'SIGNED_OUT') {
      navigate(RoutePaths.Signin);
    } else if (props.authState === 'USER_DELETED') {
      navigate(RoutePaths.Signup);
    } else if (props.authState === 'PASSWORD_RECOVERY') {
      navigate(RoutePaths.ResetPassword);
    }
  }, [props.authState]);

  return (
    <div className={styles['root']}>
      <ResponsiveDesktop>
        <WindowDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <WindowMobileComponent />
      </ResponsiveMobile>
      <Alert
        className={styles['alert']}
        style={confirmEmailTransitionStyle}
        title={t('emailConfirmation')}
        variant={'info'}
        withIcon={true}
        closable={true}
        onCloseClick={() => WindowController.updateShowConfirmEmailAlert(false)}
      >
        {t('emailConfirmationDescription')}
      </Alert>
      <Alert
        className={styles['alert']}
        style={passwordResetTransitionStyle}
        title={t('passwordReset')}
        variant={'info'}
        withIcon={true}
        closable={true}
        onCloseClick={() =>
          WindowController.updateShowPasswordResetAlert(false)
        }
      >
        {t('passwordResetDescription')}
      </Alert>
      <LoadingComponent isVisible={props.isLoading} />
    </div>
  );
}
