import { CreateProductService } from '../../services/products/CreateProductService.js';

export default class ProductController {
    async create(req, res) {
        const { restaurantId } = req.params;
        const { name, price, category, promo } = req.body;

        const createProductService = new CreateProductService();
        const product = await createProductService.execute({
            restaurantId,
            name,
            price,
            category,
            promo,
        }, res);

        return res.status(201).json(product);
    }
}
