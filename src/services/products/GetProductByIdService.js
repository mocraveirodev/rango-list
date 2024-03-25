import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import ProductRepository from '../../repositories/products/ProductRepository.js';
import { formatProducts } from '../../utils/formatProducts.js';
import { getPageInfo } from '../../utils/getPageInfo.js';
import errorHandler from '../../utils/errorHandler.js';

export default class GetProductByIdService {   
    async execute({ restaurantId, productId }, res) {
        const restaurantRepository = new RestaurantRepository();
        const restaurantExists = await restaurantRepository.findById(restaurantId);
        
        if (!restaurantExists) {
            throw errorHandler({ message: 'Restaurant not found. $404' }, res);
        }
        
        const productRepository = new ProductRepository();
        const product = await productRepository.findById({ restaurantId, productId });

        const [ formattedProduct ] = formatProducts(product);

        return formattedProduct;
    }
}
