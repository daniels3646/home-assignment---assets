import express, { Request, Response } from 'express';
import { NotFoundError } from '../utils';
import { Asset } from '../models/asset';

const router = express.Router();

router.get('/api/assets/:id', async (req: Request, res: Response) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    throw new NotFoundError();
  }

  res.send(asset);
});

export { router as showAssetRouter };
