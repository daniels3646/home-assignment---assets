import express, { Request, Response } from 'express';
import { Scan } from '../models/scan';

const router = express.Router();

router.get('/api/scans', async (req: Request, res: Response) => {
  const scans = await Scan.find({}).populate('asset');

  res.send(scans);
});

export { router as indexScanRouter };
