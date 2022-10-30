import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from './utils';
import { createAssetRouter } from './routes/new';
import { showAssetRouter } from './routes/show';
import { indexAssetRouter } from './routes/index';
import { updateAssetRouter } from './routes/update';

const app = express();

app.set('trust proxy', true);





app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(createAssetRouter);
app.use(showAssetRouter);
app.use(indexAssetRouter);
app.use(updateAssetRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
