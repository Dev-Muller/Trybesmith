import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import { Order } from '../../../src/types/Order';

chai.use(chaiHttp);

const mockOrders = [
  {
    dataValues: {
      id: 1,
      userId: 1,
      productIds: [
        {
          id: 1,
          name: 'Excalibur',
          price: '1000 moedas de Ouro',
          orderId: 1
        }
      ]
    }
  },
  {
    dataValues: {
      id: 2,
      userId: 2,
      productIds: [
        {
          id: 2,
          name: 'Aegis Shield',
          price: '150 ourinhos',
          orderId: 2
        }
      ]
    }
  }
];

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('listara todos as orders', async function () {
    sinon.stub(OrderModel, 'findAll').resolves(mockOrders as any);

    const response = await chai.request(app).get('/orders').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });
});
