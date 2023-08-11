import ProductModel from '../database/models/product.model';
// import { Product } from '../../types/Product';
import { Status } from '../types/Status';

async function productCreate(name: string, price: string, orderId: number): Promise<Status> {
  const newProduct = await ProductModel.create({ name, price, orderId });
  return { status: 201, data: newProduct };
}

export default {
  productCreate,
};  
