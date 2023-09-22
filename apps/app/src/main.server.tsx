import ReactDOMServer from 'react-dom/server';
import AppComponent from './components/app.component';
import { StrictMode } from 'react';
import { HelmetServerState, HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { Request } from 'express';

export function render(request: Request): {
  html: string;
  helmet: HelmetServerState | undefined;
} {
  const helmetContext: any = {};
  HelmetProvider.canUseDOM = false;
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={request.url}>
          <AppComponent />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;
  return {
    html,
    helmet,
  };
}
