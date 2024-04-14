import ReactDOM from 'react-dom';
import './i18n';

import { loadableReady } from '@loadable/component';
import { CookiesProvider } from 'react-cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getRoutePaths } from './route-paths';

const routePaths = getRoutePaths();
const router = createBrowserRouter(routePaths);

loadableReady(() => {
  ReactDOM.hydrate(
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>,
    document.getElementById('root') as HTMLElement
  );
});
