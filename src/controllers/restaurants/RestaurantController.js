import { GetAllRestaurantsService } from '../../services/restaurants/GetAllRestaurantsService.js';
import { GetRestaurantByIdService } from '../../services/restaurants/GetRestaurantByIdService.js';
import { CreateRestaurantService } from '../../services/restaurants/CreateRestaurantService.js';
import { UpdateRestaurantService } from '../../services/restaurants/UpdateRestaurantService.js';
import { DeleteRestaurantService } from '../../services/restaurants/DeleteRestaurantService.js';

export default class RestaurantController {
    async getAll(req, res) {
        const { page, perPage } = req.query;

        const getAllRestaurantsService = new GetAllRestaurantsService();
;        const { pageInfo, restaurants } = await getAllRestaurantsService.execute({
            page,
            perPage,
        });

        return res.status(200).json({ pageInfo, restaurants });
    }

    async getById(req, res) {
        const { id } = req.params;
        const getRestaurantByIdService = new GetRestaurantByIdService();
        const restaurant = await getRestaurantByIdService.execute(id);
        return res.status(200).json(restaurant);
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

    async update(req, res) {
        const { id } = req.params;
        const { name, address, opening_hours } = req.body;
        const updateRestaurantService = new UpdateRestaurantService();
        const restaurant = await updateRestaurantService.execute({
            id,
            name,
            address,
            opening_hours,
        }, res);

        return res.status(200).json(restaurant);
    }

    async delete(req, res) {
        const { id } = req.params;
        const deleteRestaurantService = new DeleteRestaurantService();
        await deleteRestaurantService.execute(id);
    
        return res.status(204).send();
    }
}