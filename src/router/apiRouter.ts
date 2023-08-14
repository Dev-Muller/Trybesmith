import { Router } from 'express';
import productController from '../controller/product.controller';
import orderController from '../controller/order.controller';

const apiRouter = Router();

apiRouter.post('/products', productController.productCreate);
apiRouter.get('/products', productController.getAllProducts);

apiRouter.get('/orders', orderController.getAllOrder);

export default apiRouter;