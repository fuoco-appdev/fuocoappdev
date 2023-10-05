import { PipeableStream, renderToPipeableStream } from 'react-dom/server';
import AppComponent from './components/app.component';
import { ReactElement, StrictMode, ComponentType, cloneElement } from 'react';
import Helmet, { HelmetData } from 'react-helmet';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import { Request, Response, RouterOptions } from 'express';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';
import { Writable } from 'stream';
import fs from 'fs';
import MedusaService from './services/medusa.service';
import { getRoutePaths, RoutePathsType, updateRoutes } from './route-paths';
import {
  PathMatch,
  RouteObject,
  matchPath,
  matchRoutes,
} from 'react-router-dom';

class HtmlWritable extends Writable {
  private _chunks: any[] = [];
  private _html: string = '';

  getHtml() {
    return this._html;
  }

  override _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    this._chunks.push(chunk);
    callback();
  }

  override _final(callback: () => void) {
    this._html = Buffer.concat(this._chunks).toString();
    callback();
  }
}

function createFetchRequest(req: Request): globalThis.Request {
  let origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on('close', () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new globalThis.Request(url.href, init);
}

export async function render(
  request: Request,
  response: Response
): Promise<void> {
  const statsFile = path.resolve('./dist/apps/app/client/loadable-stats.json');
  const indexHtmlPath = path.resolve(__dirname, '../client/index.html');
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const extractor = new ChunkExtractor({ statsFile, publicPath: '.' });
  const htmlWritable = new HtmlWritable();
  let routePaths = getRoutePaths();

  try {
    // We block rendering until all promises have resolved
    const matchedAgnosticRoute = matchRoutes(routePaths, request.url)?.at(-1);
    const route = matchedAgnosticRoute?.route;
    const element = route?.element as any;
    if (route && element?.type?.getServerSidePropsAsync) {
      const props = await element?.type.getServerSidePropsAsync(
        route,
        request,
        response
      );
      route.element = cloneElement(element, props);
      routePaths = updateRoutes(routePaths, route);
    }
  } catch (error) {
    console.error(error);
  }

  let { query, dataRoutes } = createStaticHandler(routePaths);
  let fetchRequest = createFetchRequest(request);
  let context = await query(fetchRequest);
  if (context instanceof globalThis.Response) {
    throw context;
  }
  let router = createStaticRouter(dataRoutes, context);

  const { pipe, abort } = renderToPipeableStream(
    extractor.collectChunks(
      <StrictMode>
        <StaticRouterProvider router={router} context={context} />
      </StrictMode>
    ),
    {
      bootstrapScripts: ['/main.js'],
      onShellReady: () => {
        response.setHeader('Content-type', 'text/html');
        pipe(htmlWritable);
      },
    }
  );

  htmlWritable.on('finish', () => {
    const html = htmlWritable.getHtml();
    Helmet.canUseDOM = false;
    const helmet = Helmet.renderStatic();
    const scriptTags = extractor.getScriptTags();
    const styleTags = extractor.getStyleTags();
    const linkTags = extractor.getLinkTags();
    if (helmet?.htmlAttributes) {
      indexHtml = indexHtml.replace(
        /<html[^>]+>/g,
        `<html ${helmet.htmlAttributes.toString()}>`
      );
    }
    if (helmet?.bodyAttributes) {
      indexHtml = indexHtml.replace(
        /<body[^>]+>/g,
        `<body ${helmet.bodyAttributes.toString()}>`
      );
    }
    if (helmet?.title) {
      const title = helmet.title.toString() as string;
      if (title.match(/<title[^>]+>(.*?)<\/title>/g)) {
        indexHtml = indexHtml.replace(/<title[^>]+>(.*?)<\/title>/g, title);
      } else {
        indexHtml = indexHtml.replace(
          /<title[^>]+>(.*?)<\/title>/g,
          `<title>${title}</title>`
        );
      }
    }
    if (helmet?.meta) {
      indexHtml = indexHtml.replace(
        /<meta (data-react-helmet="true")(.*?)\/>/g,
        helmet.meta.toString()
      );
    }
    if (helmet?.link) {
      indexHtml = indexHtml.replace(
        /<link (data-react-helmet="true")(.*?)\/>/g,
        helmet.link.toString() + linkTags + styleTags
      );
    }
    if (html) {
      indexHtml = indexHtml.replace(
        /<div (id="root")[^>]+>(.*?)<\/div>/g,
        `<div id="root" style="height: 100%; width: 100%;">${html}</div>`
      );
    }
    if (scriptTags) {
      const bodyRegex = /<body[^>]*>(.*?)<\/body>/is;
      let bodyHtml = indexHtml.match(bodyRegex)?.[0] ?? '';
      const firstBodyTag = bodyHtml?.match(/<body[^>]*>/g)?.[0] ?? '';
      const lastBodyTag = bodyHtml?.match(/<\/body>/g)?.[0] ?? '';
      bodyHtml = bodyHtml?.replace(firstBodyTag, '');
      bodyHtml = bodyHtml?.replace(lastBodyTag, '');
      const htmlWithScripts =
        firstBodyTag + bodyHtml + scriptTags + lastBodyTag;
      indexHtml = indexHtml.replace(bodyRegex, htmlWithScripts);
    }
    response.send(indexHtml);
  });

  setTimeout(abort, 10000);
}
