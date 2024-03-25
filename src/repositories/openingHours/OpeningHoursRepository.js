import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import OpeningHoursEntity from '../../database/entities/OpeningHoursEntity.js';

export default class OpeningHoursRepository {
    constructor() {
        this.openingHoursEntity = OpeningHoursEntity;
    }
    async create(restaurant_id, opening_hours) {
        const connection = await connectToDatabase();

        this.openingHoursEntity.weekDays.map(async day => {
            const insertArray = [
                restaurant_id,
                day,
                opening_hours?.[day]?.open || null,
                opening_hours?.[day]?.close || null,
            ];

            const query = `INSERT INTO ${this.openingHoursEntity.tableName} (restaurant_id, week_day, open_hour, close_hour) VALUES (?, ?, ?, ?)`;

            await queryDatabase(connection, query, insertArray)
        });

        await closeConnectionToDatabase(connection);
    }

    async updateByRestaurantId(restaurant_id, opening_hours) {
        const connection = await connectToDatabase();

        this.openingHoursEntity.weekDays.map(async day => {
            const insertArray = [
                opening_hours?.[day]?.open || null,
                opening_hours?.[day]?.close || null,
                restaurant_id,
                day,
            ];

            const query = `UPDATE ${this.openingHoursEntity.tableName} SET open_hour = ?, close_hour = ? WHERE restaurant_id = ? AND week_day = ?`;

            await queryDatabase(connection, query, insertArray)
        });

        await closeConnectionToDatabase(connection);
    }
}