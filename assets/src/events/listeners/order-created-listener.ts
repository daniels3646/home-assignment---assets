import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '../../utils';
import { queueGroupName } from './queue-group-name';
import { Asset } from '../../models/asset';
import { AssetUpdatedPublisher } from '../publishers/asset-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the asset that the order is reserving
    const asset = await Asset.findById(data.asset.id);

    // If no asset, throw error
    if (!asset) {
      throw new Error('Asset not found');
    }

    // Mark the asset as being reserved by setting its orderId property
    asset.set({ orderId: data.id });

    // Save the asset
    await asset.save();
    await new AssetUpdatedPublisher(this.client).publish({
      id: asset.id,
      price: asset.price,
      title: asset.title,
      orderId: asset.orderId,
      version: asset.version,
    });

    // ack the message
    msg.ack();
  }
}
