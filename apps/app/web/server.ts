import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
//@ts-ignore
import mockBrowser from 'mock-browser';
import fs from 'node:fs';
import cookiesMiddleware from 'universal-cookie-express';
import { fileURLToPath } from 'url';
const mock = new mockBrowser.mocks.MockBrowser();
global['window'] = mock.getWindow();
global['document'] = mock.getDocument();
global['location'] = mock.getLocation();
global['history'] = mock.getHistory();
Object.defineProperty(globalThis, 'navigator', mock.getNavigator());
global['localStorage'] = mock.getLocalStorage();
global['sessionStorage'] = mock.getSessionStorage();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Constants
const isProduction = process.env['NODE_ENV'] === 'production';
const port = process.env['PORT'] || 4200;
const base = process.env['BASE'] || '/';

const initialize = async () => {
  const templateHtml = isProduction
    ? fs.readFileSync('./dist/apps/app/client/index.html', 'utf-8')
    : '';
  const ssrManifest = isProduction
    ? fs.readFileSync('./dist/apps/app/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined;

  // Create http server
  const app = express();
  const assetsDir = path.resolve(__dirname, '../shared/assets');
  const assetsRequestHandler = express.static(assetsDir);
  app.use(assetsRequestHandler);
  app.use('/assets', assetsRequestHandler);
  app.use(cors());
  app.use(cookiesMiddleware());

  // Add Vite or respective production middlewares
  let vite;
  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/apps/app/client', { extensions: [] }));
  }

  if (!vite) {
    throw Error("Vite server isn't created!");
  }

  // Serve HTML
  app.use('*', async (req, res) => {
    if (!vite) {
      return;
    }

    try {
      const url = req.originalUrl.replace(base, '');
      let template;
      let render;
      if (!isProduction) {
        // Always read fresh template in development
        template = fs.readFileSync('./apps/app/web/index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('./apps/app/web/entry-server.tsx'))[
          'render'
        ];
      } else {
        template = templateHtml;
        render = (await import('./entry-server.tsx')).render;
      }

      const appHtml = await render(req, res, template);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return app;
};

initialize().then((app) => {
  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
