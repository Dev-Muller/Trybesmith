import { Router } from 'express';
import productController from '../controller/product.controller';

const apiRouter = Router();

apiRouter.post('/products', productController.productCreate);
apiRouter.get('/products', productController.getAllProducts);

export default apiRouter;