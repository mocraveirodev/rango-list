import OpeningHoursRepository from '../../repositories/openingHours/OpeningHoursRepository.js';
import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import RestaurantAddressRepository from '../../repositories/restaurants/RestaurantAddressRepository.js';
import { checkValidOpeningHours } from '../../utils/checkValidOpeningHours.js';
import { checkAndCreateAddressIfNotExists } from '../../utils/checkAndCreateAddressIfNotExists.js';
import errorHandler from '../../utils/errorHandler.js';

export class CreateRestaurantService {;    
    async execute({ name, address, openingHours }, res) {
        if (openingHours) {
            const { status, message } = checkValidOpeningHours(openingHours, res);

            if (status === 'invalid') {
                throw errorHandler(message, res);
            }
        }

        const restaurantRepository = new RestaurantRepository();
        const restaurant = await restaurantRepository.create([ name ]);
        console.log("restaurant", restaurant);
        const checkedAddress = await checkAndCreateAddressIfNotExists(address);
        console.log("checkedAddress", checkedAddress);
        const restaurantAddressRepository = new RestaurantAddressRepository();
        await restaurantAddressRepository.create(restaurant.id, checkedAddress.id);

        const openingHoursRepository = new OpeningHoursRepository();
        await openingHoursRepository.create(restaurant.id, openingHours);

        return restaurant;
    }
}
