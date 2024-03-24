import OpeningHoursRepository from '../../repositories/openingHours/OpeningHoursRepository.js';
import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import RestaurantAddressRepository from '../../repositories/restaurants/RestaurantAddressRepository.js';
import { checkValidOpeningHours } from '../../utils/checkValidOpeningHours.js';
import { checkAndCreateAddressIfNotExists } from '../../utils/checkAndCreateAddressIfNotExists.js';
import errorHandler from '../../utils/errorHandler.js';

export class CreateRestaurantService {;    
    async execute({ name, address, opening_hours }, res) {
        if (opening_hours) {
            const { status, message } = checkValidOpeningHours(opening_hours, res);

            if (status === 'invalid') {
                throw errorHandler(message, res);
            }
        }

        const restaurantRepository = new RestaurantRepository();
        const restaurant = await restaurantRepository.create([ name ]);

        const checkedAddress = await checkAndCreateAddressIfNotExists(address);

        const restaurantAddressRepository = new RestaurantAddressRepository();
        await restaurantAddressRepository.create(restaurant.id, checkedAddress.id);

        const openingHoursRepository = new OpeningHoursRepository();
        await openingHoursRepository.create(restaurant.id, opening_hours);

        return restaurant;
    }
}
