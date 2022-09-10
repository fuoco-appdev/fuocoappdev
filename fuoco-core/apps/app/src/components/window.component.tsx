import React from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import WindowController from '../controllers/window.controller';
import WorldComponent from './world.component';
import styles from './window.module.scss';
import {Button} from '@fuoco.appdev/core-ui';
import { WindowProps } from '../models/window.model';
import { useObservable } from '@ngneat/react-rxjs';
import { RoutePaths } from '../route-paths';

class WindowComponent extends React.Component<WindowProps> {
  public constructor(props: WindowProps) {
    super(props);

    this.onSigninClick = this.onSigninClick.bind(this);
    this.onSignupClick = this.onSignupClick.bind(this);
  }

  public override render(): React.ReactNode {
      const {isSigninVisible, isSignupVisible} = this.props;

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
                    {isSigninVisible ? <Button 
                      className={styles["navbarButton"]} 
                      size="tiny" 
                      type="text"
                      onClick={this.onSigninClick}>Sign in</Button> : null}
                    {isSignupVisible ? <Button 
                      className={styles["navbarButton"]} 
                      size="tiny" 
                      type="text"
                      onClick={this.onSignupClick}>Sign up</Button> : null}
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
    this.props.navigate?.(RoutePaths.Signup);
  }

  private onSignupClick(event: React.MouseEvent): void {
    this.props.navigate?.(RoutePaths.Signin);
  }
}

export default function ReactiveWindowComponent(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  WindowController.model.location = location;
  WindowController.model.navigate = navigate;

  const [props] = useObservable(WindowController.model.store);
  return (<WindowComponent {...props} />);
}