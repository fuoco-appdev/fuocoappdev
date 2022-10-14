/* eslint-disable @typescript-eslint/no-empty-interface */
import {Auth} from '@fuoco.appdev/core-ui';
import styles from './forgot-password.module.scss';
import WindowController from '../controllers/window.controller';
import AuthService from '../services/auth.service';
import { ApiError } from "@supabase/supabase-js";
import { Strings } from "../localization";
import { useState, useEffect } from "react";
import { animated, config, useTransition } from "react-spring";
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../route-paths';
import ResetPasswordController from '../controllers/reset-password.controller';
import { useObservable } from '@ngneat/use-observable';

export interface ResetPasswordProps {}

export default function ResetPasswordComponent(): JSX.Element {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.hash);
    const accessToken = query.get('#access_token');
    if (accessToken !== null) {
        ResetPasswordController.updateAccessToken(accessToken);
    }
  }, [location]);

  useEffect(() => {
    setShow(true);

    return () => {
      setShow(false);
    }
  }, []);

  const transitions = useTransition(show, {
    from: { opacity: 0, y: 5 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 5 },
    config: config.gentle,
  });

  const [props] = useObservable(ResetPasswordController.model.store);
  return props.accessToken ? (
    <div className={styles["root"]}>
      <div className={styles["content"]}>
        {transitions((style, item) => item && (
          <animated.div style={style}>
            <Auth.ResetPassword
                passwordErrorMessage={error ? error.message : undefined}
                strings={{
                    emailAddress: Strings.emailAddress,
                    yourEmailAddress: Strings.yourEmailAddress,
                    sendResetPasswordInstructions: Strings.sendResetPasswordInstructions,
                    goBackToSignIn: Strings.goBackToSignIn
                }}
                onPasswordUpdated={() => {
                    WindowController.updateShowPasswordResetAlert(false);
                    WindowController.updateShowPasswordUpdatedAlert(true);
                    ResetPasswordController.updateAccessToken(undefined);
                    setError(null);
                    navigate(RoutePaths.User);
                }}
                onResetPasswordError={(error: ApiError) => setError(error)}
                supabaseClient={AuthService.supabaseClient}
                accessToken={props.accessToken}
            />
          </animated.div>
        ))}
      </div>
    </div>
  ) : (<div/>);
}