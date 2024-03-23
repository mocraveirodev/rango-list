import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import { checkValidOpeningHours } from '../../utils/checkValidOpeningHours.js';
import { createAddressesIfItDoesNotExist } from '../../utils/createAddressesIfItDoesNotExist.js';
import errorHandler from '../utils/errorHandler.js';

export class CreateRestaurantService {;    
    async execute({ name, address, openingHours }, res) {
        if (openingHours) {
            const { status, message } = checkValidOpeningHours(
                openingHours,
                res,
            );
    
            if (status === 'invalid') {
            throw errorHandler(message, res);
            }
        }
    
        const restaurantsRepository = new RestaurantRepository();
        const restaurant = await restaurantsRepository.create([ name ]);
    
        return restaurant;
    }
}
