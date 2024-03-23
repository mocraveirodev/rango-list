import { Router } from 'express';
import restaurantRoutes from './restaurants/restaurantRoutes.js';

const router = Router();

router.use('/restaurants', restaurantRoutes);

export default router;