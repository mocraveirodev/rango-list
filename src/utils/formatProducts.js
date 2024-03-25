import { formatPromotion } from './formatPromotion.js';
import { getImageUrl } from './getImageUrl.js';

export function formatProducts(products) {
    return products.map(product => {
        const image_url = getImageUrl(product.image);

        return {
            id: product.id,
            restaurant_id: product.restaurant_id,
            name: product.name,
            image: product.image,
            image_url,
            price: product.price,
            category: product.category,
            promo: product.promo ? formatPromotion(product.promo) : null,
            created_at: product.created_at,
            updated_at: product.updated_at
        };
    });
}