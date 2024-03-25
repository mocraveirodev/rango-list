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

    async updateByProductId({
        productId,
        description,
        promoPrice,
        startDatetime,
        finishDatetime,
    }) {
        const connection = await connectToDatabase();
        const query = `UPDATE ${this.promoEntity.tableName}
            SET
                description = IFNULL(?, description),
                price = IFNULL(?, price),
                start_datetime = IFNULL(?, start_datetime),
                finish_datetime = IFNULL(?, finish_datetime)
            WHERE
                product_id = ?`;
        await queryDatabase(connection, query, [
            description,
            promoPrice,
            startDatetime,
            finishDatetime,
            productId
        ]);
        await closeConnectionToDatabase(connection);
    }
}
