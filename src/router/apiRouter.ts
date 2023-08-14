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
import loginController from '../controller/login.controller';

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

apiRouter.post('/login', loginController.login);

export default apiRouter;