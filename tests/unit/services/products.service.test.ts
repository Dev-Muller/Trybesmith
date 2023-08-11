import { expect } from 'chai';
import sinon from 'sinon';

import productModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service';
import productMock from '../../mocks/product.mock';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return a new product', async function () {
    const product = productMock;
    const createNewProduct = productModel.build();
    sinon.stub(productModel, 'create').resolves(createNewProduct);

    const result = await productService.productCreate(product.name, product.price, product.orderId);

    expect(result).to.be.an('object');
    expect(result.data).to.have.property('id');
    expect(result.data).to.have.property('name');
    expect(result.data).to.have.property('price');
    expect(result.data).to.have.property('orderId');
  });
});
