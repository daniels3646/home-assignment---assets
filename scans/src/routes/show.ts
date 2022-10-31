import express, { Request, Response } from 'express';
import {
  NotFoundError,
} from '../utils';
import { Scan } from '../models/scan';

const router = express.Router();

router.get(
  '/api/scans/:scanId',
  async (req: Request, res: Response) => {
    const scan = await Scan.findById(req.params.scanId).populate('ticket');

    if (!scan) {
      throw new NotFoundError();
    }

    res.send(scan);
  }
);

export { router as showScanRouter };
