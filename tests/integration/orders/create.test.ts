import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

const mock = {
  "productIds": [1, 2],
  "userId": 1
}

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('criar uma nova order', async function () {
    sinon.stub(OrderModel, 'create').resolves(mock as any);

    const response = await chai.request(app).post('/orders').send({
      "productIds": [1, 2],
      "userId": 1
    });

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.an('object');
  })
});
