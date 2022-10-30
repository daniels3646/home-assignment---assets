import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the asset is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/assets/${id}`).send().expect(404);
});

it('returns the asset if the asset is found', async () => {
  const title = 'concert';
  const price = 20;

  const response = await request(app)
    .post('/api/assets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const assetResponse = await request(app)
    .get(`/api/assets/${response.body.id}`)
    .send()
    .expect(200);

  expect(assetResponse.body.title).toEqual(title);
  expect(assetResponse.body.price).toEqual(price);
});
