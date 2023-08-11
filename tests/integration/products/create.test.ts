import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productModel from '../../../src/database//models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('devera ser criado um produto com sucesso', async function () {
    const product = {
      name: 'Produto 1',
      price: '10 moedas de ouro',
      orderId: 4
    };
    const createNewProduct = productModel.build();
    sinon.stub(productModel, 'create').resolves(createNewProduct);

    const response = await chai.request(app).post('/products').send(product);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.an('object');
  })
});
