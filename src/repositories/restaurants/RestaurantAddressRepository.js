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
    }

    async updateByRestaurantId(restaurant_id, address_id) {
        const connection = await connectToDatabase();
        const query = `UPDATE ${this.restaurantAddressEntity.tableName} SET restaurant_id = ?, address_id = ? WHERE restaurant_id = ?`;
        const result = await queryDatabase(connection, query, [restaurant_id, address_id, restaurant_id]);
        await closeConnectionToDatabase(connection);
    }
}