import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { AppModule } from './app/app.module';
import * as proxy from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

const ALLOWED_TARGETS = [
  'http://localhost:18101/events/main',
  'http://localhost:9999/events/main',
  'https://node.mainnet.casper.network/events/main',
  'https://node.testnet.casper.network/events', // 2.0
];

const regex = /^https?:\/\/[a-z.-]+(?::\d+)?\/events(?:\/main)?$/;
const api_url = 'api_url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    '/events',
    (req: Request, res: Response, next: (err?: NextFunction) => void) => {
      const target = resolveApiUrl(req);
      if (!target) {
        console.error('Missing target URL for proxy');
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy target missing');
        return;
      }
      const proxyMiddleware = proxy.createProxyMiddleware({
        target,
        changeOrigin: true,
        ignorePath: true,
        pathFilter: pathFilter,
        secure: true,
        on: {
          proxyReq: (proxyReq) => {
            proxyReq.setHeader('Accept', 'text/event-stream');
          },
          error: (err, req, res) => {
            console.error(err);
          },
        },
      });

      return proxyMiddleware(req, res, next);
    },
  );
  const port = 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

function resolveApiUrl(req: Request) {
  const apiUrl = req.query[api_url] as string | undefined;

  if (!apiUrl) return null;

  const test = regex.test(apiUrl) && apiUrl;
  return test && ALLOWED_TARGETS.includes(apiUrl) ? apiUrl : null;
}

const pathFilter = function (path, req) {
  return path.match('^/$') && req.method === 'GET';
};
