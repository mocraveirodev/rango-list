import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import CategoryEntity from '../../database/entities/CategoryEntity.js';

export default class CategoriesRepository {
    constructor() {
        this.categoryEntity = CategoryEntity;
    }

    async create(restaurantId, name) {
        const connection = await connectToDatabase();
        let query = `INSERT INTO ${this.categoryEntity.tableName} (id, restaurant_id, name) VALUES (UUID(), ?, ?)`;
        await queryDatabase(connection, query, [restaurantId, name]);
        query = `SELECT id FROM ${this.categoryEntity.tableName} WHERE restaurant_id = ? AND name = ? ORDER BY created_at DESC LIMIT 1`;
        const [result] = await queryDatabase(connection, query, [restaurantId, name]);
        await closeConnectionToDatabase(connection);

        return result;
    }

    async findByName(restaurantId, categoryName) {
        const connection = await connectToDatabase();
        const query = `SELECT * FROM ${this.categoryEntity.tableName}
            WHERE restaurant_id = ?
            AND UPPER(name) = UPPER(?)`;
        const result = await queryDatabase(connection, query, [restaurantId, categoryName]);

        if (!result[0]) {
            return null;
        }
    
        return { id: category.id };
    }
}
