import { Op } from 'sequelize';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
// import { Order } from '../types/Order';
import { Status } from '../types/Status';
import UserModel from '../database/models/user.model';

async function getAllOrder(): Promise<Status> {
  const newOrder = await OrderModel.findAll({
    include: { model: ProductModel, as: 'productIds', attributes: ['id'] },
  });
  const mapOrder = newOrder.map((order) => {
    const productIds = order.dataValues.productIds?.map((product) => product.id);
    return { ...order.dataValues, productIds };
  });
  console.log(mapOrder);
  return { status: 200, data: mapOrder };
}

async function createOrder(userId: number, productIds: Array<number>): Promise<Status> {
  const user = UserModel.findByPk(userId);
  if (!user) {
    return {
      status: 404,
      data: { message: '"userId" not found' },
    };
  }
  const newOrder = await OrderModel.create({ userId });

  await ProductModel.update({ orderId: newOrder.dataValues.id }, {
    where: {
      id: { [Op.in]: productIds },
    },
  });

  return { status: 201, data: { userId, productIds } };
}

export default {
  getAllOrder,
  createOrder,
};  
