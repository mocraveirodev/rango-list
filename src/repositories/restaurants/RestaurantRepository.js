import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import RestaurantEntity from '../../database/entities/RestaurantEntity.js';

export default class RestaurantRepository {
    constructor() {
        this.restaurantEntity = RestaurantEntity;
    }
    async create(name) {
        const connection = await connectToDatabase();
        let query = `INSERT INTO ${this.restaurantEntity.tableName} (id, name) VALUES (UUID(), ?)`;
        await queryDatabase(connection, query, name);
        query = `SELECT id FROM ${this.restaurantEntity.tableName} WHERE name = ? ORDER BY created_at DESC LIMIT 1`;
        const [result] = await queryDatabase(connection, query, name);
        await closeConnectionToDatabase(connection);

        return result;
    }
}