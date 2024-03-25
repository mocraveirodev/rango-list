import { checkValidPromo } from '../../utils/checkValidPromo.js';
import CategoryRepository from '../../repositories/categories/CategoryRepository.js';
import ProductRepository from '../../repositories/products/ProductRepository.js';
import PromoRepository from '../../repositories/promos/PromoRepository.js';
import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import errorHandler from '../../utils/errorHandler.js';

export default class UpdateProductService {
    async execute({ restaurantId, productId, name, price, category, promo }, res) {
        if (promo) {
            const { status, message } = checkValidPromo(promo, res);
            if (status === 'invalid') {
                throw errorHandler(message, res);
            }
        }

        const restaurantRepository = new RestaurantRepository();
        const restaurantExists = await restaurantRepository.findById(restaurantId);
        if (!restaurantExists) {
            throw errorHandler({ message: 'Restaurant not found. $404' }, res);
        }

        const productRepository = new ProductRepository();
        const productExists = await productRepository.findById({ restaurantId, productId });
        if (!productExists) {
            throw errorHandler({ message: 'Product not found. $404' }, res);
        }

        let categoryId = null;
        if (category) {
            const categoryRepository = new CategoryRepository();
            let cat = await categoryRepository.findByName(restaurantId, category);

            if (!cat) {
                cat = await categoryRepository.create(restaurantId, category);
            }

            categoryId = category.id;
        }

        if (promo) {
            const promoRepository = new PromoRepository();
            await promoRepository.updateByProductId({
                productId,
                ...promo,
            });
        }

        await productRepository.update({ productId, name, price, category: categoryId });

        return { id: productId };
    }
}
