import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { healthRouter, router } from './routes/index.js';
import { BASE_URL, FORCE_SHUT_DOWN_TIME } from './constants.js';
import { logConnection, logger } from './debug/index.js';
import { logRequest } from './middlewares/logRequest.js';

const app = express();

const handleShutdown = async (server: ReturnType<typeof app.listen>) => {
  logConnection('Closing server...');

  setTimeout(() => {
    logConnection('Force closing all processes...');
    process.exit(1);
  }, FORCE_SHUT_DOWN_TIME);

  server.close(() => {
    logConnection('Closed all connections gracefully.');
    process.exit(0);
  });
};

const startServer = async () => {
  try {
    app.use(bodyParser.json());
    const corsOptions = {
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
    };
    app.use(cors(corsOptions));

    logConnection('Connecting routes...');
    app.get('/', (_req, res) =>
      res.json({
        message:
          'Welcome to Express example endpoint `/health` endpoint to check if it is working',
      })
    );

    app.use(healthRouter);
    app.use(BASE_URL, logRequest, router);

    const PORT = Number(process.env.SERVER_PORT) || 8000;
    const HOST = process.env.SERVER_HOST || 'localhost';
    logConnection('Initializing listen process...');

    const server = app.listen(PORT, HOST, () => {
      console.log(`Server is listening on http://${HOST}:${PORT}`);
    });

    process.on('SIGINT', () => handleShutdown(server));
    process.on('SIGTERM', () => handleShutdown(server));
  } catch (error) {
    logger.error({ error }, 'Internal Server Error');
    process.exit(1);
  }
};

startServer();
