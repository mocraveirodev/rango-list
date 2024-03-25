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

    async findAll({ restaurantId, page = 1, perPage = 10 }) {
        const connection = await connectToDatabase();
        let query = `SELECT
                p.*,
                JSON_OBJECT(
                    'category_id', c.id,
                    'category_name', c.name
                ) AS category,
                JSON_OBJECT(
                    'promotion_id',pr.id,
                    'promotion_description',pr.description,
                    'promotion_price',pr.price,
                    'promotion_start_datetime',pr.start_datetime,
                    'promotion_finish_datetime',pr.finish_datetime
                ) AS promo
            FROM
                ${this.productEntity.tableName} p
                INNER JOIN ${this.productEntity.relations.categories.tableName} c ON p.category_id = c.id
                LEFT JOIN ${this.productEntity.relations.promotions.tableName} pr ON p.id = pr.product_id
            WHERE
                p.restaurant_id = ?
            LIMIT ? OFFSET ?`;
        const products = await queryDatabase(connection, query, [restaurantId, perPage, (page - 1) * perPage]);
        query = `SELECT COUNT(*) AS count FROM ${this.productEntity.tableName}`;
        const [{ count }] = await queryDatabase(connection, query);
        
        await closeConnectionToDatabase(connection);
        
        return { count, products };
    }
}
