import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errors } from 'celebrate';


const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errors());

export default app;
