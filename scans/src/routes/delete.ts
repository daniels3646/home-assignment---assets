import express, { Request, Response } from 'express';
import {
  NotFoundError,
} from '../utils';
import { Scan, ScanStatus } from '../models/scan';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/scans/:scanId',
  async (req: Request, res: Response) => {
    const { scanId } = req.params;

    const scan = await Scan.findById(scanId);

    if (!scan) {
      throw new NotFoundError();
    }
    scan.status = ScanStatus.Failed;
    await scan.save();

    res.status(204).send(scan);
  }
);

export { router as deleteScanRouter };
