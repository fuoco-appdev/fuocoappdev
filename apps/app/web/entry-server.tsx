import { Request, Response } from 'express';
import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { matchRoutes } from 'react-router-dom';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';
import { Writable } from 'stream';
import { getRoutePaths, updateRoutes } from './route-paths';

class HtmlWritable extends Writable {
  private _chunks: any[] = [];
  private _html = '';

  getHtml() {
    return this._html;
  }

  override _write(
    chunk: any,
    _encoding: BufferEncoding,
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
  const origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
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
  response: Response,
  indexHtml: string
): Promise<string> {
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
      route.element = React.cloneElement(element, props);
      routePaths = updateRoutes(routePaths, route);
    }
  } catch (error) {
    console.error(error);
  }

  const { query, dataRoutes } = createStaticHandler(routePaths);
  const fetchRequest = createFetchRequest(request);
  const context = await query(fetchRequest);
  if (context instanceof globalThis.Response) {
    throw context;
  }
  const router = createStaticRouter(dataRoutes, context);

  const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
    <CookiesProvider cookies={(request as any).universalCookies}>
      <StaticRouterProvider router={router} context={context} />
    </CookiesProvider>,
    {
      bootstrapScripts: ['/main.js'],
      onShellReady: () => {
        response.setHeader('Content-type', 'text/html');
        pipe(htmlWritable);
      },
    }
  );

  return new Promise<string>((resolve, reject) => {
    htmlWritable.on('finish', () => {
      const html = htmlWritable.getHtml();
      Helmet.canUseDOM = false;
      const helmet = Helmet.renderStatic();
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
          helmet.link.toString()
        );
      }
      if (html) {
        indexHtml = indexHtml.replace(
          /<div (id="root")[^>]+>(.*?)<\/div>/g,
          `<div id="root" style="height: 100%; width: 100%;">${html}</div>`
        );
      }

      resolve(indexHtml);
    });

    setTimeout(abort, 10000);
  });
}
