/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {Auth} from '@fuoco.appdev/core-ui';
import SignupController from '../controllers/signup.controller';
import styles from './signup.module.scss';
import AuthService from '../services/auth.service';
import { RoutePaths } from '../route-paths';

export interface SignupProps {}

function AuthComponent(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Auth
      providers={[
        'spotify',
        'discord',
        'facebook',
        'github',
        'google',
        'twitch',
        'twitter',
      ]}
      view={'sign_up'}
      socialColors={true}
      supabaseClient={AuthService.supabaseClient}
      onForgotPasswordRedirect={() => navigate(RoutePaths.ForgotPassword)}
      onTermsOfServiceRedirect={() => navigate(RoutePaths.TermsOfService)}
      onPrivacyPolicyRedirect={() => navigate(RoutePaths.PrivacyPolicy)}
      onSigninRedirect={() => navigate(RoutePaths.Signin)}
      onSignupRedirect={() => navigate(RoutePaths.Signup)}
      redirectTo={RoutePaths.User}
    />
  );
}

export default function ReactiveSignupComponent(): JSX.Element {
    const location = useLocation();
    SignupController.model.location = location;

    return (
      <div className={styles["root"]}>
          <div className={styles["content"]}>
            <AuthComponent />
          </div>
      </div>
    );
}