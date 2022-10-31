import { Message } from 'node-nats-streaming';
import { Subjects, Listener, AssetUpdatedEvent, AssetLastScanUpdatedEvent} from '../../utils';
import { Asset } from '../../models/asset';
import { queueGroupName } from './queue-group-name';

export class AssetLastScanUpdatedListener extends Listener<AssetLastScanUpdatedEvent> {
  subject: Subjects.AssetLastScanUpdated = Subjects.AssetLastScanUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: AssetLastScanUpdatedEvent['data'], msg: Message) {
    const asset = await Asset.findById(data.assetId);

    if (!asset) {
      throw new Error('Asset not found');
    }

    asset.set({ lastScanned : data.lastScanDate });
    await asset.save();

    msg.ack();
  }
}
