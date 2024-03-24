import { Router } from 'express';
import { celebrate } from 'celebrate';
import { 
    getQuerySchema,
    createRestaurantSchema
} from '../../validators/restaurantValidator.js';
import RestaurantController from '../../controllers/restaurants/RestaurantController.js';

const restaurantsRouter = Router();
const restaurantController = new RestaurantController();

restaurantsRouter.get(
    '/',
    celebrate({
    query: getQuerySchema,
    }),
    restaurantController.get,
);

restaurantsRouter.post('/', celebrate({
    body: createRestaurantSchema
}), restaurantController.create);

export default restaurantsRouter;
