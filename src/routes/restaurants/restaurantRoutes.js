import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createRestaurantSchema } from '../../validators/restaurantValidator.js';
import { RestaurantController } from '../../controllers/restaurants/RestaurantController.js';

const restaurantsRouter = Router();
const restaurantController = new RestaurantController();


restaurantsRouter.post('/', celebrate({
    body: createRestaurantSchema
}), restaurantController.create);

export default restaurantsRouter;
