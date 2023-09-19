import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import AppComponent from './components/app.component';
import { StrictMode } from 'react';
import { Helmet, HelmetData, HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { Request } from 'express';

export function render(request: Request): {
  html: string;
  style: string;
  helmet: HelmetData | undefined;
} {
  const helmetContext: any = {};
  const sheet = new ServerStyleSheet();
  HelmetProvider.canUseDOM = false;
  const html = ReactDOMServer.renderToString(
    <StrictMode>
      <StyleSheetManager sheet={sheet.instance}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={request.url}>
            <AppComponent />
          </StaticRouter>
        </HelmetProvider>
      </StyleSheetManager>
    </StrictMode>
  );

  const { helmet } = helmetContext;
  return {
    style: sheet.getStyleTags(),
    html,
    helmet,
  };
}
