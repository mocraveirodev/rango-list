import { CreateRestaurantService } from '../../services/restaurants/CreateRestaurantService.js';

export class RestaurantsController {
    async create(req, res) {
        const { name, address, openingHours } = req.body;

        const createRestaurantService = new CreateRestaurantService();

        const restaurant = await createRestaurantService.execute({
            name,
            address,
            openingHours,
        }, res);

        return res.status(201).json({ restaurant });
    }
}