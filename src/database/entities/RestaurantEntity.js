import RestaurantAddressEntity from './RestaurantAddressEntity.js';
import OpeningHoursEntity from './OpeningHoursEntity.js';


export default class RestaurantEntity {
    static tableName = 'restaurants';

    static relations = {
        restaurantAddress: RestaurantAddressEntity,
        openingHours: OpeningHoursEntity,
    };
}