import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import { formatRestaurants } from '../../utils/formatRestaurants.js';
import { getPageInfo } from '../../utils/getPageInfo.js';

export class GetAllRestaurantsService {;    
    async execute({
        page = 1,
        perPage = 10,
    }) {
        const restaurantRepository = new RestaurantRepository();
        const { count, restaurants } = await restaurantRepository.findAll({
            page,
            perPage,
        });

        const formattedRestaurants = formatRestaurants(restaurants);
        const pageInfo = getPageInfo(page, perPage, count);

        return { pageInfo, restaurants: formattedRestaurants };
    }
}
