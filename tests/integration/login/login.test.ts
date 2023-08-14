import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';

chai.use(chaiHttp);

const hash = '$2a$10$gdjqo7xMnuD11ATzCbYC0.477X4Ro2PDhRGIGn/Na6WXfdrdI1rny';

const mockBuild = {
  id: 1,
  username: 'Asuna',
  vocation: 'Espadachim',
  level: 180,
  password: hash
}

const userMock = {
  username: 'Asuna',
  password: 'terrível'
}

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('faz login no usuario', async function () {
    const variavel = UserModel.build(mockBuild);
    sinon.stub(UserModel, 'findOne').resolves(variavel);

    const response = await chai.request(app).post('/login').send(userMock);

    expect(response).to.have.status(200);
  })
});
