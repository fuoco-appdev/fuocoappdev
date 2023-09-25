/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useMemo, useRef } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Router,
  BrowserRouter,
  useLocation,
} from 'react-router-dom';
import WindowController from '../controllers/window.controller';
import WindowComponent from './window.component';
import { RoutePathsType } from '../route-paths';
import { useObservable } from '@ngneat/use-observable';
import AppController from '../controllers/app.controller';
import styles from './app.module.scss';

interface RouteElementProps {
  element: JSX.Element;
}

export function GuestComponent({
  element,
}: RouteElementProps): React.ReactElement {
  const [props] = useObservable(WindowController.model.store);
  return !props.isAuthenticated ? (
    element
  ) : (
    <Navigate to={RoutePathsType.Account} />
  );
}

export function AuthenticatedComponent({
  element,
}: RouteElementProps): React.ReactElement {
  const [props] = useObservable(WindowController.model.store);
  return props.isAuthenticated ? (
    element
  ) : (
    <Navigate to={RoutePathsType.Signin} />
  );
}

export default function AppComponent(): JSX.Element {
  const renderCountRef = useRef<number>(0);
  const memoCountRef = useRef<number>(0);
  useEffect(() => {
    renderCountRef.current += 1;

    AppController.initialize(renderCountRef.current);
    return () => {
      AppController.dispose(renderCountRef.current);
    };
  }, []);

  useMemo(() => {
    memoCountRef.current += 1;
    if (memoCountRef.current > 1) {
      return;
    }

    WindowController.updateLoadedLocationPath(window.location.pathname);
  }, []);

  return <WindowComponent />;
}
