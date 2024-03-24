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

    async findAll({ page, perPage }) {
        const connection = await connectToDatabase();
        let query = `SELECT
            r.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'week_day', oh.week_day,
                    'open_hour', oh.open_hour,
                    'close_hour', oh.close_hour
                )
            ) AS opening_hours,
            JSON_OBJECT(
                'postal_code', a.postal_code,
                'street', a.street,
                'number', a.number,
                'complement', a.complement,
                'neighborhood', a.neighborhood,
                'city', a.city,
                'state', a.state,
                'country', a.country
            ) AS address
            FROM ${this.restaurantEntity.tableName} r
            LEFT JOIN
                ${this.restaurantEntity.relations.restaurantAddress.tableName} ra ON r.id = ra.restaurant_id
            LEFT JOIN
                ${this.restaurantEntity.relations.openingHours.tableName} oh ON r.id = oh.restaurant_id
            LEFT JOIN
                ${this.restaurantEntity.relations.restaurantAddress.relations.address.tableName} a ON ra.address_id = a.id
            GROUP BY
                r.id,
                r.name,
                r.image,
                a.postal_code,
                a.street,
                a.number,
                a.complement,
                a.neighborhood,
                a.city,
                a.state,
                a.country
            LIMIT ? OFFSET ?`;
        const restaurants = await queryDatabase(connection, query, [perPage, (page - 1) * perPage]);
        
        query = `SELECT COUNT(*) AS count FROM ${this.restaurantEntity.tableName}`;
        const [{ count }] = await queryDatabase(connection, query);
        
        await closeConnectionToDatabase(connection);
        
        return { count, restaurants };
    }

    async findById(id) {
        const connection = await connectToDatabase();
        const query = `SELECT
            r.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'week_day', oh.week_day,
                    'open_hour', oh.open_hour,
                    'close_hour', oh.close_hour
                )
            ) AS opening_hours,
            JSON_OBJECT(
                'postal_code', a.postal_code,
                'street', a.street,
                'number', a.number,
                'complement', a.complement,
                'neighborhood', a.neighborhood,
                'city', a.city,
                'state', a.state,
                'country', a.country
            ) AS address
            FROM ${this.restaurantEntity.tableName} r
            LEFT JOIN
                ${this.restaurantEntity.relations.restaurantAddress.tableName} ra ON r.id = ra.restaurant_id
            LEFT JOIN
                ${this.restaurantEntity.relations.openingHours.tableName} oh ON r.id = oh.restaurant_id
            LEFT JOIN
                ${this.restaurantEntity.relations.restaurantAddress.relations.address.tableName} a ON ra.address_id = a.id
            WHERE r.id = ?
            GROUP BY
                r.id,
                r.name,
                r.image,
                a.postal_code,
                a.street,
                a.number,
                a.complement,
                a.neighborhood,
                a.city,
                a.state,
                a.country`;
        const result = await queryDatabase(connection, query, id);
        await closeConnectionToDatabase(connection);

        return result;
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