import OpeningHoursRepository from '../../repositories/openingHours/OpeningHoursRepository.js';
import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import RestaurantAddressRepository from '../../repositories/restaurants/RestaurantAddressRepository.js';
import { checkValidOpeningHours } from '../../utils/checkValidOpeningHours.js';
import { checkAndCreateAddressIfNotExists } from '../../utils/checkAndCreateAddressIfNotExists.js';
import errorHandler from '../../utils/errorHandler.js';

export class UpdateRestaurantService {;    
    async execute({ id, name, address, opening_hours }, res) {
        if (opening_hours) {
            const { status, message } = checkValidOpeningHours(opening_hours, res);

            if (status === 'invalid') {
                throw errorHandler(message, res);
            }
        }

        const restaurantRepository = new RestaurantRepository();
        const restaurantExist = await restaurantRepository.findById(id);

        if (!restaurantExist) {
            throw errorHandler({ message: `Restaurant ${ id } not found. $404` }, res);
        }
        if (address) {
            const checkedAddress = await checkAndCreateAddressIfNotExists(address);
            
            const restaurantAddressRepository = new RestaurantAddressRepository();
            await restaurantAddressRepository.updateByRestaurantId(restaurantExist.id, checkedAddress.id);
        }
        if (opening_hours) {
            const openingHoursRepository = new OpeningHoursRepository();
            await openingHoursRepository.updateByRestaurantId(restaurantExist.id, opening_hours);
        }

        if (name) {
            await restaurantRepository.update(restaurantExist.id, name);
        }

        return { id };
    }
}
