import request from 'supertest';
import { app } from '../../app';

const createAsset = () => {
  return request(app).post('/api/assets').set('Cookie', global.signin()).send({
    title: 'asldkf',
    price: 20,
  });
};

it('can fetch a list of assets', async () => {
  await createAsset();
  await createAsset();
  await createAsset();

  const response = await request(app).get('/api/assets').send().expect(200);

  expect(response.body.length).toEqual(3);
});
