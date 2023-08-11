import { Request, Response } from 'express';
import productService from '../services/product.service';

// import { Product } from '../../types/Product';

// import { Status } from '../../types/Status';

async function productCreate(request: Request, response: Response): Promise<Response> {
  const { name, price, orderId } = request.body;
  
  const { status, data } = await productService.productCreate(name, price, orderId);
  return response.status(status).json(data);
}

export default {
  productCreate,
};