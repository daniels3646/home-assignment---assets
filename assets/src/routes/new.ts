import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../utils';
import { Asset } from '../models/asset';
import { AssetCreatedPublisher } from '../events/publishers/asset-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/assets',
  [
    body('ip').not().isEmpty().withMessage('ip is required'),
    body('name').not().isEmpty().withMessage('name is required'),
    body('description')
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { ip, name, description } = req.body;

    const asset = Asset.build({
      ip,
      name,
      dateCreated : new Date(),
      description,
    });
    await asset.save();
    new AssetCreatedPublisher(natsWrapper.client).publish({
      id: asset.id,
      ip: asset.ip,
      name: asset.name,
      dateCreated: asset.dateCreated,
      description: asset.description,
      version: asset.version,
    });

    res.status(201).send(asset);
  }
);

export { router as createAssetRouter };
