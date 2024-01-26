import express from 'express';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const cookiesMiddleware = require('universal-cookie-express');

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
router.use(express.static(path.resolve(__dirname, '../client')));
router.get('*', (req, res) => {
  // Skip caching ssr fragment in dev mode.
  if (process.env['NODE_ENV'] !== 'production') {
    delete __non_webpack_require__.cache[mainPath];
  }
  Object.defineProperty(window, 'location', {
    value: {
      pathname: req.url,
    },
    writable: true,
  });

  const main = __non_webpack_require__(mainPath);
  main.render(req, res);
});

app.use(cors());
app.use(cookiesMiddleware());
app.use(router);
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
