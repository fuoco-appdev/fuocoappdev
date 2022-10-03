import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {Button, IconLogOut} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import {Strings} from '../localization';
import AuthService from '../services/auth.service';
import {useObservable} from '@ngneat/use-observable';

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
  return (<Button 
    className={styles["navbarButton"]}
    icon={<IconLogOut />}
    size="tiny" 
    type="text"
    onClick={() => AuthService.signout()}
    />);
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  WindowController.model.navigate = navigate;

  useEffect(() => {
    WindowController.updateOnLocationChanged(location);
  }, [location]);
  
  const [props] = useObservable(WindowController.model.store);
  return (
    <div className={styles["root"]}>
          <div className={styles["background"]}>
            <WorldComponent />
          </div>
          <div className={styles["content"]}>
            <div className={styles["navbar"]}>
              <div className={styles["navbarContent"]}>
                <div className={styles["logoContainer"]}>
                  <img className={styles["logo"]} src="../assets/svg/logo.svg" alt="logo"/>
                </div>
                <div className={styles["navbarContentRight"]}>
                  <div className={styles["navbarContentRightGrid"]}>
                    {props.isSigninVisible ?  <SigninButtonComponent /> : null}
                    {props.isSignupVisible ? <SignupButtonComponent /> : null}
                    {props.isAuthenticated ? <SignoutButtonComponent /> : null}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["children"]}>
              <Outlet/>
            </div>
          </div>
    </div>
  );
}