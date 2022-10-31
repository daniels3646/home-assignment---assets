import { Message } from 'node-nats-streaming';
import { Subjects, Listener, AssetUpdatedEvent } from '../../utils';
import { Asset } from '../../models/asset';
import { queueGroupName } from './queue-group-name';

export class AssetUpdatedListener extends Listener<AssetUpdatedEvent> {
  subject: Subjects.AssetUpdated = Subjects.AssetUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: AssetUpdatedEvent['data'], msg: Message) {
    const asset = await Asset.findByEvent(data);

    if (!asset) {
      throw new Error('Asset not found');
    }

    const { ip, name, description, dateCreated } = data;
    asset.set({ ip, name, description, dateCreated });
    await asset.save();

    msg.ack();
  }
}
