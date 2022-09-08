import React from 'react';
import { Outlet } from "react-router-dom";
import { WorldComponent } from './world.component';
import styles from './window.module.scss';

export class WindowComponent extends React.Component {
  public override render(): React.ReactNode {
      return (
        <div className={styles["root"]}>
          <div className={styles["background"]}>
            <WorldComponent />
          </div>
          <div className={styles["content"]}>
            <div className={styles["navbar"]}>
              <div className={styles["navbarContainer"]}>
                <img className={styles["logo"]} src="../assets/svg/logo.svg" alt="logo"/>
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