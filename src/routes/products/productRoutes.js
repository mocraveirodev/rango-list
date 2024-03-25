import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
    createProductSchema,
    restaurantIdSchema,
    getAllProductsSchema,
    restaurantProductParamsSchema,
    patchProductSchema
} from '../../validators/productValidator.js';
import ProductController from '../../controllers/products/ProductController.js';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/:restaurantId', celebrate({
    params: restaurantIdSchema,
    query: getAllProductsSchema
}), productController.getAll);

productRouter.get('/:restaurantId/:productId', celebrate({
    params: restaurantProductParamsSchema,
}), productController.getById);

productRouter.post('/:restaurantId/:productId', celebrate({
    params: restaurantIdSchema,
    body: createProductSchema
}), productController.create);

productRouter.patch('/:restaurantId/:productId', celebrate({
    params: restaurantProductParamsSchema,
    body: patchProductSchema
}), productController.update);

export default productRouter;
