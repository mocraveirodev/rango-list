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
    async create(restaurant_id, openingHours) {
        const connection = await connectToDatabase();

        this.openingHoursEntity.weekDays.map(async day => {
            const insertArray = [
                restaurant_id,
                day,
                openingHours?.[day]?.open || null,
                openingHours?.[day]?.close || null,
            ];

            const query = `INSERT INTO ${this.openingHoursEntity.tableName} (restaurant_id, week_day, open_hour, close_hour) VALUES (?, ?, ?, ?)`;

            await queryDatabase(connection, query, insertArray)
        });

        await closeConnectionToDatabase(connection);
        
        return;
    }
}