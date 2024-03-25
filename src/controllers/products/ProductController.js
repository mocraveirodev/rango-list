import GetAllProductsByRestaurantService from '../../services/products/GetAllProductsByRestaurantService.js';
import GetProductByIdService from '../../services/products/GetProductByIdService.js';

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

    async getAll(req, res) {
        const { restaurantId } = req.params;
        const { page, perPage } = req.query;
        const getAllProductsByRestaurantService = new GetAllProductsByRestaurantService();
        const { pageInfo, products } = await getAllProductsByRestaurantService.execute({
            restaurantId,
            page,
            perPage
        }, res);
        return res.status(200).json({ pageInfo, products });
    }

    async getById(req, res) {
        const { restaurantId, productId } = req.params;
        const getProductByIdService = new GetProductByIdService();
        const product = await getProductByIdService.execute({ restaurantId, productId }, res);
        return res.status(200).json(product);
    }
}
