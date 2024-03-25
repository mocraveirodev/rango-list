import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
    getAllRestaurantsSchema,
    restaurantIdSchema,
    createRestaurantSchema,
    patchRestaurantSchema
} from '../../validators/restaurantValidator.js';
import RestaurantController from '../../controllers/restaurants/RestaurantController.js';

const restaurantsRouter = Router();
const restaurantController = new RestaurantController();

restaurantsRouter.get('/',celebrate({
    query: getAllRestaurantsSchema,
}), restaurantController.getAll,);

restaurantsRouter.get('/:id',celebrate({
    params: restaurantIdSchema
}), restaurantController.getById,);

restaurantsRouter.post('/', celebrate({
    body: createRestaurantSchema
}), restaurantController.create);

restaurantsRouter.patch('/:id', celebrate({
    params: restaurantIdSchema,
    body: patchRestaurantSchema
}), restaurantController.update);

restaurantsRouter.delete('/:id', celebrate({
    params: restaurantIdSchema
}), restaurantController.delete);

export default restaurantsRouter;
