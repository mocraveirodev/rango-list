import { checkValidPromo } from '../../utils/checkValidPromo.js';
import ProductRepository from '../../repositories/products/ProductRepository.js';
import CategoryRepository from '../../repositories/categories/CategoryRepository.js';
import PromoRepository from '../../repositories/promos/PromoRepository.js';
import errorHandler from '../../utils/errorHandler.js';

export class CreateProductService {;    
    async execute({
        restaurantId,
        name,
        category,
        price,
        promo,
    }, res) {
        if (promo) {
            const { status, message } = checkValidPromo(promo, res);
            if (status === 'invalid') {
                throw errorHandler(message, res);
            }
        }

        const categoryRepository = new CategoryRepository();
        let cat = await categoryRepository.findByName(restaurantId, category);

        if (!cat) {
            cat = await categoryRepository.create(restaurantId, category);
        }

        const productRepository = new ProductRepository();
        const product = await productRepository.create({
            restaurantId,
            category_id: cat.id,
            name,
            price,
        });

        if (promo) {
            const promoRepository = new PromoRepository();
            await promoRepository.create({
                ...promo,
                product_id: product.id,
            });
        }
        return { id: product.id };
    }
}
