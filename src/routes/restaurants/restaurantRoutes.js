import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
    getAllRestaurantsSchema,
    getRestaurantByIdSchema,
    createRestaurantSchema
} from '../../validators/restaurantValidator.js';
import RestaurantController from '../../controllers/restaurants/RestaurantController.js';

const restaurantsRouter = Router();
const restaurantController = new RestaurantController();

restaurantsRouter.get('/',celebrate({
    query: getAllRestaurantsSchema,
}), restaurantController.getAll,);

restaurantsRouter.get('/:id',celebrate({
    params: getRestaurantByIdSchema
}), restaurantController.getById,);

restaurantsRouter.post('/', celebrate({
    body: createRestaurantSchema
}), restaurantController.create);

export default restaurantsRouter;
