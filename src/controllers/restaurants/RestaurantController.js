import { GetAllRestaurantsService } from '../../services/restaurants/GetAllRestaurantsService.js';
import { CreateRestaurantService } from '../../services/restaurants/CreateRestaurantService.js';

export default class RestaurantController {

    async get(req, res) {
        const { page, perPage } = req.query;

        const getAllRestaurantsService = new GetAllRestaurantsService();
;        const { pageInfo, restaurants } = await getAllRestaurantsService.execute({
            page,
            perPage,
        });

        return res.status(200).json({ pageInfo, restaurants });
    }
    async create(req, res) {
        const { name, address, opening_hours } = req.body;

        const createRestaurantService = new CreateRestaurantService();
        const restaurant = await createRestaurantService.execute({
            name,
            address,
            opening_hours,
        }, res);

        return res.status(201).json(restaurant);
    }
}