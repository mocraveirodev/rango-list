import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {
    const connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err);
                reject(err);
            } else {
                console.log('Successfully connected to MySQL database');
                resolve(connection);
            }
        });
    });
};

const queryDatabase = async (connection, query, values = null) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const closeConnectionToDatabase = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                console.error('Error disconnecting from database:', err);
                reject(err);
            } else {
                console.log('Successfully disconnected from MySQL database');
                resolve();
            }
        });
    });
};

export { connectToDatabase, queryDatabase, closeConnectionToDatabase };
