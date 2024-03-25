import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import PromoEntity from '../../database/entities/PromoEntity.js';

export default class PromoRepository {
    constructor() {
        this.promoEntity = PromoEntity;
    }

    async create({
        product_id,
        description,
        promoPrice,
        startDatetime,
        finishDatetime,
    }) {
        const connection = await connectToDatabase();
        let query = `INSERT INTO ${this.promoEntity.tableName}
            (id, product_id, description, price, start_datetime, finish_datetime)
            VALUES (UUID(), ?, ?, ?, ?, ?)`;
        await queryDatabase(connection, query, [
            product_id,
            description,
            promoPrice,
            startDatetime,
            finishDatetime
        ]);
        await closeConnectionToDatabase(connection);
    }
}
