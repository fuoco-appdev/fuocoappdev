import express from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
const MockBrowser = require('mock-browser').mocks.MockBrowser;

declare const __non_webpack_require__: any;

const PORT = process.env['PORT'] || 4200;
const app = express();
const router = express.Router();
const mock = new MockBrowser();
global['window'] = mock.getWindow();
global['document'] = mock.getDocument();
global['location'] = mock.getLocation();
global['history'] = mock.getHistory();
global['navigator'] = mock.getNavigator();
global['localStorage'] = mock.getLocalStorage();
global['sessionStorage'] = mock.getSessionStorage();

const mainPath = path.resolve(__dirname, '../server/main.js');
const indexHtmlPath = path.resolve(__dirname, '../client/index.html');
router.use(express.static(path.resolve(__dirname, '../client')));
router.use('*', (req, res) => {
  let indexData = fs.readFileSync(indexHtmlPath, 'utf8');
  // Skip caching ssr fragment in dev mode.
  if (process.env['NODE_ENV'] !== 'production') {
    delete __non_webpack_require__.cache[mainPath];
  }
  const main = __non_webpack_require__(mainPath);
  const { html, helmet } = main.render(req);
  if (helmet?.htmlAttributes) {
    indexData = indexData.replace(
      /<html[^>]+>/g,
      `<html ${helmet.htmlAttributes.toString()}>`
    );
  }
  if (helmet?.bodyAttributes) {
    indexData = indexData.replace(
      /<body[^>]+>/g,
      `<body ${helmet.bodyAttributes.toString()}>`
    );
  }
  if (helmet?.title) {
    indexData = indexData.replace(
      /<title[^>]+>(.*?)<\/title>/g,
      helmet.title.toString()
    );
  }
  if (helmet?.meta) {
    indexData = indexData.replace(
      /<meta (data-react-helmet="true")(.*?)\/>/g,
      helmet.meta.toString()
    );
  }
  if (helmet?.link) {
    indexData = indexData.replace(
      /<link (data-react-helmet="true")(.*?)\/>/g,
      helmet.link.toString()
    );
  }
  if (html) {
    indexData = indexData.replace(
      /<div (id="root")[^>]+>(.*?)<\/div>/g,
      `<div id="root" style="height: 100%; width: 100%;">${html}</div>`
    );
  }

  return res.send(indexData);
});

app.use(cors());
app.use(router);
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
