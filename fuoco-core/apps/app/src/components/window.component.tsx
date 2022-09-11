import React from 'react';
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {Button} from '@fuoco.appdev/core-ui';
import { WindowState } from '../models/window.model';
import { RoutePaths } from '../route-paths';
import { Subscription } from 'rxjs';

function SigninButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (<Button 
    className={styles["navbarButton"]} 
    size="tiny" 
    type="text"
    onClick={() => navigate(RoutePaths.Signin)}
    >Sign in</Button>);
}

function SignupButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (<Button 
    className={styles["navbarButton"]} 
    size="tiny" 
    type="text"
    onClick={() => navigate(RoutePaths.Signup)}
    >Sign up</Button>);
}

export interface WindowProps {}

class WindowComponent extends React.Component<WindowProps, WindowState> {
  private _stateSubscription: Subscription | undefined;

  public constructor(props: WindowProps) {
    super(props);

    this.state = WindowController.model.store.getValue();
  }

  public override componentDidMount(): void {
      this._stateSubscription = WindowController.model.store.asObservable().subscribe({
        next: () => this.setState(WindowController.model.store.getValue())
      });
  }

  public override componentWillUnmount(): void {
      this._stateSubscription?.unsubscribe();
  }

  public override render(): React.ReactNode {
      const {isSigninVisible, isSignupVisible} = this.state;

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
  WindowController.model.location = location;
  
  return (<WindowComponent />);
}