import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {Button, IconLogOut, Alert, Tabs} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import {Strings} from '../localization';
import AuthService from '../services/auth.service';
import {useObservable} from '@ngneat/use-observable';
import LoadingComponent from './loading.component';
import {useSpring } from 'react-spring';
import UserService from '../services/user.service';
import { core } from '../protobuf/core';

function SigninButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (<Button 
    className={styles["navbarButton"]} 
    size="tiny" 
    type="text"
    onClick={() => navigate(RoutePaths.Signin)}
    >{Strings.signin}</Button>);
}

function SignupButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (<Button 
    className={styles["navbarButton"]} 
    size="tiny" 
    type="text"
    onClick={() => navigate(RoutePaths.Signup)}
    >{Strings.signup}</Button>);
}

function SignoutButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (<Button 
    className={styles["navbarButton"]}
    icon={<IconLogOut />}
    size="tiny" 
    type="text"
    onClick={async () => {
      await AuthService.signoutAsync();
      navigate(RoutePaths.Signin);
    }}
    />);
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  WindowController.model.navigate = navigate;

  const user = UserService.activeUser;
  const [windowProps] = useObservable(WindowController.model.store);
  const confirmEmailTransitionStyle = useSpring({
    from: { y: -200 },
    to: windowProps.showConfirmEmailAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1
    },
  });
  const passwordResetTransitionStyle = useSpring({
    from: { y: -200 },
    to: windowProps.showPasswordResetAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1
    },
  });
  const passwordUpdatedTransitionStyle = useSpring({
    from: { y: -200 },
    to: windowProps.showPasswordUpdatedAlert ? { y: 50 } : { y: -200 },
    config: {
      friction: 30,
      tension: 600,
      bounce: 1
    },
  });

  useEffect(() => {
    if (windowProps.showPasswordUpdatedAlert) {
      setTimeout(() => WindowController.updateShowPasswordUpdatedAlert(false), 4000);
    }
  }, [windowProps.showPasswordUpdatedAlert]);

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location]);
  
  return (
    <div className={styles["root"]}>
          <div className={styles["background"]}>
            <WorldComponent />
          </div>

          {windowProps.isLoading ? <LoadingComponent /> :
            (
            <div className={styles["content"]}>
              <div className={styles["navbar"]}>
                <div className={styles["topNavbarContent"]}>
                  <div className={styles["logoContainer"]}>
                    <img className={styles["logo"]} src="../assets/svg/logo.svg" alt="logo"/>
                  </div>
                  <div className={styles["navbarContentRight"]}>
                    <div className={styles["navbarContentRightGrid"]}>
                      {windowProps.isSigninVisible ?  <SigninButtonComponent /> : null}
                      {windowProps.isSignupVisible ? <SignupButtonComponent /> : null}
                      {(windowProps.isAuthenticated && windowProps.isSignoutVisible) ? <SignoutButtonComponent /> : null}
                    </div>
                  </div>
                </div>
                <div className={styles["bottomNavbarContent"]}>
                  {(windowProps.isAuthenticated && windowProps.isTabBarVisible && user?.role === core.UserRole.USER) && (
                    <Tabs
                      activeId={windowProps.activeRoute} 
                      onChange={(id: string) => navigate(id)}
                      tabs={[
                        {
                          id: RoutePaths.Account,
                          label: Strings.account,
                        },
                        {
                          id: RoutePaths.Apps,
                          label: Strings.apps,
                        },
                        {
                          id: RoutePaths.Billing,
                          label: Strings.billing,
                        },
                      ]}
                    />
                  )}
                  {(windowProps.isAuthenticated && windowProps.isTabBarVisible && user?.role === core.UserRole.ADMIN) && (
                    <Tabs 
                      activeId={windowProps.activeRoute} 
                      onChange={(id: string) => navigate(id)}
                      tabs={[
                        {
                          id: RoutePaths.AdminAccount,
                          label: Strings.account,
                        },
                        {
                          id: RoutePaths.AdminUsers,
                          label: Strings.users,
                        },
                        {
                          id: RoutePaths.AdminApps,
                          label: Strings.apps,
                        },
                      ]}
                    />
                  )}
                </div>
              </div>
              <div className={styles["children"]}>
                <Outlet/>
              </div>
            </div>
            )
          }

          <Alert
            className={styles['alert']}
            style={confirmEmailTransitionStyle}
            title={Strings.emailConfirmation}
            variant={'info'}
            withIcon={true}
            closable={true}
            onCloseClick={() => WindowController.updateShowConfirmEmailAlert(false)}>
              {Strings.emailConfirmationDescription}
          </Alert>
          <Alert
            className={styles['alert']}
            style={passwordResetTransitionStyle}
            title={Strings.passwordReset}
            variant={'info'}
            withIcon={true}
            closable={true}
            onCloseClick={() => WindowController.updateShowPasswordResetAlert(false)}>
              {Strings.passwordResetDescription}
          </Alert>
          <Alert
            className={styles['alert']}
            style={passwordUpdatedTransitionStyle}
            title={Strings.passwordUpdated}
            variant={'success'}
            withIcon={true}
            closable={false}>
              {Strings.passwordUpdatedDescription}
          </Alert>
    </div>
  );
}