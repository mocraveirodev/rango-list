import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = () => {
    const connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    connection.connect((err) => {
        if (err) {
        console.error('Error connecting to database:', err);
        return;
        }
        console.log('Successfully connected to MySQL database');
    });

    return connection;
}

const queryDatabase = (connection, query, values = null) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

const closeConnectionToDatabase = (connection) => {
    connection.end((err) => {
        if (err) {
            console.error('Error disconnecting from database:', err);
            return;
        }
        console.log('Successfully disconnected from MySQL database');
    });
}   
export default {
    connectToDatabase,
    queryDatabase,
    closeConnectionToDatabase
};
