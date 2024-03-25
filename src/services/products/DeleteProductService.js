import ProductRepository from '../../repositories/products/ProductRepository.js';

export default class UpdateProductService {
    async execute({ restaurantId, productId }) {
        const productRepository = new ProductRepository();
        await productRepository.delete(restaurantId, productId);
    }
}