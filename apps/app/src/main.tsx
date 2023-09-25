import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './i18n';

import AppComponent from './components/app.component';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getRoutePaths } from './route-paths';
const routePaths = getRoutePaths();
const router = createBrowserRouter(routePaths);

loadableReady(() => {
  ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
