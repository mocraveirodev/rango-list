import { Router } from 'express';
import restaurantRoutes from './restaurants/restaurantRoutes.js';
import productRoutes from './products/productRoutes.js';

const router = Router();

router.use('/restaurants', restaurantRoutes);
router.use('/products', productRoutes);

export default router;