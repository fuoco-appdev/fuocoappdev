import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './i18n';

import AppComponent from './components/app.component';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
