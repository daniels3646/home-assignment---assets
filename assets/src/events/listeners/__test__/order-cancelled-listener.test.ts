import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent } from '@cygnetops/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { Asset } from '../../../models/asset';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
  const asset = Asset.build({
    title: 'concert',
    price: 20,
    userId: 'asdf',
  });
  asset.set({ orderId });
  await asset.save();

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    asset: {
      id: asset.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, asset, orderId, listener };
};

it('updates the asset, publishes an event, and acks the message', async () => {
  const { msg, data, asset, orderId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedAsset = await Asset.findById(asset.id);
  expect(updatedAsset!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
