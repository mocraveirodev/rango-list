import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import RestaurantEntity from '../../database/entities/RestaurantEntity.js';
import { errorHandler } from '../../utils/errorHandler.js';

export default class RestaurantRepository {
    constructor() {
        this.restaurantEntity = RestaurantEntity;
    }
    async create(name) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO ${this.restaurantEntity.tableName}(name) VALUES (?)`;
        const result = await queryDatabase(connection, query, name);
        await closeConnectionToDatabase(connection);
        
        return result;
    }
}