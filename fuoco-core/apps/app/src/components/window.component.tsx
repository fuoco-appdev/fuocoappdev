import React from 'react';
import { Outlet, useLocation, useNavigate, NavigateFunction} from "react-router-dom";
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {Button, IconLogOut} from '@fuoco.appdev/core-ui';
import { WindowState } from '../models/window.model';
import { RoutePaths } from '../route-paths';
import { Subscription } from 'rxjs';
import {Strings} from '../localization';
import AuthService from '../services/auth.service';
import { select } from '@ngneat/elf';

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

export interface WindowProps {
  navigation: NavigateFunction;
}

class WindowComponent extends React.Component<WindowProps, WindowState> {
  private _stateSubscription: Subscription | undefined;
  private _isAuthenticatedSubscription: Subscription | undefined;

  public constructor(props: WindowProps) {
    super(props);

    this.state = WindowController.model.store.getValue();
  }

  public override componentDidMount(): void {
      this._stateSubscription = WindowController.model.store.subscribe({
        next: () => this.setState(WindowController.model.store.getValue())
      });

      this._isAuthenticatedSubscription = WindowController.model.store
        .pipe(select(store => store.isAuthenticated))
        .subscribe({
          next: (isAuthenticated: boolean) => {
            if (isAuthenticated === true) {
              this.props.navigation(RoutePaths.Account);
            }
            else if (isAuthenticated === false) {
              this.props.navigation(RoutePaths.Signin);
            }
          }
      });
  }

  public override componentWillUnmount(): void {
      this._stateSubscription?.unsubscribe();
      this._isAuthenticatedSubscription?.unsubscribe();
  }

  public override render(): React.ReactNode {
      const {isSigninVisible, isSignupVisible, isSignoutVisible} = this.state;

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
                    {isSigninVisible ?  <SigninButtonComponent /> : null}
                    {isSignupVisible ? <SignupButtonComponent /> : null}
                    {isSignoutVisible ? <SignoutButtonComponent /> : null}
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
}

export default function ReactiveWindowComponent(): JSX.Element {
  const location = useLocation();
  const navigation = useNavigate();
  WindowController.model.location = location;
  
  return (<WindowComponent navigation={navigation}/>);
}