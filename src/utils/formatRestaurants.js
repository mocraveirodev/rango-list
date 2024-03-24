import { formatOpeningHours } from './formatOpeningHours.js';
import { getImageUrl } from './getImageUrl.js';

export function formatRestaurants(restaurants) {
    return restaurants.map(restaurant => {
        const formattedOpeningHours = formatOpeningHours(restaurant.opening_hours);
        const image_url = getImageUrl(restaurant.image);

        return {
            id: restaurant.id,
            name: restaurant.name,
            image: restaurant.image,
            image_url,
            address: restaurant.address,
            opening_hours: formattedOpeningHours
        }
    })
}