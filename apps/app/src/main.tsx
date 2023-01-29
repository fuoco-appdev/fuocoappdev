import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import AppComponent from './components/app.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppComponent />
  </StrictMode>
);
