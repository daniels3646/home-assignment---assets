import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@cygnetops/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Asset } from '../../../models/asset';

const setup = async () => {
  // Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create and save a asset
  const asset = Asset.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  await asset.save();

  // Create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'alskdfj',
    expiresAt: 'alskdjf',
    asset: {
      id: asset.id,
      price: asset.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, asset, data, msg };
};

it('sets the userId of the asset', async () => {
  const { listener, asset, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedAsset = await Asset.findById(asset.id);

  expect(updatedAsset!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, asset, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a asset updated event', async () => {
  const { listener, asset, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const assetUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(assetUpdatedData.orderId);
});
