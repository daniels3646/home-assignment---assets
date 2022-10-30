import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '../utils';
import { Asset } from '../models/asset';
import { AssetUpdatedPublisher } from '../events/publishers/asset-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/assets/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      throw new NotFoundError();
    }

    if (asset.orderId) {
      throw new BadRequestError('Cannot edit a reserved asset');
    }

    asset.set({
      title: req.body.title,
      price: req.body.price,
    });
    await asset.save();
    new AssetUpdatedPublisher(natsWrapper.client).publish({
      id: asset.id,
      title: asset.title,
      price: asset.price,
      version: asset.version,
    });

    res.send(asset);
  }
);

export { router as updateAssetRouter };
