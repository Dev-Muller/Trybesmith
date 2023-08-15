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
import {
  validateToken,
  userIdRequired,
  userIdNumber,
  productIdsRequired,
  productIdsArray,
  productIdsNumber,
} from '../middlewares/user.middlewares';

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

apiRouter.post(
  '/orders', 
  validateToken,
  userIdRequired,
  userIdNumber,
  productIdsRequired,
  productIdsArray,
  productIdsNumber,
  orderController.createOrder,
);

export default apiRouter;