import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {
  Button,
  IconLogOut,
  Alert,
  Tabs,
  IconUser,
  IconSmartphone,
  IconUsers,
  Toast,
  LanguageSwitch,
  LanguageCode,
  DropdownAlignment,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import AuthService from '../services/auth.service';
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

  return (
    <>
      <div className={styles['background']}>
        <WorldComponent
          isVisible={
            !props.isTabBarVisible &&
            props.activeRoute !== RoutePaths.Landing &&
            props.activeRoute !== RoutePaths.Default
          }
          worldPosition={{ x: 2, y: 0, z: -0.5 }}
        />
      </div>
      <div className={styles['content']} ref={containerRef}>
        <div className={styles['top-bar']}>
          <div className={styles['top-bar-content']}>
            <div className={styles['logo-container']}>
              {!props.isTabBarVisible && (
                <Button
                  classNames={{
                    container: styles['logo-button'],
                  }}
                  type={'text'}
                  onClick={() => navigate(RoutePaths.Landing)}
                  disabled={props.isAuthenticated}
                  icon={
                    <img
                      className={styles['logo']}
                      src="../assets/svg/logo.svg"
                      alt="logo"
                    />
                  }
                />
              )}
            </div>
            <div className={styles['navbar-content-right']}>
              <div className={styles['navbar-content-right-grid']}>
                <LanguageSwitch
                  language={i18n.language as LanguageCode}
                  supportedLanguages={[LanguageCode.EN, LanguageCode.FR]}
                  parentRef={containerRef}
                  dropdownProps={{
                    align: DropdownAlignment.Right,
                  }}
                  onChange={(code) => WindowController.updateLanguage(code)}
                />
                {props.isSigninVisible && (
                  <Button
                    className={styles['navbarButton']}
                    size="tiny"
                    type="text"
                    onClick={() => navigate(RoutePaths.Signin)}
                  >
                    {t('signin')}
                  </Button>
                )}
                {props.isSignupVisible && (
                  <Button
                    className={styles['navbarButton']}
                    size="tiny"
                    type="text"
                    onClick={() => navigate(RoutePaths.Signup)}
                  >
                    {t('signup')}
                  </Button>
                )}
                {props.isAuthenticated && props.isSignoutVisible && (
                  <Button
                    className={styles['navbarButton']}
                    icon={<IconLogOut strokeWidth={2} />}
                    size="tiny"
                    type="text"
                    onClick={async () => {
                      await AuthService.signoutAsync();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles['container']}>
          {props.isAuthenticated && props.isTabBarVisible && (
            <div className={styles['navbar-content']}>
              <img
                className={styles['logo']}
                src="../assets/svg/logo.svg"
                alt="logo"
              />
              {props.user?.role === core.UserRole.USER && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={props.activeRoute}
                  onChange={(id: string) => navigate(id)}
                  tabs={[
                    {
                      id: RoutePaths.Account,
                      icon: <IconUser strokeWidth={2} />,
                    },
                    {
                      id: RoutePaths.Apps,
                      icon: <IconSmartphone strokeWidth={2} />,
                    },
                  ]}
                />
              )}
              {props.user?.role === core.UserRole.ADMIN && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={props.activeRoute}
                  onChange={(id: string) => navigate(id)}
                  tabs={[
                    {
                      id: RoutePaths.AdminAccount,
                      icon: <IconUser strokeWidth={2} />,
                    },
                    {
                      id: RoutePaths.AdminUsers,
                      icon: <IconUsers strokeWidth={2} />,
                    },
                    {
                      id: RoutePaths.AdminApps,
                      icon: <IconSmartphone strokeWidth={2} />,
                    },
                  ]}
                />
              )}
            </div>
          )}
          <div
            className={[styles['children'], styles['children-desktop']].join(
              ' '
            )}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <Toast.ToastOverlay toasts={props.toasts} align={'right'} />
    </>
  );
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

  useLayoutEffect(() => {
    if (scrollRef.current) {
      WindowController.scrollRef = scrollRef.current;
    }
  }, [scrollRef]);

  return (
    <>
      <div className={styles['background']}>
        <WorldComponent
          isVisible={
            props.activeRoute === RoutePaths.Landing ||
            props.activeRoute === RoutePaths.Default
          }
          worldResizable={false}
          worldPosition={{ x: 0, y: -3.5, z: 0 }}
        />
      </div>
      <div className={styles['content']}>
        <div
          className={[styles['top-bar'], styles['top-bar-mobile']].join(' ')}
        >
          <div className={styles['top-bar-content']}>
            <div className={styles['logo-container']}>
              <Button
                classNames={{
                  container: styles['logo-button'],
                }}
                touchScreen={true}
                disabled={props.isAuthenticated}
                type={'text'}
                onClick={() => navigate(RoutePaths.Landing)}
                icon={
                  <img
                    className={styles['logo']}
                    src="../assets/svg/logo.svg"
                    alt="logo"
                  />
                }
              ></Button>
            </div>
            <div className={styles['navbar-content-right']}>
              <div className={styles['navbar-content-right-grid']}>
                <LanguageSwitch
                  language={i18n.language as LanguageCode}
                  supportedLanguages={[LanguageCode.EN, LanguageCode.FR]}
                  touchScreen={true}
                  hideText={true}
                  dropdownProps={{
                    align: DropdownAlignment.Right,
                  }}
                  onChange={(code) => WindowController.updateLanguage(code)}
                />
                {props.isSigninVisible && (
                  <Button
                    touchScreen={true}
                    className={styles['navbarButton']}
                    size="tiny"
                    type="text"
                    rippleProps={{
                      color: 'rgba(255, 255, 255, 0.35)',
                    }}
                    onClick={() =>
                      setTimeout(() => navigate(RoutePaths.Signin), 100)
                    }
                  >
                    {t('signin')}
                  </Button>
                )}
                {props.isSignupVisible && (
                  <Button
                    touchScreen={true}
                    className={styles['navbarButton']}
                    size="tiny"
                    type="text"
                    rippleProps={{
                      color: 'rgba(255, 255, 255, 0.35)',
                    }}
                    onClick={() =>
                      setTimeout(() => navigate(RoutePaths.Signup), 100)
                    }
                  >
                    {t('signup')}
                  </Button>
                )}
                {props.isAuthenticated && props.isSignoutVisible && (
                  <Button
                    touchScreen={true}
                    className={styles['navbarButton']}
                    icon={<IconLogOut strokeWidth={2} />}
                    size="tiny"
                    type="text"
                    rippleProps={{
                      color: 'rgba(255, 255, 255, 0.35)',
                    }}
                    onClick={() => {
                      setTimeout(async () => {
                        await AuthService.signoutAsync();
                      }, 100);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles['container']}>
          {props.user && props.isTabBarVisible && (
            <div className={styles['bottom-bar-content-mobile']}>
              {props.user?.role === core.UserRole.USER && (
                <>
                  <Button
                    classNames={{
                      button: styles['bottom-bar-button-mobile'],
                    }}
                    block={true}
                    touchScreen={true}
                    size={'full'}
                    icon={
                      <IconUser
                        strokeWidth={2}
                        stroke={
                          props.activeRoute === RoutePaths.Account
                            ? '#65ffff'
                            : '#fff'
                        }
                      />
                    }
                    onClick={() => navigate(RoutePaths.User)}
                    type={'text'}
                    rippleProps={{
                      color: '#65ffff',
                    }}
                  />
                  <Button
                    classNames={{
                      button: styles['bottom-bar-button-mobile'],
                    }}
                    block={true}
                    touchScreen={true}
                    size={'full'}
                    icon={
                      <IconSmartphone
                        strokeWidth={2}
                        stroke={
                          props.activeRoute === RoutePaths.Apps
                            ? '#65ffff'
                            : '#fff'
                        }
                      />
                    }
                    onClick={() => navigate(RoutePaths.Apps)}
                    type={'text'}
                    rippleProps={{
                      color: '#65ffff',
                    }}
                  />
                </>
              )}
              {/* {user?.role === core.UserRole.ADMIN && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={props.activeRoute}
                  onChange={(id: string) => navigate(id)}
                  tabs={[
                    {
                      id: RoutePaths.AdminAccount,
                      icon: <IconUser strokeWidth={2} />,
                    },
                    {
                      id: RoutePaths.AdminUsers,
                      icon: <IconUsers strokeWidth={2} />,
                    },
                    {
                      id: RoutePaths.AdminApps,
                      icon: <IconSmartphone strokeWidth={2} />,
                    },
                  ]}
                />
              )} */}
            </div>
          )}
          <div
            ref={scrollRef}
            className={[styles['children'], styles['children-mobile']].join(
              ' '
            )}
          >
            <Outlet />
          </div>
        </div>
      </div>
      <Toast.ToastOverlay
        toasts={props.toasts}
        touchScreen={true}
        align={'center'}
      />
    </>
  );
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

      navigate(RoutePaths.User);
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
