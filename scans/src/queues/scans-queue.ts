import Queue from 'bull';
import { AssetLastScanUpdatedPublisher } from '../events/publishers/asset_last_scan-updated-publisher';
import { Scan } from '../models/scan';
import { natsWrapper } from '../nats-wrapper';
import { ScanStatus } from '../utils';
interface Payload {
  scanId: string;
}

const scansQueue = new Queue<Payload>('asset:scans', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

scansQueue.process(async (job) => {
    console.log("processing: " +  job.data.scanId)
    const scan = await Scan.findById(job.data.scanId).populate('asset');

    if (!scan) {
      throw new Error('Asset not found');
    }

    scan.set({ status: ScanStatus.Succeeded  });
    await scan.save();
    new AssetLastScanUpdatedPublisher(natsWrapper.client).publish({
      assetId: scan.asset.id,
      lastScanDate: scan.startsAt
    });
});

export { scansQueue };
