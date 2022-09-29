import React from 'react';
import {Typography, Button} from '@fuoco.appdev/core-ui';
import styles from './landing.module.scss';
import { Strings } from '../localization';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';

function SignupButtonComponent(): JSX.Element {
  const navigate = useNavigate();
  return (<Button 
    className={styles["navbarButton"]} 
    size="large" 
    type="primary"
    onClick={() => navigate(RoutePaths.Signup)}
    >{Strings.signup}</Button>);
}

export default function LandingComponent(): JSX.Element {
    return (
      <div className={styles["root"]}>
          <div className={styles["content"]}>
            <Typography.Title className={styles["title"]}>{Strings.callToAction}</Typography.Title>
            <h3 className={styles["subTitle"]}>{Strings.subCallToAction}</h3>
            <SignupButtonComponent />
          </div>
      </div>
    );
}