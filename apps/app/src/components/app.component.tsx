/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useEffect, useMemo, useRef } from 'react';
import WindowController from '../controllers/window.controller';
import AppController from '../controllers/app.controller';
import styles from './app.module.scss';
import { lazy } from '@loadable/component';
const WindowComponent = lazy(() => import('./window.component'));

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
