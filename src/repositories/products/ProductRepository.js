import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import ProductEntity from '../../database/entities/ProductEntity.js';

export default class ProductRepository {
    constructor() {
        this.productEntity = ProductEntity;
    }

    async create({
        restaurantId,
        category_id,
        name,
        price,
    }) {
        const connection = await connectToDatabase();
        let query = `INSERT INTO ${this.productEntity.tableName} (id, restaurant_id, category_id, name, price) VALUES (UUID(), ?, ?, ?, ?)`;
        await queryDatabase(connection, query, [restaurantId, category_id, name, price]);
        query = `SELECT id FROM ${this.productEntity.tableName} WHERE restaurant_id = ? AND name = ? ORDER BY created_at DESC LIMIT 1`;
        const [result] = await queryDatabase(connection, query, [restaurantId, name]);
        await closeConnectionToDatabase(connection);

        return result;
    }
}
