import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
// import { Order } from '../../types/Order';
import { Status } from '../types/Status';

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

export default {
  getAllOrder,
};  
