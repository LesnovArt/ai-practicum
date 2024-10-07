import express, { Response, Request } from 'express';

import { logConnection } from '../debug/index.js';

export const healthRouter = express.Router();

healthRouter.get('/health', (req: Request, res: Response) => {
  logConnection(`checking connection...`);
  res.status(200).json({
    message: 'Application is healthy',
  });
});
