import ReactDOMServer from 'react-dom/server';
import AppComponent from './components/app.component';
import { StrictMode } from 'react';
import { HelmetServerState, HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { Request } from 'express';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';

export function render(request: Request): {
  html: string;
  helmet: HelmetServerState | undefined;
  scripts: string;
} {
  const helmetContext: any = {};
  HelmetProvider.canUseDOM = false;
  const statsFile = path.resolve('./dist/apps/app/client/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const html = ReactDOMServer.renderToString(
    extractor.collectChunks(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={request.url}>
            <AppComponent />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>
    )
  );

  const { helmet } = helmetContext;
  return {
    html,
    helmet,
    scripts: extractor.getScriptTags(),
  };
}
