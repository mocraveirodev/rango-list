import {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
} from '../../../config/databaseConnection.js';
import AddressEntity from '../../database/entities/AddressEntity.js';

export default class AddressesRepository {
    constructor() {
        this.addressEntity = AddressEntity;
    }

    async create({
        postal_code,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
    }) {
        const arrayAddress = [
            postal_code,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            country
        ];
        const connection = await connectToDatabase();
        let query = `INSERT INTO ${this.addressEntity.tableName} (id, postal_code, street, number, complement, neighborhood, city, state, country) 
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?)`;
        await queryDatabase(connection, query, arrayAddress);
        query = `SELECT id FROM ${this.addressEntity.tableName} WHERE postal_code = ? AND street = ? AND number = ? ORDER BY created_at DESC LIMIT 1`;
        const [result] = await queryDatabase(connection, query, [postal_code, street, number]);

        await closeConnectionToDatabase(connection);
        
        return result;
    }

    async findAddress({
        postal_code,
        street,
        number
    }) {
        const connection = await connectToDatabase();
        const query = `SELECT id FROM ${this.addressEntity.tableName} WHERE postal_code = ? AND street = ? AND number = ?`;
        const [result] = await queryDatabase(connection, query, [postal_code, street, number]);

        await closeConnectionToDatabase(connection);
        
        return result;
    }
}
