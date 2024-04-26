import './i18n';

import { loadableReady } from '@loadable/component';
import { CookiesProvider } from 'react-cookie';
import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getRoutePaths } from './route-paths';

const routePaths = getRoutePaths();
const router = createBrowserRouter(routePaths);

loadableReady(() => {
  hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>,
  );
});
