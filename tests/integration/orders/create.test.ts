import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY5MjM3ODk3MH0.-aoIexImsqTzCe7lo0y29M_VdiPG_rs_xenTDT9xGAY';

const mock = {
  id: 6,
  userId: 1
}

const mockUser = {
  id: 1,
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: '$2a$10$/vfgnwA/GDpU2HGt/qkA9OG0w7f26AjLcTrJgMOL.eluPruNgm4.W'
}

describe('POST /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('criar uma nova order', async function () {
    const newBuild = OrderModel.build(mock)
    sinon.stub(OrderModel, 'create').resolves(newBuild);
    const modelBuild = UserModel.build(mockUser)
    sinon.stub(UserModel, 'findByPk').resolves(modelBuild);
    sinon.stub(ProductModel, 'update').resolves();

    const response = await chai.request(app).post('/orders').send({
      "productIds": [1, 2],
      "userId": 1
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.an('object');
  })
});
