import { Asset } from '../asset';

it('implements optimistic concurrency control', async () => {
  // Create an instance of a asset
  const asset = Asset.build({
    title: 'concert',
    price: 5,
    userId: '123',
  });

  // Save the Asset to the database
  await asset.save();

  // fetch the asset twice
  const firstInstance = await Asset.findById(asset.id);
  const secondInstance = await Asset.findById(asset.id);

  // make two separate changes to the asset we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first fetched asset
  await firstInstance!.save();

  // save the second fetched asset and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const asset = Asset.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  await asset.save();
  expect(asset.version).toEqual(0);
  await asset.save();
  expect(asset.version).toEqual(1);
  await asset.save();
  expect(asset.version).toEqual(2);
});
