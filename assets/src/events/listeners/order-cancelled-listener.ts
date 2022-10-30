import { Listener, OrderCancelledEvent, Subjects } from '../../utils';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Asset } from '../../models/asset';
import { AssetUpdatedPublisher } from '../publishers/asset-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const asset = await Asset.findById(data.asset.id);

    if (!asset) {
      throw new Error('Asset not found');
    }

    asset.set({ orderId: undefined });
    await asset.save();
    await new AssetUpdatedPublisher(this.client).publish({
      id: asset.id,
      orderId: asset.orderId,
      price: asset.price,
      title: asset.title,
      version: asset.version,
    });

    msg.ack();
  }
}
