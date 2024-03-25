import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
    createProductSchema,
    restaurantIdSchema,
    getAllProductsSchema,
    getProductByIdSchema
} from '../../validators/productValidator.js';
import ProductController from '../../controllers/products/ProductController.js';

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/:restaurantId', celebrate({
    params: restaurantIdSchema,
    query: getAllProductsSchema
}), productController.getAll);

productRouter.get('/:restaurantId/:productId', celebrate({
    params: getProductByIdSchema,
}), productController.getById);

productRouter.post('/:restaurantId', celebrate({
    params: restaurantIdSchema,
    body: createProductSchema
}), productController.create);

export default productRouter;