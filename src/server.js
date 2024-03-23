import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.info(`Server running on: http://${HOST}:${PORT}`);
});
