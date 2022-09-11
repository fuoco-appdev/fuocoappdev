import React from 'react';
import { Outlet, useLocation, useNavigate} from "react-router-dom";
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {Button} from '@fuoco.appdev/core-ui';
import { WindowProps } from '../models/window.model';
import { RoutePaths } from '../route-paths';

function SigninButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  const callback = React.useCallback(() => {
    navigate(RoutePaths.Signin);
  }, [navigate]);
  return (<Button 
    className={styles["navbarButton"]} 
    size="tiny" 
    type="text"
    onClick={callback}
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

type WindowState = WindowProps;

class WindowComponent extends React.Component<WindowProps, WindowState> {
  public constructor(props: WindowProps) {
    super(props);

    this.state = {...props};

    this.onSigninClick = this.onSigninClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }

  public static getDerivedStateFromProps(props: WindowProps, state: WindowState) {
    if (props !== state) {
      return props;
    }

    return null;
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

  private onSigninClick(event: React.MouseEvent): void {
    if (this.props.location) {
      this.props.location.pathname = RoutePaths.Signup;
    }
  }

  private onSignupClick(event: React.MouseEvent): void {
    if (this.props.location) {
      this.props.location.pathname = RoutePaths.Signin;
    }
  }
}

export default function ReactiveWindowComponent(): JSX.Element {
  const location = useLocation();
  const props = WindowController.model.store.getValue();
  WindowController.model.location = location;
  
  return (<WindowComponent {...props}/>);
}