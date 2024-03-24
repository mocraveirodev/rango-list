import AddressEntity from './AddressEntity.js';


export default class RestaurantAddressEntity {
    static tableName = 'restaurant_addresses';

    static relations = {
        address: AddressEntity,
    };
}