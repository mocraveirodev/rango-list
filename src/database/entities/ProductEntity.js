import PromoEntity from './PromoEntity.js';
import CategoryEntity from './CategoryEntity.js';

export default class ProductEntity {
    static tableName = 'products';
    static relations = {
        promotions: PromoEntity,
        categories: CategoryEntity,
    };
}