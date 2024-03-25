import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';

export class DeleteRestaurantService {;    
    async execute(id) {
        const restaurantRepository = new RestaurantRepository();
        await restaurantRepository.delete(id);
    }
}
