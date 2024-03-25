import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
    createProductSchema,
    restaurantIdSchema,
} from '../../validators/productValidator.js';
import ProductController from '../../controllers/products/ProductController.js';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/:restaurantId', celebrate({
    params: restaurantIdSchema,
    body: createProductSchema
}), productController.create);

export default productRouter;
