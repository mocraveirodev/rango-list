import RestaurantRepository from '../../repositories/restaurants/RestaurantRepository.js';
import ProductRepository from '../../repositories/products/ProductRepository.js';
import { formatProducts } from '../../utils/formatProducts.js';
import { getPageInfo } from '../../utils/getPageInfo.js';
import errorHandler from '../../utils/errorHandler.js';

export default class GetAllProductsByRestaurantService {;    
    async execute({
        restaurantId,
        page = 1,
        perPage = 10,
    }, res) {
        const restaurantRepository = new RestaurantRepository();
        const restaurantExists = await restaurantRepository.findById(restaurantId);
        
        if (!restaurantExists) {
            throw errorHandler({ message: 'Restaurant not found. $404' }, res);
        }
        
        const productRepository = new ProductRepository();
        const { count, products } = await productRepository.findAll({
            restaurantId,
            page,
            perPage,
        });
        console.log(products);
        const formattedProducts = formatProducts(products);
        const pageInfo = getPageInfo(page, perPage, count);

        return { pageInfo, products: formattedProducts };
    }
}
