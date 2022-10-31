import { Message } from 'node-nats-streaming';
import { Subjects, Listener, AssetCreatedEvent } from '../../utils';
import { Asset } from '../../models/asset';
import { queueGroupName } from './queue-group-name';

export class AssetCreatedListener extends Listener<AssetCreatedEvent> {
  subject: Subjects.AssetCreated = Subjects.AssetCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: AssetCreatedEvent['data'], msg: Message) {
    const { id, ip, name,description,dateCreated } = data;

    const asset = Asset.build({
      id,
      ip,
      name,
      description,
      dateCreated
    });
    await asset.save();

    msg.ack();
  }
}
