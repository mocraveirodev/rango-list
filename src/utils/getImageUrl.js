import dotenv from 'dotenv';
dotenv.config();

const BASE_IMAGE_URL = process.env.STORAGE_BASE_URL || '';

export function getImageUrl(image) {
    return image ? `${BASE_IMAGE_URL}${image}` : null;
}
