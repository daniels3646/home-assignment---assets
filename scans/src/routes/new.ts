import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  validateRequest,
  NotFoundError,
  ScanStatus,
  BadRequestError,
} from '../utils';
import { body } from 'express-validator';
import { Asset } from '../models/asset';
import { Scan } from '../models/scan';
import { natsWrapper } from '../nats-wrapper';
import { scansQueue } from '../queues/scans-queue';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  '/api/scans',
  [
    body('assetId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('AssetId must be provided'),
    body('startsAt')
      .isISO8601()
      .toDate()
      .withMessage('startsAt must be an iso formatted date string'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { assetId , startsAt } = req.body;

    // Find the asset the user is trying to scan in the database
    const asset = await Asset.findById(assetId);
    if (!asset) {
      throw new NotFoundError();
    }

    // Build the scan and save it to the database
    const scan = Scan.build({
      status: ScanStatus.Pending,
      startsAt ,
      asset,
    });
    await scan.save();
    // Calculate the diff between the scan time and now, uses as a delay
    const now = new Date();
    const delay = startsAt.getTime() - now.getTime();
    console.log("delay: " + delay)
    await scansQueue.add(
      {
        scanId: scan.id,
      },
      {
        delay,
      }
    );

    res.status(201).send(scan);
  }
);

export { router as newScanRouter };
