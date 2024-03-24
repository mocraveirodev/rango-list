import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import RestaurantAddressEntity from '../../database/entities/RestaurantAddressEntity.js';

export default class RestaurantAddressRepository {
    constructor() {
        this.restaurantAddressEntity = RestaurantAddressEntity;
    }
    async create(restaurant_id, address_id) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO ${this.restaurantAddressEntity.tableName} (restaurant_id, address_id) VALUES (?, ?)`;
        const result = await queryDatabase(connection, query, [restaurant_id, address_id]);
        await closeConnectionToDatabase(connection);
        
        return result;
    }
}