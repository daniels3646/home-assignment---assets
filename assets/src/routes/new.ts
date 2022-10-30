import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '../utils';
import { Asset } from '../models/asset';
import { AssetCreatedPublisher } from '../events/publishers/asset-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/assets',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const asset = Asset.build({
      title,
      price,
    });
    await asset.save();
    new AssetCreatedPublisher(natsWrapper.client).publish({
      id: asset.id,
      title: asset.title,
      price: asset.price,
      version: asset.version,
    });

    res.status(201).send(asset);
  }
);

export { router as createAssetRouter };
