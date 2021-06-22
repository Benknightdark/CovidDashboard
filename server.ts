import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import fetch from 'cross-fetch';
const fetcher = async (url: string | '') => {
  const reqData = await fetch(`https://api.covid19api.com/${url}`)
  const resData = await reqData.json();
  return resData;
}
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/CovidDashboard/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // List all the current routes available with detail on each.
  server.get('/api/covid19', async (req, res) => {
    const resData = await fetcher('')
    res.json(resData);
  })

  // A summary of new and total cases per country updated daily.
  server.get('/api/covid19/summary', async (req, res) => {
    const resData = await fetcher('summary')
    res.json(resData);
  })

  // Returns all the available countries and provinces, as well as the country slug for per country requests.
  server.get('/api/covid19/countries', async (req, res) => {
    const resData = await fetcher('countries')
    res.json(resData);
  })

  // Returns all cases by case type for a country. Country must be the slug from /countries or /summary. Cases must be one of: confirmed, recovered, deaths
  server.get('/api/covid19/countries', async (req, res) => {
    const resData = await fetcher(`/total/country${req.query['slug']}`)
    res.json(resData);
  })
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });


  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
