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
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { Strings } from '../strings';
import AuthService from '../services/auth.service';
import { useObservable } from '@ngneat/use-observable';
import LoadingComponent from './loading.component';
import { useSpring } from 'react-spring';
import UserService from '../services/user.service';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function SigninButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Button
      className={styles['navbarButton']}
      size="tiny"
      type="text"
      onClick={() => navigate(RoutePaths.Signin)}
    >
      {Strings.signin}
    </Button>
  );
}

function SignupButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Button
      className={styles['navbarButton']}
      size="tiny"
      type="text"
      onClick={() => navigate(RoutePaths.Signup)}
    >
      {Strings.signup}
    </Button>
  );
}

function SignoutButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Button
      className={styles['navbarButton']}
      icon={<IconLogOut strokeWidth={2} />}
      size="tiny"
      type="text"
      onClick={async () => {
        await AuthService.signoutAsync();
        navigate(RoutePaths.Signin);
      }}
    />
  );
}

function WindowDesktopComponent(): JSX.Element {
  const user = UserService.activeUser;
  const navigate = useNavigate();
  const [windowProps] = useObservable(WindowController.model.store);

  return (
    <>
      <div className={styles['background']}>
        <WorldComponent
          isVisible={
            !windowProps.isTabBarVisible &&
            windowProps.activeRoute !== RoutePaths.Landing &&
            windowProps.activeRoute !== RoutePaths.Default
          }
          minWorldPosition={{ x: 2, y: 0, z: -0.5 }}
          maxWorldPosition={{ x: 2, y: 0, z: -0.5 }}
          worldPosition={{ x: 2, y: 0, z: -0.5 }}
        />
      </div>
      <div className={styles['content']}>
        <div className={styles['top-bar']}>
          <div className={styles['top-bar-content']}>
            <div className={styles['logo-container']}>
              {!windowProps.isAuthenticated && !windowProps.isTabBarVisible && (
                <Button
                  className={styles['logo-button']}
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
              )}
            </div>
            <div className={styles['navbar-content-right']}>
              <div className={styles['navbar-content-right-grid']}>
                {windowProps.isSigninVisible ? <SigninButtonComponent /> : null}
                {windowProps.isSignupVisible ? <SignupButtonComponent /> : null}
                {windowProps.isAuthenticated && windowProps.isSignoutVisible ? (
                  <SignoutButtonComponent />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={styles['container']}>
          {windowProps.isAuthenticated && windowProps.isTabBarVisible && (
            <div className={styles['navbar-content']}>
              <img
                className={styles['logo']}
                src="../assets/svg/logo.svg"
                alt="logo"
              />
              {user?.role === core.UserRole.USER && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={windowProps.activeRoute}
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
              {user?.role === core.UserRole.ADMIN && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={windowProps.activeRoute}
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
          <div className={styles['children']}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

function WindowMobileComponent(): JSX.Element {
  const user = UserService.activeUser;
  const navigate = useNavigate();
  const [windowProps] = useObservable(WindowController.model.store);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    WindowController.scrollRef = scrollRef.current;
  }, []);

  return (
    <>
      <div className={styles['background']}>
        <WorldComponent
          isVisible={windowProps.activeRoute === RoutePaths.Landing}
          worldResizable={false}
          minWorldPosition={{ x: 0, y: 6, z: 0 }}
          maxWorldPosition={{ x: 0, y: -3.5, z: 0 }}
          worldPosition={{ x: 0, y: -3.5, z: 0 }}
        />
      </div>
      <div className={styles['content']}>
        <div
          className={[styles['top-bar'], styles['top-bar-mobile']].join(' ')}
        >
          <div className={styles['top-bar-content']}>
            <div className={styles['logo-container']}>
              {!windowProps.isAuthenticated && !windowProps.isTabBarVisible && (
                <Button
                  className={styles['logo-button']}
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
              )}
            </div>
            <div className={styles['navbar-content-right']}>
              <div className={styles['navbar-content-right-grid']}>
                {windowProps.isSigninVisible ? <SigninButtonComponent /> : null}
                {windowProps.isSignupVisible ? <SignupButtonComponent /> : null}
                {windowProps.isAuthenticated && windowProps.isSignoutVisible ? (
                  <SignoutButtonComponent />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className={styles['container']}>
          {windowProps.isAuthenticated && windowProps.isTabBarVisible && (
            <div className={styles['navbar-content']}>
              <img
                className={styles['logo']}
                src="../assets/svg/logo.svg"
                alt="logo"
              />
              {user?.role === core.UserRole.USER && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={windowProps.activeRoute}
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
              {user?.role === core.UserRole.ADMIN && (
                <Tabs
                  direction={'vertical'}
                  type={'underlined'}
                  activeId={windowProps.activeRoute}
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
          <div ref={scrollRef} className={styles['children']}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();

  const [windowProps] = useObservable(WindowController.model.store);
  const confirmEmailTransitionStyle = useSpring({
    from: { y: -200 },
    to: windowProps.showConfirmEmailAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });
  const passwordResetTransitionStyle = useSpring({
    from: { y: -200 },
    to: windowProps.showPasswordResetAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });
  const passwordUpdatedTransitionStyle = useSpring({
    from: { y: -200 },
    to: windowProps.showPasswordUpdatedAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1,
    },
  });

  useEffect(() => {
    if (windowProps.showPasswordUpdatedAlert) {
      setTimeout(
        () => WindowController.updateShowPasswordUpdatedAlert(false),
        4000
      );
    }
  }, [windowProps.showPasswordUpdatedAlert]);

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location]);

  return (
    <div className={styles['root']}>
      {windowProps.isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <ResponsiveDesktop>
            <WindowDesktopComponent />
          </ResponsiveDesktop>
          <ResponsiveMobile>
            <WindowMobileComponent />
          </ResponsiveMobile>
        </>
      )}

      <Alert
        className={styles['alert']}
        style={confirmEmailTransitionStyle}
        title={Strings.emailConfirmation}
        variant={'info'}
        withIcon={true}
        closable={true}
        onCloseClick={() => WindowController.updateShowConfirmEmailAlert(false)}
      >
        {Strings.emailConfirmationDescription}
      </Alert>
      <Alert
        className={styles['alert']}
        style={passwordResetTransitionStyle}
        title={Strings.passwordReset}
        variant={'info'}
        withIcon={true}
        closable={true}
        onCloseClick={() =>
          WindowController.updateShowPasswordResetAlert(false)
        }
      >
        {Strings.passwordResetDescription}
      </Alert>
      <Alert
        className={styles['alert']}
        style={passwordUpdatedTransitionStyle}
        title={Strings.passwordUpdated}
        variant={'success'}
        withIcon={true}
        closable={false}
      >
        {Strings.passwordUpdatedDescription}
      </Alert>
    </div>
  );
}
