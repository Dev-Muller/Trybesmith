import { Router } from 'express';
import productController from '../controller/product.controller';
import orderController from '../controller/order.controller';
import {
  nameRequired,
  nameString,
  nameLength,
  priceRequired,
  priceString,
  priceLength,
} from '../middlewares/product.middlewares';

const apiRouter = Router();

apiRouter.post(
  '/products',
  nameRequired,
  nameString,
  nameLength,
  priceRequired,
  priceString,
  priceLength,
  productController.productCreate,
);

apiRouter.get('/products', productController.getAllProducts);

apiRouter.get('/orders', orderController.getAllOrder);

export default apiRouter;