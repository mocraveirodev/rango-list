import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import { formatRestaurants } from '../../utils/formatRestaurants.js';

export class GetRestaurantByIdService {;    
    async execute(id) {
        const restaurantRepository = new RestaurantRepository();
        const restaurant = await restaurantRepository.findById(id);

        const [ formattedRestaurant ] = formatRestaurants(restaurant);

        return formattedRestaurant;
    }
}
