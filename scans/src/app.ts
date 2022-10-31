import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from './utils';

import { deleteScanRouter } from './routes/delete';
import { indexScanRouter } from './routes/index';
import { newScanRouter } from './routes/new';
import { showScanRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(deleteScanRouter);
app.use(indexScanRouter);
app.use(newScanRouter);
app.use(showScanRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
