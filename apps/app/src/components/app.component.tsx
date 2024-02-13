/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useMemo, useRef } from 'react';
import WindowController from '../controllers/window.controller';
import AppController from '../controllers/app.controller';
import styles from './app.module.scss';
import { lazy } from '@loadable/component';
import WindowComponent from './window.component';
import SupabaseService from '../services/supabase.service';
import { useCookies } from 'react-cookie';
import { RouteObject, useLocation } from 'react-router-dom';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export interface AppProps {}

function AppComponent({}: AppProps): JSX.Element {
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const renderCountRef = useRef<number>(0);
  const memoCountRef = useRef<number>(0);

  useEffect(() => {
    renderCountRef.current += 1;

    AppController.initializeServices(renderCountRef.current);
    const subscription = SupabaseService.subscribeToAuthStateChanged(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'TOKEN_REFRESHED' && session) {
          setCookie('sb-refresh-token', session.refresh_token);
          setCookie('sb-access-token', session.access_token);
        } else if (event === 'SIGNED_OUT') {
          removeCookie('sb-refresh-token');
          removeCookie('sb-access-token');
        }
      }
    );
    AppController.initialize(renderCountRef.current);
    AppController.load(renderCountRef.current);
    return () => {
      subscription?.unsubscribe();
      AppController.disposeLoad(renderCountRef.current);
      AppController.disposeInitialization(renderCountRef.current);
    };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const formattedHash = location.hash.replace('#', '');
    const hashParts = formattedHash.split('&');
    const refreshTokenPart = hashParts.find((value) =>
      value.startsWith('refresh_token')
    );
    const accessTokenPart = hashParts.find((value) =>
      value.startsWith('access_token')
    );
    if (refreshTokenPart && accessTokenPart) {
      const refreshToken = refreshTokenPart.replace('refresh_token=', '');
      const accessToken = accessTokenPart.replace('access_token=', '');
      setCookie('sb-refresh-token', refreshToken);
      setCookie('sb-access-token', accessToken);
    }
  }, [location.pathname]);

  useEffect(() => {
    const accessToken =
      Object.keys(cookies).includes('sb-access-token') &&
      cookies['sb-access-token'];
    const refreshToken =
      Object.keys(cookies).includes('sb-refresh-token') &&
      cookies['sb-refresh-token'];
    if (accessToken && refreshToken) {
      SupabaseService.setSessionAsync(accessToken, refreshToken);
    }
  }, [cookies]);

  useMemo(() => {
    memoCountRef.current += 1;
    if (memoCountRef.current > 1) {
      return;
    }

    WindowController.updateLoadedLocationPath(window.location.pathname);
  }, []);

  return <WindowComponent />;
}

export default AppComponent;
