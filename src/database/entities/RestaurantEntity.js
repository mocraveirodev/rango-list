import dotenv from 'dotenv';
dotenv.config();

import { RestaurantAddressEntity } from './RestaurantAddressEntity.js';
import { OpeningHoursEntity } from './OpeningHoursEntity.js';

export class RestaurantEntity {
    static tableName = 'restaurants';
}