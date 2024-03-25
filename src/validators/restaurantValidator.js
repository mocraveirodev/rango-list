import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const VALID_HOUR = new RegExp(process.env.REGEX_VALID_HOUR);

const addressSchema = Joi.object({
    postal_code: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.string(),
    neighborhood: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
}).required();

const patchAddressSchema = Joi.object({
    postal_code: Joi.string(),
    street: Joi.string(),
    number: Joi.string(),
    complement: Joi.string(),
    neighborhood: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
});

const weekDayOpeningSchema = Joi.object({
    open: Joi.string()
        .regex(VALID_HOUR),
    close: Joi.string()
        .regex(VALID_HOUR),
});

const getAllRestaurantsSchema = Joi.object({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(50),
});

const restaurantIdSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv1' }).required(),
}).required();

const createRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    address: addressSchema,
    opening_hours: Joi.object().keys({
        sunday: weekDayOpeningSchema,
        monday: weekDayOpeningSchema,
        tuesday: weekDayOpeningSchema,
        wednesday: weekDayOpeningSchema,
        thursday: weekDayOpeningSchema,
        friday: weekDayOpeningSchema,
        saturday: weekDayOpeningSchema,
    }).required(),
});

const patchRestaurantSchema = Joi.object({
    name: Joi.string(),
    address: patchAddressSchema,
    opening_hours: Joi.object().keys({
        sunday: weekDayOpeningSchema,
        monday: weekDayOpeningSchema,
        tuesday: weekDayOpeningSchema,
        wednesday: weekDayOpeningSchema,
        thursday: weekDayOpeningSchema,
        friday: weekDayOpeningSchema,
        saturday: weekDayOpeningSchema,
    }),
});

export {
    getAllRestaurantsSchema,
    restaurantIdSchema,
    createRestaurantSchema,
    patchRestaurantSchema
};
