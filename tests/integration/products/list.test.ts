import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productModel from '../../../src/database//models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('listara todos os produtos', async function () {
    const product = {
      name: 'Produto 1',
      price: '10 moedas de ouro',
      orderId: 4
    };
    const listProducts = productModel.bulkBuild([product]);
    sinon.stub(productModel, 'findAll').resolves(listProducts);

    const response = await chai.request(app).get('/products').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array');
  });
});
