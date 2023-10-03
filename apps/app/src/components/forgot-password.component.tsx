/* eslint-disable @typescript-eslint/no-empty-interface */
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from '@fuoco.appdev/core-ui';
import styles from './forgot-password.module.scss';
import WindowController from '../controllers/window.controller';
import SupabaseService from '../services/supabase.service';
import { RoutePathsType } from '../route-paths';
import { AuthError } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { animated, config, useTransition } from 'react-spring';
import {
  ResponsiveDesktop,
  ResponsiveMobile,
  ResponsiveTablet,
} from './responsive.component';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useObservable } from '@ngneat/use-observable';
import ForgotPasswordController from '../controllers/forgot-password.controller';
import { ForgotPasswordState } from '../models/forgot-password.model';
import { GuestComponent } from './guest.component';
import { lazy } from '@loadable/component';
import React from 'react';

const ForgotPasswordDesktopComponent = lazy(
  () => import('./desktop/forgot-password.desktop.component')
);
const ForgotPasswordMobileComponent = lazy(
  () => import('./mobile/forgot-password.mobile.component')
);

export interface ForgotPasswordResponsiveProps {
  forgotPasswordProps: ForgotPasswordState;
}

export default function ForgotPasswordComponent(): JSX.Element {
  const [forgotPasswordProps] = useObservable(
    ForgotPasswordController.model.store
  );

  const suspenceComponent = (
    <>
      <ResponsiveDesktop>
        <div />
      </ResponsiveDesktop>
      <ResponsiveTablet>
        <div />
      </ResponsiveTablet>
      <ResponsiveMobile>
        <div />
      </ResponsiveMobile>
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password | Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Forgot Password | Cruthology'} />
        <meta
          name="description"
          content={`Don't worry; we've got you covered. If you've forgotten your Cruthology password, we're here to help you regain access to your exclusive wine world.`}
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Forgot Password | Cruthology'} />
        <meta
          property="og:description"
          content={`Don't worry; we've got you covered. If you've forgotten your Cruthology password, we're here to help you regain access to your exclusive wine world.`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <GuestComponent>
          <ResponsiveDesktop>
            <ForgotPasswordDesktopComponent
              forgotPasswordProps={forgotPasswordProps}
            />
          </ResponsiveDesktop>
          <ResponsiveMobile>
            <ForgotPasswordMobileComponent
              forgotPasswordProps={forgotPasswordProps}
            />
          </ResponsiveMobile>
        </GuestComponent>
      </React.Suspense>
    </>
  );
}
